spass.js
========

Realtime javascript-based password strength checker

![screenshot](http://i.imgur.com/Zd8HG74.gif)

[Try out the demo](http://codezombie.github.io/spass.js)

###about
spass.js is a small function written for websites to help their soon-to-be users create a strong and secure password.
spass.js checks for a long password length (~12), a mix of uppercase letters, lowercase letters, numbers, and special characters. In order to receive a good score, a password must meet all of these requirements, or make up for lacking requirements with exceptionally length (for example, "Th3HoUs3F!rE" would score the same as "TheHouseFireTheHouseFire"). spass.js also checks for certain patterns that are commonly looked for by brute-forcing software. For example, numbers on the end won't increase the score as much as if they were in the center of the password. Note: spass.js will not check for dictionary words. This wouldn't be practical for a javacript file. I suggest an ajax->server-side-script to avoid having to send a dictionary file to the user.

###usage
+ include spass.js in your html page with `<script type="text/javascript" src="../spass.min.js"></script>`
+ then in your javascript, `data = checkpassword(password);` will return an array of data.
+ the first value, `data[0]`, will be the numeric score given to the password.
+ the second value, `data[1]` will be a string of tips to help the user.
