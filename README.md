# DHA Sensor app - 2019 edition - Jens & Collin

![Preview](preview.png)

# Overview
This app allows you to take a picture of the ISBN code on a book to get additional information about that book.
The app is build in ionic and uses the following sensors and api's to function:

http: https://openlibrary.org/developers/api <br>
Sensor 1: OCR https://ionicframework.com/docs/native/ocr <br>
Sensor 2: Camera https://ionicframework.com/docs/native/camera <br>

# Installation
- clone the repo <br>
- Make sure you have [nodeJS](https://nodejs.org/en/) installed 
- Run `npm install` from the root of the project <br>
- If you haven't used Ionic before run `npm install -g ionic` <br>

# Running

## To use the app on the web: <br>
Run `ionic serve` in a terminal from the project root

## To use the app on device:

### For iOS:
Make sure to try it on a Mac and to have your iPhone connected and<br>
Run `ionic cordova run ios --device` in a terminal from the project root.

### For Android:
Make sure to have your Android device connected and<br> 
Run `ionic cordova run android --device` in a terminal from the project root.
