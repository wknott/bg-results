const router = require('express').Router();
let Result = require('./models/result');
router.route('/').get((req,res) => {
    Result.find()
    .then(results => res.json(results))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    Result.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    const gameId = req.body.gameId;
    const scores = req.body.scores;
    const date = new Date();

    newResult = new Result({
        gameId,
        scores,
        date
    });
    newResult.save()
    .then(() => res.json('Result added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) => {
    Result.findById(req.params.id)
    .then( result => {
        result.gameId = req.body.gameId;
        result.scores = req.body.scores;
        result.date = Date.parse(req.body.date);

        result.save()
        .then(() => res.json('Result added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;