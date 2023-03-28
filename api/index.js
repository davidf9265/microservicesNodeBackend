const express = require('express');

const config = require('../config.js');
const user = require('./components/user/network.js');
const auth = require('./components/auth/network.js')


const app = express();

app.use(express.json());

// ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth);


app.listen(config.api.port, () => {
    console.log('API listening on port', config.api.port);
});