const express = require('express');

const accountRouter = require('./Router/account-router')

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountRouter);

server.get('/', (req, res) => {
    res.send('testing')
})



module.exports = server;