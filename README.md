### Setup

1) Install npm packages first:
```
$ npm install
```

2) Run on browser
```
$ npm run start
```
3) Run a Build
```
$ npm run build
```

Notes

Spent time attempting to create a function to read data from a txt file but I
could not get it to work, tried fetch and XMLHttpRequest to access the file but
it continued to log the index.html. So I decided to convert the questions and choices into
an array of objects.

Also, did not know that you could export the pictures from Figma, I had found pictures online
initially and tried to manipulate them. Also note I could not figure out what path to use
for the left and right arrow png when I dynamically created the button. I tried to assign the src as a relative
path and it did not work then tried it with document.location.href and window.location.href but that did not work.
The left and right buttons however are functional.

I did not finish making it responsive.
