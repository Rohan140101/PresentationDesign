require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const ejs = require('ejs')
const mongoose = require("mongoose");
const md5 = require('md5');
// const session = require('express-session');

const app = express()
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('assets'))
const url = process.env.MONGOD_API
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set("useCreateIndex", true);

const faqs = require(__dirname + "/assets/vendor/json/faqs.json")


const UserSchema = new mongoose.Schema({
	email:String,
	password:String
})

const User = new mongoose.model('User',UserSchema)

app.get("/",function(req,res){
	// console.log(url)
	// newUser = new User({
	// 	email:"rohan.kuckian",
	// 	password:"1234567"
	// })

	// newUser.save(function(err){
	// 	if(err){
	// 		console.log(err)
	// 	}
	// 	else{
	// 		console.log('Saved')
	// 	}
	// })
	res.render("index")
})

app.get("/pricing",function(req,res){
	res.render("pricing")
})

app.get("/faq",function(req,res){
	// console.log(faqs)
	res.render("faq",{faqs:faqs})
})

app.listen(3000,function(){
	console.log("Server running on port 3000")
})