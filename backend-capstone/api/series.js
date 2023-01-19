const express = require('express');
const sqlite3 = require('sqlite3');

const seriesRouter = express.Router();
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

seriesRouter.param('seriesId', (req, res, next, seriesId) => {
    db.get('SELECT * FROM Series WHERE id=$id', {
        $id: seriesId
    }, (err, row) => {
        if(err) {
            next(err);
        } else {
            if(row) {
                req.body.series = row;
                next();
            } else {
                res.sendStatus(404);
            }
        }
    })
});

seriesRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Series', (err, rows) => {
        if(err) {
            next(err);
        } else {
            res.status(200).json({ series: rows });
        }
    })
});

seriesRouter.get('/:seriesId', (req, res, next) => {
    res.status(200).json({series: req.body.series});
});

seriesRouter.post('/', (req, res, next) => {
    const { name, description } = req.body.series;
    if(!name || !description) {
        res.sendStatus(400);
    } else {
        db.run("INSERT INTO Series (name, description) VALUES ($name, $description)", {
            $name: name,
            $description: description
        }, function (err) {
            if(err) {
                next(err);
            } else {
                db.get("SELECT * FROM Series WHERE id=$id", {
                    $id: this.lastID
                }, (err, row) => {
                    if(err) {
                        next(err);
                    } else {
                        res.status(201).json({ series: row });
                    }
                })
            }
        })
    }
});



module.exports = seriesRouter;