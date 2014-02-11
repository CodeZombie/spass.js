function checkpassword(password) {
	var numbers = new Array('1','2','3','4','5','6','7','8','9','0');
	var letters = new Array("a",'b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
	var commonpasswords = new Array("123456","1234567","12345678","123456789","1234567890","password","qwerty","abc123","111111","iloveyou","adobe123","admin","letmein","monkey","shadow","sunshine","password1","princess","azerty","trustno1","000000","liverpool","charlie","696969","master","superman","harley","mustang","football","baseball","hunter2");
	
	var score = 0;
	
	var score_length = 0;
	var score_mix = 0;
	var score_upper = 0;
	var score_alphanum = 0;
	var score_special = 0;
	
	var number_of_numbers = 0;
	var number_of_letters = 0;
	var number_of_uppers = 0;
	var number_of_specials = 0;

	var message = "";
	
	//check if password is in the common list
	for (var w in commonpasswords) {
		if(password == commonpasswords[w]) {
			message = "Password too common";
			score = 0;
			return Array(score, message);
		}
	}
	
	//grab data about the password
	for(i = 0; i <= password.length-1; i++) {
		found = false;
		for(var x in numbers) {
			if(password.charAt(i) === numbers[x].toString()) {
				number_of_numbers++;
				found = true;
			}
		}
		if(!found) {
			for(var y in letters) {
				if(password.charAt(i).toLowerCase() === letters[y].toLowerCase()) {
					number_of_letters++;
					found = true;
				}
				if(password.charAt(i) === letters[y].toUpperCase()) {
					number_of_uppers++;
					found = true;
				}
			}
		}
		if(!found) {
			number_of_specials++;
		}
	}
	
	//Length
	if(password.length <= 7) {
		message += "too short";
	}
	else if(password.length >= 8 && password.length < 10) {
		message += "length is passable";
	}
	else if(password.length >= 10 && password.length < 12) {
		message += "could be longer";
	}
	else if(password.length >= 12) {
		//length is good
	}
	
	//Uppercase / Lowercase
	if(number_of_uppers >= 1 && number_of_letters - number_of_uppers >= 1) {
		score_upper = 16.65;
	}
	else if(number_of_uppers < 1) {
		if(message != "") { message += ", "; }
		message += "no upper case letters";
	}
	else if(number_of_letters-number_of_uppers < 1) {
		if(message != "") { message += ", "; }
		message += "no lower case letters";
	}
	
	//Special characters
	if(number_of_specials >= 1 && password.length-number_of_specials >= 1) {
		score_special = 33.3;
	}
	else if(number_of_specials < 1) {
		if(message != "") { message += ", "; }
		message += "no special characters";
	}
	else if(password.length-number_of_specials < 1) {
		if(message != "") { message += ", "; }
		message += "no letters/numbers";
	}
	
	//Numbers
	if(number_of_numbers >= 1 && password.length-number_of_numbers >= 1) {
		score_alphanum = 16.65;
	}
	else if(number_of_numbers < 1) {
		if(message != "") { message += ", "; }
		message += "no numbers";
	}
	else if(password.length-number_of_numbers < 1) {
		if(message != "") { message += ", "; }
		message += "no letters";
	}
	
	if(message != "") {
		message += ".";
	}
	//we want the password length to account for 33.3% of the total score. 33.3/12 = 2.775
	score = Math.round((password.length * 2.775) + ((score_upper + score_alphanum + score_special) * (password.length * 0.085)));//0.085 = 1/12 (12 = recommended password length)
	if(score > 100) {
		score = 100;
	}
	if(message == "") {
		message = "None.";
	}
	message = message.charAt(0).toUpperCase() + message.substring(1);
	return Array(score,message);
}