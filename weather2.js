//jshint esversion:6

//to enable the use of express framework
const express = require("express")
const app = express();
const bodyparser = require("body-parser")
// to enable the use of the http built in module
const https = require("https")

app.use(bodyparser.urlencoded({extended:true}));
// first get request through the express module
app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html");

	//res.send("<h1>You are viewing the home page</h1>")
})
app.post("/",function(req,res){
	 

	const query = req.body.cityName;
	var query1 = query.slice(0,1);
	query1 = query1.toUpperCase();
	var query2 = query.slice(1,);
	query2 = query2.toLowerCase();
	query4 = query1+query2 ;

	const unit = req.body.unit;
	//console.log(unit)

	if (unit == "C"){
		var mtric = "metric";
	}else if (unit == "K"){
		var mtric = "Standard";
	}else if (unit == "F"){
		var mtric = "imperial";
	}
	const apikey = "6c03a04cda23da6140918706a3adfbbf";
	//const mtric = "Standard";

	const url = "https://api.openweathermap.org/data/2.5/weather?q="+query4+"&appid="+apikey+"&units="+mtric;
	//console.log(url)
	https.get(url,function(response){
		console.log("Request Code : "+response.statusCode);

		response.on("data",function(data){
			const weatherdata = JSON.parse(data);
			const temp = weatherdata.main.temp;
			const description = weatherdata.weather[0].description;
			const icon = weatherdata.weather[0].icon;
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
})
//to listen at the port 3000
app.listen(3001,function(){
	console.log("I am listening at the port 3001 ")
})