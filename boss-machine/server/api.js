const express = require('express');
const app = require('../server');
const apiRouter = express.Router();
const db = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

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

apiRouter.post('/minions', (req, res, next) => {
  const { name, title, salary } = req.body;
  const newMinion = db.addToDatabase('minions', { name, title, salary });
  if(newMinion === null) {
    res.status(204).send();
  } else {
    res.status(201).send(newMinion);
  }
  
});

apiRouter.get('/minions/:minionId', (req, res, next) => {
  res.status(200).send(req.minion);
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
  const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
  res.status(200).send(updatedMinion);
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
  const result = db.deleteFromDatabasebyId('minions', req.minion.id);
  if(result) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

/* 
  Idea Routes
  Schema:
  id: string
  name: string
  description: string
  numWeeks: number
  weeklyRevenue: number  
*/
apiRouter.param('ideaId', (req, res, next, id) => {
  const ideaId = id;
  const idea = db.getFromDatabaseById('ideas', ideaId);
  if(!idea) {
    res.status(404).send();
  } else {
    req.idea = idea;
    next();
  }
})

apiRouter.get('/ideas', (req, res, next) => {
  const ideas = db.getAllFromDatabase('ideas');
  res.status(200).send(ideas);
});

apiRouter.post('/ideas', checkMillionDollarIdea);

apiRouter.post('/ideas', (req, res, next) => {
  const newIdea = db.addToDatabase('ideas', req.body);
  if(newIdea) {
    res.status(201).send(newIdea);
  } else {
    // not sure about this code
    req.status(400).send();
  }
});

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
  res.status(200).send(req.idea);
});

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
  const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
  if(updatedIdea) {
    res.status(201).send(updatedIdea);
  } else {
    // not sure about this code
    res.status(400).send();
  }
});

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
  const result = db.deleteFromDatabasebyId('ideas', req.idea.id);
  if(result) {
    res.status(204).send();
  } else {
    res.status(500);
  }
});

/*
  Meetings Routes
  Schema:
  time: string
  date: JS Date object
  day: string
  note: string
*/
apiRouter.get('/meetings', (req, res, next) => {
  const meetings = db.getAllFromDatabase('meetings');
  res.status(200).send(meetings);
});

apiRouter.post('/meetings', (req, res, next) => {
  const newMeeting = db.addToDatabase('meetings', req.body);
  console.log(newMeeting);
  if(newMeeting) {
    res.status(201).send(newMeeting);
  } else {
    res.status(400).send();
  }
});

apiRouter.delete('/meetings', (req, res, next) => {
  const result = db.deleteAllFromDatabase('meetings');
  if(!result) {
    res.status(400).send();
  } else {
    res.status(204).send();
  }
});

module.exports = apiRouter;
