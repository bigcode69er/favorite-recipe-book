const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const API_KEY = process.env.API_KEY;

router.get('/', (req, res) => {
    res.render('recipe/index');
});

router.get('/cuisines', (req, res) => {
    res.render('recipe/cuisines');
});

router.get('/results', (req, res) => {
    const search = req.query.search;
    console.log(search)
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&number=20&apiKey=${API_KEY}`)
    .then(function (response) {
        const results = response.data.results
        console.log(results)
        res.render('recipe/results', { results })
    })
    .catch((error) => {
        res.send(error);
    })
});

router.post('/', (req, res) => {
    const title = req.body.title;
    const recipeId = req.body.recipeId;
    const image = req.body.image;
    db.favorite.findOrCreate({
        where: {
            title, recipeId, image
        }
    }).then(([favorite, created]) => {
        console.log(favorite)
        db.user.findOne({
            where: {
                id: req.user.dataValues.id
            }
        }).then(user => {
            user.addFavorite(favorite);
            console.log(favorite)
        res.redirect('/recipe/favorites'); 
        })
    })
})

router.delete('/:id', (req, res) => {
    const recipeId = req.params.id;
    db.favorite.destroy({
        where: { recipeId }
    }).then(() => {
        res.redirect('/recipe/favorites');
    })

});

router.get('/favorites', (req, res) => {
    db.favorite.findAll({
        where: {
            userId: req.user.dataValues.id
        }
    })
    .then((recipes) => {
        res.render('recipe/favorites', { recipes })
    })
});

router.get('/:id', (req, res) => {
    const recipeId = req.params.id;
    axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`)
    .then(function (response) {
        const recipe = response.data;
        console.log(recipe)
        res.render('recipe/info', { recipe });
    })
    .catch(function (error) {
        res.send(error);
    })
});

module.exports = router;