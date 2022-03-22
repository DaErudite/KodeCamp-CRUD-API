const express= require('express');
const User= require('./models/User')
module.exports= (app) =>{




    // Create a new user
app.post('/users', (req,res)=>{
    console.log('it works')
   const user = new User({
       name:req.body.name,
       age:req.body.age,
       message:req.body.message
   });

// Save user in the database
user.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Error occurred."
    });
});

});






    // Retrieve all users
app.get('/users', (req, res) => {
    User.find()
    .then((result) => {
        res.send({users:result});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
});

    // Retrieve a single user with Id
app.get('/users/:Id', (req, res) => {
    User.findById(req.params.Id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.Id
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.Id
        });
    });
    });


 
    


    // Update a user with userId
app.put('/users/:Id', (req, res) => {
    // Validate Request
    if(!req.body.message) {
        return res.status(400).send({
            message: "user message can not be empty"
        });
    }
    
    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.Id, {
        message: req.body.message
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.Id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.Id
        });
    });
    });







    //Delete a user with Id
app.delete('/users/:Id', (req, res) => {
    User.findByIdAndRemove(req.params.Id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.Id
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.Id
        });
    });
    });

};