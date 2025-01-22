const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

const messages = [
    {
        text: "Hi there!",
        user: "Amanda",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];


app.set('view engine', 'ejs'); // Set EJS as the view engine

app.get('/', (req, res) => {
    res.render('index', { title: 'Mini Message Board', messages: messages });
});

app.get('/new', (req, res) => {
    res.render('form', { title: 'Add a New Message' });
});

app.get('/message/:id', (req, res) => {
    const message = messages[req.params.id];
    if (message) {
        res.render('message', { title: 'Message Details', message });
    } else {
        res.status(404).send('Message not found');
    }
});


app.use(express.static('public'));

app.post('/new', (req, res) => {
    const { messageUser, messageText } = req.body;
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
