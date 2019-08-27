const router = require('express').Router();
let User = require('./models/user');
router.route('/').get((req,res) => {
    User.find()
    .sort('username')
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/:id').get((req,res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const imgUrl = req.body.imgUrl;
    const newUser = new User({username,imgUrl});
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/update/:id').post((req,res) => {
    User.findById(req.params.id)
    .then(user => {
        user.username = req.body.username;
        user.imgUrl = req.body.imgUrl;
        user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;