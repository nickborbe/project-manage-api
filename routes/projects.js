const express = require('express');
const router  = express.Router();
const Project    = require('../models/Project');


router.get('/projects', (req, res, next) => {
    Project.find().populate('tasks')
    .then((allTheProjects)=>{
        res.json(allTheProjects);
    })
    .catch((err)=>{
        res.json(err);
    })
});

router.post('/projects/create', (req, res, next)=>{
    if(!req.user){
       return res.json({message: 'sorry, you must be logged in to create a Project'}) 
    }
    Project.create({
        title: req.body.title,
        description: req.body.description,
        owner: req.user._id,
        tasks: [],
    })
    .then((response)=>{
        res.json(response);
    })
    .catch((err)=>{
        res.json(err);
    })
})

router.get('/projects/:id', (req, res, next)=>{
    Project.findById(req.params.id).populate('tasks')
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err)
    })
})



router.post('/projects/edit/:id', (req, res, next)=>{
    Project.findByIdAndUpdate(req.params.id, req.body)
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err)
    })
})

router.post('/projects/delete/:id', (req, res, next)=>{
    Project.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err)
    })

})








module.exports = router;
