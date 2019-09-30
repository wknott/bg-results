const router = require('express').Router();
let Result7WondersDuel = require('./models/result7WondersDuel');
router.route('/').get((req,res) => {
    Result7WondersDuel.find()
    .populate('game')
    .populate({path: 'scores.user'})
    .then(results => res.json(results))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    Result7WondersDuel.findById(req.params.id)
    .populate('game')
    .populate({path: 'scores.user'})
    .then(result => res.json(result))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/game/:id').get((req,res) => {
    Result7WondersDuel.find({game: req.params.id})
    .populate('game')
    .populate({path: 'scores.user'})
    .then(result => res.json(result))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    const game = req.body.game;
    const scores = req.body.scores;
    const date = new Date();

    newResult = new Result7WondersDuel({
        game,
        scores,
        date
    });
    newResult.save()
    .then(() => res.json('Result added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) => {
    Result7WondersDuel.findById(req.params.id)
    .then( result => {
        result.game = req.body.game;
        result.scores = req.body.scores;
        result.date = Date.parse(req.body.date);

        result.save()
        .then(() => res.json('Result added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;