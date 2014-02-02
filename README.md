# Hitchwiki Phrasebook for mobile.

[hitchwiki.org/phrasebook-v2](http://hitchwiki.org/phrasebook-v2/)


## Building

Tested on OSX, it should work on Linux and it just might work on Windows as well.

Clone repository (you need to have [git](http://git-scm.com/) on your path.)
```bash
git clone https://github.com/Hitchwiki/Phrasebook.git
```

Note that currently THIS version is in branch `v2`.

#### Requirements
* [NodeJS](http://nodejs.org/) & [NPM](https://npmjs.org/)
* [Grunt](http://gruntjs.com/)
* [Bower](http://bower.io/)
* [Python](http://www.python.org/)
* [ImageMagick](http://www.imagemagick.org/)

You can install requirements by running —

OSX with [Homebrew](http://brew.sh/):
```bash
brew install node
brew install imagemagic
```

Debian:
```bash
apt-get install nodejs python imagemagic
```

Running `npm install` in project directory will take care the rest requirements.


### HTML version

#### Install dependencies and initial build:
```bash
cd Phrasebook
npm install
grunt build
```

You'll get an optimized, production-ready version of the app to run in browser. Point your server to `./build/`.

If you want to do development, run:
```bash
grunt dev
```
It waits for changes in js/less/html files and runs needed tasks after each save.

To produce production version after initial build and development, run:
```bash
grunt prod
```

### Native mobile apps with Cordova
#### Requirements
* First build HTML version
* [Cordova](http://cordova.apache.org/) (wrap html to native app)
* SDKs for every platform you wish to support
** *[iOS SDK](http://developer.apple.com/)* with the latest Xcode and Xcode Command Line Tools
** *[Android SDK](http://developer.android.com/)* - NOTE This tool will not work unless you have the absolute latest updates for all Android SDK components. Also you will need the SDK's tools and platform-tools directories on your system path otherwise Android support will fail.
** *[BlackBerry 10 WebWorks SDK](http://developer.blackberry.com/html5/download/).* Make sure you have the dependencies/tools/bin folder inside the SDK directory added to your path!
** *[Windows Phone SDK](http://dev.windowsphone.com/en-us/downloadsdk)* - NOTE This tool will not work unless you have msbuild on your system path otherwise Windows Phone support will fail (msbuild.exe is generally located in C:\Windows\Microsoft.NET\Framework\v4.0.30319).

#### Build
```bash
cordova create Phrasebook com.hitchwiki.phrasebook "Phrasebook"
cd Phrasebook
cordova platform add ios
cordova emulate ios
```
```bash
cordova platform add android
cordova emulate android
```

* Follow [instructions from Cordova documentation](http://docs.phonegap.com/en/3.3.0/guide_cli_index.md.html#The%20Command-Line%20Interface):
* Copy files from this repository to your Cordova Phrasebook project folder (Copy contents from ./build/ to ./www/)

#### Platforms
Project is prepared (and tested [x]) for [Cordova](http://cordova.apache.org/) supported platforms:

- [x] Android
- [x] iOS
- [ ] Bada
- [ ] Blackberry
- [ ] Mac OS X
- [ ] QT
- [ ] Tizen
- [ ] WebOS
- [ ] Windows (desktop)
- [ ] Windows Phone 7
- [ ] Windows Phone 8

### Reset

If you want to clean all directories to pre-build state, run:
```bash
grunt reset
```


## Translate
* [Translation tool](http://hitchwiki.org/translate/projects/phrasebook)
* Add new languages or text strings directly to fetch-translations.py
* Produce fresh translation files by typing `python scripts/fetch-translations.py`. Script will download files from GlotPress and write translation source (.po/mo) files under `./src/assets/locale/`, json files to `./src/assets/locale-json/` and the list of locales to `./src/js/locales.js`

## Thanks a bunch!
* Thanks to all translators who helped us! (See About page from the app)
* [ISO country flags SVG collection](https://github.com/koppi/iso-country-flags-svg-collection)

## License
* Program code is licensed under MIT.
* Translations are lisenced under [Creative Commons Attribution-ShareAlike](http://creativecommons.org/licenses/by-sa/3.0/) license.

See [LICENSE](LICENSE) for more info.

## Contacts
* [Hitchwiki](http://hitchwiki.org/contact/)
* [Mikael](https://github.com/simison)