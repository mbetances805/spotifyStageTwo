const router = require('express').Router();
const {Activity} = require('../db/models');
module.exports = router;

router.get(`/`, (req, res, next) => {
  Activity.findAll()
    .then(activities => res.json(activities))
    .catch(next)
});

router.get(`/:activityId`, (req, res, next) => {
  let {activityId} = req.params
  Activity.findById(activityId)
    .then(activity => res.json(activity))
    .catch(next)
});

router.post(`/`, (req, res, next) => {
  Activity.create({
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  }).then(activity => res.json())
    .catch(next)
});

router.delete(`/:activityId`, (req, res, next) => {
  let {activityId} = req.params.
  Activity.destroy({
    where: {
      id: activityId
    }
  })
  .then(() => res.sendStatus(204))
  .catch(next)
});
