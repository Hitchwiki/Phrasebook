# Hitchwiki Phrasebook for mobile.


### Platforms

Project is prepared for [Cordova](http://cordova.apache.org/) supported platforms:

- Android
- iOS
- Bada
- Blackberry
- iOS
- Mac OS X
- QT
- Tizen
- WebOS
- Windows (desktop)
- Windows Phone 7
- Windows Phone 8

### Build the App

- Install Cordova
- Install SDK's you'd need
- Follow [instructions from Cordova documentation](http://docs.phonegap.com/en/2.9.0/guide_cli_index.md.html#The%20Cordova%20Command-line%20Interface_build_the_app):
``cordova create Phrasebook com.hitchwiki.phrasebook "Phrasebook"``
``cd Phrasebook``
``cordova platform add ios``
``cordova platform add android``
``cordova emulate ios``
- Copy files from this repository to Phrasebook project folder (override ./www/)


### Translate
- [Translation tool](http://hitchwiki.org/translate/projects/phrasebook)
- Add new languages or text strings directly to languages.py
- Produce fresh languages.js by typing `python languages.py`. Script will write to ./www/assets/js/languages.js


### Run in browser
Open `./www/index.html` in your browser. Live demo: [hitchwiki.org/phrasebook](http://hitchwiki.org/phrasebook/)


For more info contact [Mikael](https://github.com/simison)