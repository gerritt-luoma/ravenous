const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    // Remove table if it already exists
    db.run("DROP TABLE IF EXISTS Artist", error => {
        if(error) {
            console.error(error);
        }
    });

    // Create table
    db.run("CREATE TABLE Artist (id INTEGER NOT NULL, name TEXT NOT NULL, date_of_birth TEXT NOT NULL, biography TEXT NOT NULL, is_currently_employed INTEGER DEFAULT 1, PRIMARY KEY('id'))", (error) => {
        if(error) {
            console.error(error);
        }
    });

    db.run("DROP TABLE IF EXISTS Series", error => {
        if(error) {
            console.error(error);
        }
    });

    db.run("CREATE TABLE Series (id INTEGER NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL, PRIMARY KEY('id'))", error => {
        if(error) {
            console.error(error);
        }
    })
})