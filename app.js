require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const ejs = require('ejs')
const mongoose = require("mongoose");
const md5 = require('md5');
const session = require('express-session');
var cookieParser = require('cookie-parser');
// const loginRegister = require(__dirname + '/assets/js/login-register.js')

const app = express()
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('assets'))
const url = process.env.MONGOD_API
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set("useCreateIndex", true);
var sess = {
  secret: 'keyboard cat',
  cookie: {}
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(cookieParser())
app.use(session(sess))


const faqs = require(__dirname + "/assets/vendor/json/faqs.json")


const UserSchema = new mongoose.Schema({
	email:String,
	password:String
})

const User = new mongoose.model('User',UserSchema)

app.get("/",function(req,res){
	if(req.session.user){
		res.render("index",{email:req.session.user.email})
	} else {
		res.render("index",{email:""})
	}
	
})

app.post("/register",function(req,res){
	let email = req.body.email
	let password = md5(req.body.password)
	newUser = new User({
		email:email,
		password:password
	})

	newUser.save(function(err){
		if(err){
			console.log(err)
		}
		else{
			console.log('Saved')
			res.render("user-created")

		}
	})
})

app.post("/login",function(req,res){
	let email = req.body.email
	let password = md5(req.body.password)
	User.findOne({email:email},function(err,foundUser){
		if (err) {
			console.log(err)
		}
		else{
			if (password == foundUser.password) {
				console.log("User Found")
				req.session.user = foundUser
				res.redirect("/")
			}
			else{
				console.log('no user')
			}
		}
	})

})

app.get("/pricing",function(req,res){
	res.render("pricing")
})

app.get("/faq",function(req,res){
	// console.log(faqs)
	res.render("faq",{faqs:faqs})
})

app.get('/logout', function(req, res){
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/');
});

app.listen(3000,function(){
	console.log("Server running on port 3000")
})