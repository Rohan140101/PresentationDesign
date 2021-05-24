const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('assets'))

const faqs = require(__dirname + "/assets/vendor/json/faqs.json")


app.get("/",function(req,res){
	res.render("index")
})

app.get("/pricing",function(req,res){
	res.render("pricing")
})

app.get("/faq",function(req,res){
	console.log(faqs)
	res.render("faq",{faqs:faqs})
})

app.listen(3000,function(){
	console.log("Server running on port 3000")
})