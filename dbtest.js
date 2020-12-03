// const db = require("./models");

// db.favorite.findOrCreate({
//     where: {
//         title: "egg",
//         recipeId: 10,
//         image: "google.com"
//     }
// })
// .then(([favorite, created]) => {
//     console.log(favorite)
//     db.user.findOne({
//         where: {
//             id: 1}
//     })
//     .then(user => {
//         user.addFavorite(favorite);
//         console.log(favorite)
//     })
// })

// db.favorite.destroy({
//     where: {
//        title: "egg"
//     }
// })