const checkMillionDollarIdea = (req, res, next) => {
  console.log(`${req.body.numWeeks} : ${req.body.weeklyRevenue}`)
  if(req.body.numWeeks * req.body.weeklyRevenue >= 1000000) {
    next();
  } else {
    res.status(400).send();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
