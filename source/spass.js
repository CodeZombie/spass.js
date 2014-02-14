function checkpassword(pass) {
	var commonpasswords = new Array("123456","1234567","12345678","123456789","1234567890","password","qwerty","abc123","111111","iloveyou","adobe123","admin","letmein","monkey","shadow","sunshine","password1","princess","azerty","trustno1","000000","liverpool","charlie","696969","master","superman","harley","mustang","football","baseball","hunter2");
	
	var strength = 0;
	var score = 0;
	var charset = 0;
	var password = pass;
	var password_length = password.length;
	
	var trailing_numbers = 0;
	
	var message = "";
	
	//check if password is in the common list
	for (var w in commonpasswords) {
		if(password.toLowerCase() == commonpasswords[w]) {
			message = "Password too common.";
			score = 0;
			return Array(score, message);
		}
	}
	
	//check if password has trailing numbers and score them separately
	if(/[0-9]+$/.test(password)) {
		trailing_numbers = password.match(/[0-9]+$/)[0].toString().length;
		password_length -= trailing_numbers;
		strength += (Math.log(10)/Math.log(2))*trailing_numbers;
		password = password.slice(0,0-trailing_numbers);
		if(message != "") { message += ", "; }
		message += "numbers are less effective on the end";
	}
	
	if(/[0-9]/.test(password)) {
		charset += 10;
	}
	else {
		if(message != "") { message += ", "; }
		message += "no numbers in base of password";
	}
	
	if(/[a-z]/.test(password)) {
		charset += 26;
	}
	else {
		if(message != "") { message += ", "; }
		message += "no lowercase letters";
	}
	
	if(/[A-Z]/.test(password)) {
		charset += 26;
	}
	else {
		if(message != "") { message += ", "; }
		message += "no uppercase letters";
	}
	
	if(/[^a-zA-Z0-9]/.test(password)) {
		charset += 32;
	} 
	else {
		if(message != "") { message += ", "; }
		message += "no special characters";
	}

	//Length
	if(password_length <= 7) {
		if(message != "") { message += ", "; }
		message += "too short";
	}
	else if(password_length >= 8 && password_length < 10) {
		if(message != "") { message += ", "; }
		message += "length is passable";
	}
	else if(password_length >= 10 && password_length < 12) {
		if(message != "") { message += ", "; }
		message += "could be longer";
	}

	if(message != "") {
		message += ".";
	}
	
	if(charset != 0) {
		strength += (Math.log(charset)/Math.log(2))*password_length;
		score = strength / ((Math.log(94)/Math.log(2))*12);
		score = Math.round(score * 100);
		if(score > 100) {
			score = 100;
		}
	}
	else {
		score = 0;
	}

	message = message.charAt(0).toUpperCase() + message.substring(1);
	
	return Array(score,message);
}