//jshint esversion:6

//to enable the use of express framework
const express = require("express")
const app = express();
// to enable the use of the http built in module
const https = require("https")

//get request from the http sever

// first get request through the express module
app.get("/",function(req,res){
	const url = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=6c03a04cda23da6140918706a3adfbbf&units=metric"
	https.get(url,function(response){
		console.log("Request Code : "+response.statusCode)

		response.on("data",function(data){
			const weatherdata = JSON.parse(data)
			const temp = weatherdata.main.temp
			const description = weatherdata.weather[0].description
			const icon = weatherdata.weather[0].icon
			//console.log("Temp is :"+temp+" and Description :"+description+" and icon is :"+icon)
			//console.log(weatherdata)
			/*
			res.send("<h1>Temp is : "+temp+"<br>Description : "+description+"<br>Icon is : "+icon+"</h1>")
			*/
			res.write("<h1 style='color:red'>Temp is : "+temp+"</h1>")
			res.write("<h1>Description : "+description+"</h1>")
			res.write("<h1>Icon is : "+icon+"</h1>")
			res.send()

		})
	})

	//res.send("<h1>You are viewing the home page</h1>")
})
//to listen at the port 3000
app.listen(3000,function(){
	console.log("I am listening at the port 3000 ")
})