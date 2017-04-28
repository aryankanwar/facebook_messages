//npm module to intercat with facebook
var FB = require('fb');
var request =require('request');
//for writing the messages in the file
var fs = require('fs');
var file = fs.createWriteStream('convo.txt');
//enter your graph api access token with read_mailbox permission from API version 2.3 or less
// because new versions dont have permission for reading inbox 
var os =require('os') ;
FB.setAccessToken('<acess_token>');
//repalce 9920886008349255887535345  by the id of chat thread you want to see messages
var count   = 0;
var message = '';
FB.api('/992088600834925588753534','GET',{"fields":"comments.limit(1000){id,message}"},function(response) {
    for(i=0;i<response.comments.data.length;i++){
        message =response.comments.data[i].message;
//Facebook graph api provides only text messages ,links emojis but not picture messages
//I have hardcoded the undefined picture message 	    
        if(typeof message == "undefined"){
            message = 'Picture message';
        }
        console.log(message);
        file.write(message +os.EOL);
        count++;
    }
//Passing the first next page url	
    getData(response.comments.paging.next);
});

function getData(url) {
  request(url , function (err, response) {
	  if(err){
// For handling Internet connection error like{ [Error: socket hang up] code: 'ECONNRESET' }
// keep on making a request to server until data is fetched so that our script doesnt terminate in middle		  
		  if(err == 'ECONNRESET'){
			  getData(url);
		  }
		  return;
	  }	        
    try{
    	var body = JSON.parse(response.body);
	if(typeof body == "undefined"){
		return;
	}
//this function calculates message count and shows message conversation 
//also it stores messages in a file
    	inboxMessage(body);
    }catch(err){
	console.log(err);
    }
  });
}

function inboxMessage(body){
	try{
		for(var i=0; i<body.data.length; i++){
	  		message = JSON.stringify(body.data[i].message);
	  		if(typeof message == "undefined"){
	  			message = 'Picture message';
	  		}
          		console.log(message);
          		file.write(message + os.EOL);
          		count++; //to get count of messages
		}
// Marks the ending condition when paging next url contains empty data or no messages are left 		  
        	if(typeof body.paging === "undefined" || !body.paging.next){
			var message_count = "Total number of messages :"+ count;
           		console.log(message_count);
           		file.write(message_count);
           		return;
		}
	        var url =body.paging.next;
//sleep delay is introduced  so that our API is not restricted by facebook for so many requests      
        	sleep(2);
// a new paging url is paased         
		getData(url);
	}catch(err){
		console.log(err);
	} 
}

function sleep(seconds){
    var waitUntil = new Date().getTime() + seconds*1000;
    while(new Date().getTime() < waitUntil) true;
}
