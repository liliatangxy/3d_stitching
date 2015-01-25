var http = require('http');
var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var download = require('download-file');

var request = undefined;


http.createServer(function callback (req, res) 
{
	req.on('data', function(data)
	{
		//get the thing to be requested
		console.log(data.toString());

		request = data.toString();


		//get the data from google
		var options ={
			hostname: "https://www.googleapis.com/customsearch/v1?cx=000681453094033258501%3Atuuffghkcmu&q=" + request + "&searchType=image&fileType=.jpg&searchType=image&key=AIzaSyDA_i3ASjTZm1cz259vdesmlZ71aOsjoaM",
			method: "GET"
		}

		var xmlhttp = new XMLHttpRequest();

		xmlhttp.open("GET", options.hostname, true);
		xmlhttp.send();

		xmlhttp.onreadystatechange = function() 
		{		
			console.log("On ready state change");
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
			{
				var myArr = JSON.parse(xmlhttp.responseText);
				myFunction(myArr);
			}
		}

	});

}).listen(8000);




function myFunction(arr) 
{
	var items = arr.items;

	for(var i = 0; i < items.length; i++)
	{
		console.log(items[i].link);

		//download api thingy
		var url = items[i].link;

		var options = 
		{
    		directory: "./images/",
    		filename: "photo" + i + ".jpg"
		}

		download(url, options, function(err){
    		if (err) throw err
    		
		});
	}	
}













