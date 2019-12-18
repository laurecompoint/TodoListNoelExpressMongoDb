var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var alert = require('alert-node');

const TodoModel = mongoose.model('TodoList', new Schema({ name: String }));

//get task
router.get('/', function (req, res, next) {

    TodoModel.find(function (err, todos) {
        if (err) {
            res.send("erreur !!")
        }
        res.render('todo/index', {
            todos: todos

        });
    });

});
//delete task
router.post('/delete/:id', function (req, res, next) {

    TodoModel.findById(req.params.id, function (err, todos) {
        todos.remove(function (err, todos) {
            res.redirect('/todos');
        });
    });
})
//update task
router.post('/update/:id', function (req, res, next) {

    TodoModel.findById(req.params.id, function (err, todos) {

        if (!req.body.name == '') {
            todos.name = req.body.name;
            todos.save(function (err, todos) {
                res.redirect('/todos');
            });
        }
        else {
            alert('Erreur : Votre Task est vide')
        }

    });
})
//save task
router.post('/', function (req, res, next) {

    const Todo = new TodoModel({ name: req.body.name });
    if (!req.body.name == '') {

        Todo.save();
        res.redirect('/todos')
    }
    else {
        alert('Erreur : Votre Task est vide')
    }

})

module.exports = router;