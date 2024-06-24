const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const app = express();

app.use(cors());

async function sendMessage(message) {
    const model = await genAI.getGenerativeModel({model: "gemini-pro"});
    const data = await model.generateContent(message);
    return data;
}

app.use(express.json());
app.post('', (request, response) => {
    let message = request.body.message;
    sendMessage(message).then((data) => {
        response.send({user: 'server', message: data.response.text()});
    });
});

app.listen(4000, () => {
    console.log('App is running...');
});