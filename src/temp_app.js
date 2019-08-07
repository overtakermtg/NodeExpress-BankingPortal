const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const { accounts, users, writeJSON } = require('./data.js');

const accounRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extends: true}));


app.get('/profile', (req, res) => { 
    res.render('profile', { users: users[0] });
});



// ese account del final le da acceso al sitio llamado a ese objeto
app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts }));

app.use('/account', accounRoutes);
app.use('/services', servicesRoutes);



app.listen(3000);