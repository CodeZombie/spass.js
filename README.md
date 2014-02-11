spass.js
========

Realtime javascript-based password strength checker

![screenshot](http://i.imgur.com/Zd8HG74.gif)

###about
spass.js is a small function written for websites to help their soon-to-be users create a strong and secure password.
It checks a password for a length larger than 8, but recommends one greater than 12, checks for a mix of uppercase letters, lowercase letters, numbers and letters. In order to recieve a good strength mark, a password must meet all of these requirements, or make up for lacking requirements with exceptional length (for example, "Th3HoUs3F!rE" would score the same as "TheHouseFireTheHouseFire")

###usage
+ include spass.js in your html page with `<script type="text/javascript" src="../spass.min.js"></script>`
+ then in your javascript, `data = checkpassword(password);` will return an array of data.
+ the first value, `data[0]`, will be the numeric score given to the password.
+ the second value, `data[1]` will be a string of tips to help the user.
