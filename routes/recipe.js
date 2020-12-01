const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const API_KEY = process.env.API_KEY

router.get('/', (req, res) => {console.log
    res.render('recipe/index');
});

router.get('/results', (req, res) => {
    const search = req.query.search;
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=${API_KEY}`)
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
    db.user.findOne()
    .then(user=>{
    user.createPet({
      name: 'Spot',
      species: 'Mutt Dog'
    }).then(dog=>{
      console.log(dog);
    });
});
    db.favorite.findOrCreate({
        where: {
        title, recipeId, image
        }
    }).then(() => {
        res.redirect('/favorite');
    })
  })

router.get('/favorites', (req, res) => {
    db.favorite.findAll()
    .then((recipes) => {
        res.render('recipe/favorites', { recipes })
    })
});

router.get('/:id', (req, res) => {
    const recipeId = req.params.id
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