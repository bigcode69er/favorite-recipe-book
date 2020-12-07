const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const isLoggedIn = require('../middleware/isLoggedIn')
const API_KEY = process.env.API_KEY;

router.get('/', isLoggedIn, (req, res) => {
    res.render('recipe/index');
});

router.get('/results', isLoggedIn, (req, res) => {
    const search = req.query.search;
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&number=15&apiKey=${API_KEY}`)
    .then(function (response) {
        const results = response.data.results
        res.render('recipe/results', { results })
    })
    .catch((error) => {
        console.log(error);
        res.status(400).render('main/404');
    })
});

router.get('/cuisines', isLoggedIn, (req, res) => {
    res.render('recipe/cuisines');
});

router.get('/cuisines/results', isLoggedIn, (req, res) => {
    const cuisine = req.query.cuisine;
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&number=15&apiKey=${API_KEY}`)
    .then(function (response) {
        const results = response.data.results
        res.render('recipe/results', { results })
    })
    .catch((error) => {
        console.log(error);
        res.status(400).render('main/404');
    })
});

router.post('/review', isLoggedIn, (req, res) => {
    const name = req.user.name
    const recipeId = req.body.recipeId;
    const score = req.body.score;
    const content = req.body.content;
    db.review.findOrCreate({
        where: {
            name, recipeId, score, content
        }
    })
    .then(([review, created]) => {
        db.user.findOne({
            where: {
                id: req.user.id
            }
        })
        .then(user => {
            user.addReview(review);
        res.redirect(`/recipe/${recipeId}`); 
        })
    })
    .catch((error) => {
        console.log(error);
        res.status(400).render('main/404');
    })
})

router.get('/edit/:id', isLoggedIn, function(req, res){
    const id = req.params.id;
    db.review.findByPk(id).then ((review) => {
        res.render('recipe/edit', {review});
    })
});

router.put('/:id', isLoggedIn, function(req, res){
    const id = req.body.id
    const score = req.body.score;
    const content = req.body.content;
    const recipeId = req.params.id;
    db.review.update({
        score, content
        }, {
        where: { id }
    })
    .then(() => {
        res.redirect(`/recipe/${recipeId}`);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).render('main/404');
    })
});

router.delete('/review/:id', isLoggedIn, (req, res) => {
    const recipeId = req.body.recipeId;
    const id = req.params.id;
    db.review.destroy({
        where: { id }
    })
    .then(() => {
        res.redirect(`/recipe/${recipeId}`);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).render('main/404');
    })
});

router.post('/', isLoggedIn, (req, res) => {
    const title = req.body.title;
    const recipeId = req.body.recipeId;
    const image = req.body.image;
    db.favorite.findOrCreate({
        where: {
            title, recipeId, image
        }
    })
    .then(([favorite, created]) => {
        db.user.findOne({
            where: {
                id: req.user.id
            }
        })
        .then(user => {
            user.addFavorite(favorite);
        res.redirect('/recipe/favorites'); 
        })
    })
    .catch((error) => {
        console.log(error);
        res.status(400).render('main/404');
    })
})

router.delete('/:id', isLoggedIn, (req, res) => {
    const recipeId = req.params.id;
    db.favorite.destroy({
        where: { recipeId }
    })
    .then(() => {
        res.redirect('/recipe/favorites');
    })
    .catch((error) => {
        console.log(error);
        res.status(400).render('main/404');
    })
});

router.get('/favorites', isLoggedIn, (req, res) => {
    db.favorite.findAll({
        where: {
            userId: req.user.id
        }
    })
    .then((recipes) => {
        res.render('recipe/favorites', { recipes })
    })
    .catch((error) => {
        console.log(error);
        res.status(400).render('main/404');
    })
});

router.get('/:id', isLoggedIn, (req, res) => {
    const recipeId = req.params.id;
    axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`)
    .then(function (response) {
        const recipe = response.data;
        db.review.findAll({
            where: { recipeId }
        })
        .then((reviews) => {
            res.render('recipe/info', { recipe, reviews });
        })
    })
    .catch((error) => {
        console.log(error);
        res.status(400).render('main/404');
    })
});

module.exports = router;