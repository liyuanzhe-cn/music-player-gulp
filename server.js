const express = require('express');
const server = express();
const colors = require('colors')
const musiclist = require('./router/musiclist');
const bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({ extended: false }));

server.get('/',(req, res, next) => {

    console.log('有人来了'.red)
    // next()
})

server.use('/api', musiclist);


const port =  3000;
server.listen(port);
server.use(express.static("./music-player-gulp/dist/"));