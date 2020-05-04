const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    req.headers['x-forwarded-proto'] === 'https' ? next() : res.redirect(`https://${req.headers.host}${req.originalUrl}`);
  });
}
const port = process.env.PORT || 5000;
const dbUrl = process.env.MONGO_URL;// || 'mongodb://localhost:27017/bgresults';
app.use(cors());
app.use(express.json());

mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true } );
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', () => {
    console.log('MongoDB database connected!')
});

const usersRouter = require('./users');
const gamesRouter = require('./games');
const resultsRouter = require('./results');
const results7WondersDuelRouter = require('./results7WondersDuel');
app.use('/api/users', usersRouter);
app.use('/api/games', gamesRouter);
app.use('/api/results', resultsRouter);
app.use('/api/results-7-wonders-duel', results7WondersDuelRouter);


const buildPath = path.join(__dirname, '../client/build');
app.use(express.static(buildPath));
app.get('/*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });