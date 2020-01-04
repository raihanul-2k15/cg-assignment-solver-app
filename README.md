# cg-assignment-solver-app

This is a fun web-app that solves Computer Graphics assignment (roll number based question set by teacher) for my classmates based on wheter or not they have starred some of my GitHub repos. It checks that through a backend server running made with ExpressJS running on NodeJS.

The backend code is at: https://github.com/raihanul-2k15/cg-assignment-access-server

### How it works

First a person loads the web app and requests access to his solution. The request is sent to the backend server where it will do its thing and return a response with whether or not he's granted. If he's not granted, he'll be showed the links to the repos to star. Otherwise he can load his solution.

### What have been used

1. ReactJS
2. Material-UI
3. axios
4. react-mathjax2 for LaTeX type styling

### Limitations
The assignment solution code is actually on the app itself so if someone really wants to access his solution without starring my repos, he can dig through the app source.
But since this app has been built with Creat-React-App, the minified build has all the code obfuscated I belived. So he'll have a hard time digging out the solution code.

## Note

1. The code is set up to grant access to any valid roll number, without checking the server. If you want to set up the server and set up this client side to ask server for access, then check the src/store.js file.
2. The roll field accepts roll numbers in teh form xx07yyy. To change it, check the RollForm.js file.