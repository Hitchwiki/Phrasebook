# Hitchwiki Phrasebook for mobile.

* Live [hitchwiki.org/phrasebook-v2](http://hitchwiki.org/phrasebook-v2/)
* Docs [hitchwiki.org/phrasebook-v2/docs/](http://hitchwiki.org/phrasebook-v2/docs/)


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

### HTML version

#### Install dependencies and initial build:
```bash
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

If [Hitchwiki translation tool](http://hitchwiki.org/translate/) is offline, you can use translations shipped in package by running:
```bash
sh scripts/extract-translations.sh
```

### Native mobile apps with Cordova-PhoneGap
#### Requirements
* First build HTML version
* [PhoneGap](http://phonegap.com/)
  * `npm install phonegap -g`
* SDKs for every platform you wish to support, check [Platform Guides](http://docs.phonegap.com/en/3.3.0/guide_platforms_index.md.html#Platform%20Guides)

Build/run/release with [Grunt PhoneGap](https://npmjs.org/package/grunt-phonegap) tasks:

#### Build
```bash
grunt phonegap:build[:platform]
```

Running `grunt phonegap:build` with no arguments will build both `ios` and `android` versions. See results from `phonegap` folder.

#### Run

```bash
grunt phonegap:run[:platform][:device]
```

After a build is complete, the phonegap:run grunt task can be used to launch your app on an emulator or hardware device. It accepts two optional arguments, platform and device.

Example: `grunt phonegap:run:android:emulator`

If you are using the Android platform, you can see the list of connected devices by running `adb devices`.

#### Release

```bash
grunt phonegap:release[:platform]
```

Create a releases/ directory containing a signed application package for distribution.

Currently android is the only platform supported by this task.

[Read more](https://npmjs.org/package/grunt-phonegap#tasks)


### Reset

If you want to clean all directories to pre-build state, run:
```bash
grunt reset
```


## Translate
* [Translation tool](http://hitchwiki.org/translate/projects/phrasebook). You can login with your [Hitchwiki](http://hitchwiki.org) username and password to start translating.
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