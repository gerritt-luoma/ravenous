const express = require('express');
const app = require('../server');
const apiRouter = express.Router();
const db = require('./db')

/* 
  Minion Routes 
  Schema:
  id: string
  name: string
  title: string
  salary: number
*/
apiRouter.param('minionId', (req, res, next, id) => {
  const minionId = id;
  const minion = db.getFromDatabaseById('minions', minionId);
  if(!minion) {
    res.status(404).send();
  } else {
    req.minion = minion;
    next();
  }
})

apiRouter.get('/minions', (req, res, next) => {
  const minions = db.getAllFromDatabase('minions');
  res.status(200).send(minions);
});

apiRouter.post('/minions');

apiRouter.get('/minions/:minionId', (req, res, next) => {
  res.status(200).send(req.minion);
});

apiRouter.put('/minions/:minionId');

apiRouter.delete('/minions/:minionId');

/* 
  Idea Routes
  Schema:
  id: string
  name: string
  description: string
  numWeeks: number
  weeklyRevenue: number  
*/
apiRouter.get('/ideas');

apiRouter.post('/ideas');

apiRouter.get('/ideas:ideaId');

apiRouter.put('/ideas:ideaId');

apiRouter.delete('/ideas:ideaId');

/*
  Meetings Routes
  Schema:
  time: string
  date: JS Date object
  day: string
  note: string
*/
apiRouter.get('/meetings');

apiRouter.post('/meetings');

apiRouter.delete('/meetings');

module.exports = apiRouter;
