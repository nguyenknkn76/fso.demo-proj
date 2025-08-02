// const express = require('express');
import express from 'express';
// import {calculator2} from './calculate.ts'
// import _ from 'lodash';
import { calculator2 } from './calculate';
const app = express();
app.get('/ping', (_req, res) => {
    res.send('pong');
});
app.post('/calculate', (req, res) => {
    const { value1, value2, op } = req.body; /* no clue what the type will be */
    if (!value1 || isNaN(Number(value1))) {
        res.status(400).send({ error: '...' });
    }
    const operation = op;
    const result = calculator2(Number(value1), Number(value2), operation);
    res.json({ result });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('To test the server, visit http://localhost:3000/ping');
});
