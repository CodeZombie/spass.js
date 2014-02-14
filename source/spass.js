/*
spass.js (securepass) by Cazum (zombiearmy.net)

	spass.js works by calculating the total bits of entropy for your given 
password(log2(Charset) * L), and comparing it against what many would regard as
a "safe" password (log2(94) bits of entropy  multiplied by 12 character length).

	spass.js also checks for common passwords, and deducts score from that (only 
awarding score to the variations applied on top of said common password), and for 
common patterns that a brute-force program might look for (numbers at the end of 
a password, etc) and reduces score accordingly.

* MIT LICENSE
* Copyright (C) 2014 by Jeremy Clark
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/
function checkpassword(pass) {
	var commonpasswords = new Array("123",
									"456",
									"789",
									"secret",
									"internet",
									"password",
									"dragon",
									"qwerty",
									"abc123",
									"iloveyou",
									"letmein",
									"adobe",
									"cookie",
									"coffee",
									"biteme",
									"admin",
									"monkey",
									"shadow",
									"sunshine",
									"computer",
									"princess",
									"azerty",
									"trustno1",
									"liverpool",
									"charlie",
									"6969",
									"master",
									"superman",
									"harley",
									"mustang",
									"football",
									"baseball",
									"hunter",
									"beaver",
									"banana",
									"chicken",
									"whatever",
									"welcome",
									"superman",
									"hotdog",
									"iloveyou",
									"cowboy");
	var strength = 0;
	var score = 0;
	var charset = 0;
	var password = pass;
	var password_length = password.length;
	
	var message = "";
	
	var trailing_numbers = 0;
	var common_password_count = 0;
	var common_password_search_loop = true; //initiate the recursive search loop

	//check if password contains a common phrase
	while(common_password_search_loop == true) {
		var found = false; 
		for(var x in commonpasswords) {
			if(password.indexOf(commonpasswords[x]) !== -1) {
				common_password_count += 1;
				password_length -= commonpasswords[x].length;
				password = password.replace(commonpasswords[x],"");
				found = true; //found a common password, so keep searching for more.
			}
		}
		if(found == false) {
			common_password_search_loop = false; //couldn't find any common passwords, so break the loop.
		}
	}
	if(common_password_count > 0) {
		strength = (Math.log(50)/Math.log(2)) * common_password_count;// our list is derived from the top 50 passwords
		if(common_password_count > 1) {
			message += "common passwords found, ";
		}
		else {
			message += "common password found, ";
		}
	}
	
	//check if password has trailing numbers and score them separately
	if(/[^0-9]{1,}([0-9]{1,})$/g.test(pass)) {
		trailing_numbers = /[^0-9]{1,}([0-9]{1,})$/g.exec(pass)[1].toString().length;
		password_length -= trailing_numbers;
		strength += (Math.log(10)/Math.log(2))*trailing_numbers;
		password = password.slice(0,0-trailing_numbers);
		message += "numbers are less effective on the end, ";
	}
	//TODO: 
	
		//check if password ends with a ? or !
	
		//check if first letter is a capital
	
		//check for three repeating characters (helllo, passsword, hi999)
	
	if(/[0-9]/.test(password)) {
		charset += 10;
	}
	else {
		message += "no numbers in base of password, ";
	}
	
	if(/[a-z]/.test(password)) {
		charset += 26;
	}
	else {
		message += "no lowercase letters, ";
	}
	
	if(/[A-Z]/.test(password)) {
		charset += 26;
	}
	else {
		message += "no uppercase letters, ";
	}
	
	if(/[^a-zA-Z0-9]/.test(password)) {
		charset += 32;
	} 
	else {
		message += "no special characters, ";
	}

	//Length
	if(password_length <= 7) {
		message += "too short, ";
	}
	else if(password_length >= 8 && password_length < 10) {
		message += "length is passable, ";
	}
	else if(password_length >= 10 && password_length < 12) {
		message += "could be longer, ";
	}
	
	if(charset > 0) {
		strength += (Math.log(charset)/Math.log(2))*password_length;
	}
	score = strength / 78.65;//78.65 = log2(94) * 12
	score = Math.round(score * 100);
	
	if(score > 100) {
		score = 100;
	}
	
	//Strip out any trailing ", "
	if(message.charAt(message.length-2) == ",") {
		message = message.slice(0,message.length-2);
	}
	
	//Add a "." to the end of the message
	if(message != "") {
		message += ".";
	}
	
	//Capitalize the first word
	message = message.charAt(0).toUpperCase() + message.substring(1);
	
	return Array(score,message);
}