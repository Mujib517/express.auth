let express=require('express');
let taskRouter=express.Router();

taskRouter.get('/tasks', function (req, res) {

    res.render('pages/tasks');
});

module.exports=taskRouter;
