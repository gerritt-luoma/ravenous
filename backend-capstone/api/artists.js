const express = require('express');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const artistsRouter = express.Router();

// Params
artistsRouter.param('artistId', (req, res, next, artistId) => {
    db.get('SELECT * FROM Artist WHERE id=$id', {
        $id: artistId
    }, (err, row) => {
        if(err) {
            next(err);
        } else {
            if(row) {
                req.artist = row;
                next();
            } else {
                res.status(404).send('Requested artist not found');
            }
        }
    })
});

// Routes
artistsRouter.get('/', (req, res, next) => {
    db.all("SELECT * FROM Artist WHERE is_currently_employed=1", (err, rows) => {
        if(err) {
            next(err);
        } else {
            res.status(200).json({ artists: rows });
        }
    })
});

artistsRouter.get('/:artistId', (req, res, next) => {
    res.status(200).json({ artist: req.artist });
});

artistsRouter.put('/:artistId', (req, res, next) => {
    const { name, dateOfBirth, biography } = req.body.artist;
    if(!name || !dateOfBirth || !biography) {
        res.status(400).send('Required items not present');
    }

    db.run("UPDATE Artist SET name=$name, date_of_birth=$dateOfBirth, biography=$biography, is_currently_employed=$isCurrentlyEmployed WHERE Artist.id=$id", {
        $name: name,
        $dateOfBirth: dateOfBirth,
        $biography: biography,
        $isCurrentlyEmployed: req.body.artist.isCurrentlyEmployed,
        $id: req.params.artistId
    }, (err) => {
        if(err) {
            next(err);
        } else {
            db.get('SELECT * FROM Artist WHERE id=$id', {
                $id: req.params.artistId
            }, (err, row) => {
                if(err) {
                    res.status(500).send("Failed to update record");
                } else {
                    res.status(200).json({ artist: row });
                }
            })
        }
    })
});

// Not actually a delete route.  Just setting them to unemployed.  Not sure why they wan't me to do it this way.
artistsRouter.delete('/:artistId', (req, res, next) => {
    db.run('UPDATE Artist SET is_currently_employed=0 WHERE Artist.id=$id', {
        $id: req.params.artistId
    }, err => {
        if(err) {
            next(err);
        } else {
            db.get('SELECT * FROM Artist WHERE id=$id', {
                $id: req.params.artistId
            }, (err, row) => {
                if(err) {
                    next(err);
                } else {
                    res.status(200).json({ artist: row });
                }
            })
        }
    })
});

artistsRouter.post('/', (req, res, next) => {
    // Destructure non-dynamic variables
    const { name, dateOfBirth, biography } = req.body.artist;
    const isCurrentlyEmployed = req.body.artist.isCurrentlyEmployed === 0 ? 0 : 1;

    // Verify required variables are set
    if(!name || !dateOfBirth || !biography) {
        res.status(400).send('Required items not present');
    }

    // Insert the new artist
    db.run('INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed) VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed)', {
        $name: name,
        $dateOfBirth: dateOfBirth,
        $biography: biography,
        $isCurrentlyEmployed: isCurrentlyEmployed
    }, function (err) {
        if(err) {
            next(err);
        }

        // Grab the new artist
        db.get('SELECT * FROM Artist WHERE id=$id', {
            $id: this.lastID
        }, (err, row) => {
            if(err) {
                res.status(500).send("Failed to add artist");
            } else {
                res.status(201).json({artist: row});
            }
        })
    })
});

module.exports = artistsRouter;