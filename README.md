# Hitchwiki Phrasebook for mobile.

# Building

Clone repository (requires [Git](http://git-scm.com/))
```bash
git clone https://github.com/Hitchwiki/Phrasebook.git
cd Phrasebook
```

## HTML version
### Requirements
* [NPM](https://npmjs.org/)
* [Grunt](http://gruntjs.com/)
* [Bower](http://bower.io/)
* [Python](http://www.python.org/)

### Run
```bash
npm install
grunt
```

Point your server to `./www/`.

Live demo: [hitchwiki.org/phrasebook-v2](http://hitchwiki.org/phrasebook-v2/)

If you want to do development, run:
```bash
grunt watch
```

## Native mobile apps with Cordova
### Requirements
* [Cordova](http://cordova.apache.org/) (wrap html to native app)
* [Xcode](https://developer.apple.com/xcode/) (producing Cordova iOS app)
* [Eclipse](https://www.eclipse.org/) (producing Cordova Android app)

### Run
```bash
cordova create Phrasebook com.hitchwiki.phrasebook "Phrasebook"
cd Phrasebook
cordova platform add ios
cordova platform add android
cordova emulate ios
```

* Follow [instructions from Cordova documentation](http://docs.phonegap.com/en/3.3.0/guide_cli_index.md.html#The%20Command-Line%20Interface):
* Copy files from this repository to your Cordova Phrasebook project folder (override ./www/)

### Platforms
Project is prepared for [Cordova](http://cordova.apache.org/) supported platforms:

* Android (tested)
* iOS (tested)
* Bada
* Blackberry
* Mac OS X
* QT
* Tizen
* WebOS
* Windows (desktop)
* Windows Phone 7
* Windows Phone 8

# Translate
* [Translation tool](http://hitchwiki.org/translate/projects/phrasebook)
* Add new languages or text strings directly to fetch-translations.py
* Produce fresh languages.js by typing `python fetch-translations.py`. Script will download files from GlotPress and write translation json files under `./www/assets/locale/` and a list of locales to `./src/js/locales.js`

# Thanks a bunch!
* Thanks to all translators who helped us! (See About page from the app)
* [ISO country flags SVG collection](https://github.com/koppi/iso-country-flags-svg-collection)

# License
* Program code is licensed under MIT.
* Translations are lisenced under [Creative Commons Attribution-ShareAlike](http://creativecommons.org/licenses/by-sa/3.0/) license.
See [LICENSE](LICENSE) for more info.

# Contacts
* [Hitchwiki](http://hitchwiki.org/contact/)
* [Mikael](https://github.com/simison)