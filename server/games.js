const router = require('express').Router();
let Game = require('./models/game');
router.route('/').get((req,res) => {
    Game.find()
    .sort('name')
    .then(games => res.json(games))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/:id').get((req,res) => {
    Game.findById(req.params.id)
    .then(game => res.json(game))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const minPlayers = Number(req.body.minPlayers);
    const maxPlayers = Number(req.body.maxPlayers);

    if(minPlayers <= maxPlayers){
        const newGame = new Game({
            name,
            minPlayers,
            maxPlayers,
        });

        newGame.save()
        .then(() => res.json('Game added!'))
        .catch( err => res.json('Error: ' + err));
    }
    else
        res.json('Minimalna liczba graczy nie może być większa od maksymalnej liczby graczy!');
});

router.route('/update/:id').post((req,res) => {
    Game.findById(req.params.id)
    .then(game => {
        game.name = req.body.name;
        game.minPlayers = req.body.minPlayers;
        game.maxPlayers = req.body.maxPlayers;
        if(game.minPlayers <= game.maxPlayers){
            game.save()
            .then(() => res.json('Game updated!'))
            .catch(err => res.status(400).json("Error: " + err));
        }
        else
            res.json('Minimalna liczba graczy nie może być większa od maksymalnej liczby graczy!');
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;