const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const API_KEY = process.env.API_KEY

router.get('/', (req, res) => {
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

router.get('/fav', (req, res) => {
    res.render('recipe/fav');
});

router.get('/:id', (req, res) => {
    const recipeId = req.params.id
    axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`)
    .then(function (response) {
        const recipe = response.data;
        res.render('recipe/info', { recipe });
    })
    .catch(function (error) {
        res.send(error);
    })
});


module.exports = router;