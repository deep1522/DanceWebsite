const express=require("express");
const path=require("path");
const app=express();
const port=8000;
const fs=require("fs")
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contacts');
}

//Defing mongoos schema

const contactSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Phone: String,
    Message: String,
    
});

var contact = mongoose.model('contact', contactSchema);

// app.use(express.static('static',options))
app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
});
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
});
app.get('/About',(req,res)=>{
    const params={}
    res.status(200).render('About.pug',params);
});
app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save();
    
});
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});