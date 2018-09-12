const express = require('express');
const router  = express.Router();
const Task    = require('../models/task');
const Project = require('../models/project');





router.get('/projects/:projectID/tasks/:id', (req, res, next) => {
    Task.findById(req.params.id)
    .then((theTask)=>{
        res.json(theTask);
    })
    .catch((err)=>{
        res.json(err);
    })
});

router.post('/tasks/create', (req, res, next)=>{
    // if(!req.user){
    //    return res.json({message: 'sorry, you must be logged in to create a task'}) 
    // }
    Task.create({
        title: req.body.title,
        description: req.body.description,  
        project: req.body.projectID,
    })
    .then((response)=>{
        Project.findByIdAndUpdate(req.body.projectID, {$push:{ tasks: response._id }})
        .then((theResponse)=>{
            res.json(theResponse);
        })
        .catch((err)=>{
            res.json(err);
        })
    })
    .catch((err)=>{
        res.json(err);
    })
})

router.post('/tasks/edit/:id', (req, res, next)=>{
    Task.findByIdAndUpdate(req.params.id, req.body)
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err)
    })
})

router.post('/tasks/delete/:id', (req, res, next)=>{
    Task.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err)
    })

})








module.exports = router;
