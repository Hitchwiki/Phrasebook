#!/usr/bin/python
# -*- coding: UTF-8 -*-

import gettext
import json
import datetime
import os
import urllib2


#
# Configuration
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #


# Path to GlotPress
glotpress = 'http://hitchwiki.org/translate/';

# Project name at GlotPress
projectname = 'phrasebook';

# Where to store language .mo and .po files
localeSrcDir = 'src/locale/';

# Where to store language .json files
localeJsonDir = 'src/locale-json/';

# Where to store language list .js file
localesListFile = 'src/js/locales.js';

# Where to store phrasebook keys .js file
localesStructureFile = 'src/js/locales-structure.js';

defaultUIFile = 'src/js/locales-default-ui.js';

# Character dividing dialects,transliterations etc from language code. Eg. "ru_RU@transliteration" or "en_UK@pirate"
localeExtraDivider = '@';

# Define languages here
# Make sure you have .mo file in place under ./locale/
languages = [

    # Code     GP-path  English name              Original name            RTL?     # transliteration/phonetic
    [ "sq_AL", "sq",    "Albanian",               "Gjuha shqipe",          False,   [] ],
#   [ "ar",    "ar",    "Arabic",                 "العربية",                   True,    ['transliteration'] ],
    [ "bg_BG", "bg",    "Bulgarian",              "български език",        False,   ['transliteration'] ],
    [ "ca_ES", "ca",    "Catalan",                "Català",                False,   [] ],
    [ "cs_CZ", "cs",    "Czech",                  "Čeština",               False,   [] ],
    [ "da_DK", "da",    "Danish",                 "Dansk",                 False,   [] ],
    [ "nl_NL", "nl",    "Dutch",                  "Nederlands",            False,   [] ],
    [ "de_DE", "de",    "German",                 "Deutch",                False,   [] ],
    [ "el_GR", "el",    "Greek",                  "ελληνικά",               False,   ['transliteration'] ],
    [ "et_EE", "et",    "Estonian",               "Eesti keel",            False,   [] ],
    [ "en_UK", "en-gb", "English (UK)",           "English (UK)",          False,   [] ],
    [ "en_US", "en",    "English (US)",           "English (US)",          False,   [] ],
    [ "es_ES", "es",    "Spanish",                "Español",               False,   [] ],
    [ "fi_FI", "fi",    "Finnish",                "Suomi",                 False,   [] ],
    [ "fr_FR", "fr",    "French",                 "Français",              False,   [] ],
    [ "hr_HR", "hr",    "Croatian",               "Hrvatski",              False,   [] ],
    [ "he_IL", "he",    "Hebrew",                 "עברית",                  True,    ['transliteration'] ],
    [ "hu_HU", "hu",    "Hungarian",              "Magyar",                False,   [] ],
    [ "is_IS", "is",    "Icelandic",              "íslenska",              False,   [] ],
    [ "it_IT", "it",    "Italian",                "Italiano",              False,   [] ],
    [ "id_ID", "id",    "Indonesian",             "Bahasa Indonesia",      False,   [] ],
    [ "ja_JP", "ja",    "Japanese",               "日本語",                 False,   [] ], #['transliteration'] ],
    [ "lt_LT", "lt",    "Lithuanian",             "Lietuvių",              False,   [] ],
    [ "lv_LV", "lv",    "Latvian",                "Latviešu",              False,   [] ],
    [ "ms_MY", "ms",    "Malaysian",              "Bahasa Melayu",         False,   [] ],
    [ "mt_MT", "mt",    "Maltese",                "Malti",                 False,   [] ],
    [ "nb_NO", "nb",    "Norwegian (Bokmål)",     "Norsk (Bokmål)",        False,   [] ],
    [ "pl_PL", "pl",    "Polish",                 "Polski",                False,   [] ],
    [ "pt_PT", "pt",    "Portuguese",             "Português",             False,   [] ],
    [ "pt_BR", "pt-br", "Portuguese (Brazil)",    "Português (Brazil)",    False,   [] ],
    [ "ro_RO", "ro",    "Romanian",               "Română",                False,   [] ],
    [ "ru_RU", "ru",    "Russian",                "Русский",               False,   ['transliteration'] ],
    [ "sr_RS", "sr",    "Serbian",                "српски",                False,   ['transliteration'] ],
    [ "sk_SK", "sk",    "Slovakian",              "Slovenčina",            False,   [] ],
    [ "sl_SI", "sl",    "Slovenian",              "Slovenščina",           False,   [] ],
    [ "sv_SE", "sv",    "Swedish",                "Svenska",               False,   [] ],
    [ "tr_TR", "tr",    "Turkish",                "Türkçe",                False,   [] ],
    [ "uk_UA", "uk",    "Ukrainian",              "Українська мова",       False,   ['transliteration'] ],
#   [ "ga_IE", "ga",    "Irish",                  "Gaeilge"                False,   [] ],
#   [ "gd_GB", "gd",    "Scottish Gaelic",        "Gàidhlig"               False,   [] ],
#   [ "mk_MK", "mk",    "Macedonian",             "Makedonski",            False,   [] ],
#   [ "th_TH", "th",    "Thai",                   "ภาษาไทย",               False    ['transliteration'] ]
#   [ "fa_IR", "fa",    "Persian",                "فارسی",                   True,    ['transliteration'] ],
#   [ "tl_PH", "tl",    "Tagalog",                "Tagalog",               False,   [] ],
#   [ "zh_CN", "zh",    "Chinese",                "中文",                   False,   ['transliteration'] ],

]

# Language of original strings
localesOrig = 'en_UK'


error_count = 0;

#
# Function to download and save language files from GlotPress
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
def fetchLanguage(language):

    print "Downloading..."

    # Path where to save files
    srcDirectory = localeSrcDir+'%s/LC_MESSAGES/' % language[0]

    # If language directory doesn't exist, create it
    if not os.path.isdir(srcDirectory):
        print srcDirectory + " doesn't exist, creating it."
        os.makedirs(srcDirectory)

    # URL for fetching translation sources
    fetchURL = glotpress + 'projects/' + projectname + '/' + language[1] + '/' + language[0] + '/export-translations?format='

    # Download and save files in two formats
    for fileformat in ['po', 'mo']:

        # Fetch language file
        response = urllib2.urlopen( fetchURL + fileformat)
        poContents = response.read()

        # Save language file
        fp = open(srcDirectory + projectname + '.' + fileformat, 'w')
        fp.write(poContents)
        fp.close()

    return True




#
# Returns chunk of translated texts in one langauge as an array
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
def translateLanguage(language):

    # Prepare gettext for this language
    try:
        translation = gettext.translation(projectname, localeSrcDir, languages=[language], fallback=False)
    except IOError:
        print "Locale " + language + " not found from " + localeSrcDir + ". Using default messages."
        translation = gettext.NullTranslations()

    translation.install()

    _ = translation.gettext

    print "Translating..."

    strings = {
        'phrasebook': {
            'hitchhike': _("Hitchhike"),
            'hitchhiker': _("Hitchhiker"),
            'hello': _("Hello"),
            'bye': _("Goodbye"),
            'excuse_me': _("Excuse me..."),
            'sorry': _("Sorry"),
            'are_you_going_towards': _("Are you going towards ...?"),
            'could_get_lift_to': _("Could I get a lift to ...?"),
            'just_before': _("just before"),
            'just_after': _("just after"),
            'petrol_station': _("a petrol station"),
            'service_area': _("a service area"),
            'rest_area': _("a lay-by"),
            'rest_area': _("rest area"),
            'along_the_highway': _("along the highway"),
            'roundabout': _("roundabout"),
            'junction': _("the junction"),
            'tjunction': _("the T-junction"),
            'crossroads': _("the crossroads"),
            'ring_road': _("on the ring road"),
            'across_the_road': _("across the road"),
            'hour': _("Hour"),
            'day':_("Day"),
            'week':_("Week"),
            'month':_("Month"),
            'year':_("Year"),
            'kilometre': _("Kilometre"),
            'left': _("Left"),
            'right': _("Right"),
            'straight_on': _("Straight on"),
            'before': _("Before"),
            'after': _("After"),
            'this': _("This"),
            'next': _("Next"),
            'last': _("Last"),
            'often': _("Often"),
            'never': _("Never"),
            'sometimes': _("Sometimes"),
            'rarely': _("Rarely"),
            'long': _("Long"),
            'short': _("Short"),
            'up': _("Up"),
            'down': _("Down"),
            'over': _("Over"),
            'under': _("Under"),
            'how_far': _("How far is it (on foot)?"),
            'where_are_we': _("Where are we?"),
            'for_free': _("For free?"),
            'money': _("Money"),
            'i_cant_pay': _("I can't pay."),
            'do_you_speak': _("Do you speak ...?"),
            'any_other_languages': _("any other languages"),
            'speak_slower': _("Speak slower, please?"),
            'i_dont_understand': _("I don't understand"),
            'i_dont_know': _("I don't know"),
            'yes': _("Yes"),
            'no': _("No"),
            'maybe': _("Maybe"),
            'no_thanks': _("No thanks"),
            'thats_great': _("That's great"),
            'perfect': _("perfect"),
            'bad': _("bad"),
            'no_problem': _("no problem"),
            'ok': _("Okay"),
            'im_not_in_hurry': _("I'm not in a hurry"),
            'im_going_to': _("I'm going to ..."),
            'where_going': _("Where are you going to?"),
            'my_name_is': _("My name is ..."),
            'whats_your_name': _("What's your name?"),
            'im_from': _("I'm from ..."),
            'where_are_you_from': _("Where are you from?"),
            'am_years_old': _("I'm ... years old."),
            'how_old': _("How old are you?"),
            'i_study': _("I study ..."),
            'im_in_year': _("I'm in my ... year."),
            'im_studying': _("I am studying to be a ..."),
            'im_holiday': _("I'm on holiday."),
            'im_visiting': _("I'm visiting friends in ..."),
            'im_hh_around': _("I'm hitchhiking around ..."),
            'im_will_stay': _("I will stay for ... days/weeks"),
            'im_going_back': _("I'm going back to ..."),
            'drop_me_off': _("Can you drop me off here?"),
            'i_have_friend': _("I have a boy-friend/a girl-friend."),
            'im_married': _("I'm married."),
            'texted_my_father': _("I have already texted my father."),
            'dont_touch_me': _("Don't touch me!"),
            'let_me_out': _("Let me out!"),
            'pull_over': _("Pull over I'm going to puke!"),
            'stop': _("Stop!"),
            'help': _("Help!"),
            'thank_you': _("Thank you!"),
            'have_nice_day': _("Have a nice day/trip!"),
            'where_can_i_find': _("Where can I find ...?"),
            'hitchhiking_spot': _("a good hitchhiking spot"),
            'highway_to': _("the highway to ..."),
            'toll_road_to': _("the toll road to ..."),
            'small_road_to': _("the small road to ..."),
            'city_centre': _("city centre"),
            'tourist_office': _("the tourist office"),
            'map': _("a map"),
            'toilet': _("a toilet"),
            'supermarket': _("a supermarket"),
            'fruit_market': _("the fruit market"),
            'pharmacy': _("a pharmacy"),
            'camp_site': _("a camp-site"),
            'internet_cafe': _("an internet café"),
            'cash_machine': _("a cash machine"),
            'bank': _("a bank"),
            'bus_stop': _("a bus stop"),
            'metro_station': _("a metro station"),
            'bus_station': _("a bus station"),
            'train_station': _("a train station"),
            'wifi': _("a public Wi-Fi / Internet"),
            'thirsty': _("I'm thirsty"),
            'drink': _("Drink"),
            'water': _("Water"),
            'tea': _("(Herbal) tea"),
            'hot_chocolate': _("Hot chocolate"),
            'coffee': _("Coffee"),
            'juice': _("Juice"),
            'beer': _("Beer"),
            'wine': _("(Red, white) wine"),
            'cheers': _("Cheers!"),
            'im_hungry': _("I'm hungry"),
            'eat': _("Eat"),
            'bread': _("Bread"),
            'fruit': _("Fruit"),
            'meat': _("Meat"),
            'vegetarian': _("Vegetarian"),
            'vegan': _("Vegan"),
            'i_dont_eat_meat': _("I don't eat meat"),
            'cheap_restaurant': _("A cheap restaurant"),
            'enjoy_meal': _("Enjoy your meal!"),
            'dupsterdiving': _("Dumpster diving"),
            'im_tired': _("I'm tired"),
            'im_fine': _("I'm fine"),
            'im_cold': _("I'm cold"),
            'im_hot': _("I'm hot"),
            'im_sick': _("I'm sick"),
            'smoke': _("Smoke"),
            'what_time': _("What time is it?"),
            'place_to_sleep': _("I'm looking for a place to sleep."),
            'tent': _("Tent"),
            'hostel': _("Hostel"),
            'room': _("Room"),
            'hotel': _("Hotel"),
            'can_leave_my_bag': _("Can I leave my bag here for a while?"),
            'how_much_cost': _("How much does it cost?"),
            'who': _("Who?"),
            'what': _("What?"),
            'where': _("Where?"),
            'why': _("Why?"),
            'when': _("When?"),
            'how': _("How?"),
            'how_much': _("How much?"),
            'how_long': _("How long?"),
            'which': _("Which?"),
            'north': _("North"),
            'east': _("East"),
            'south': _("South"),
            'west': _("West"),
            'yesterday': _("Yesterday"),
            'today': _("Today"),
            'tomorrow': _("Tomorrow"),
            'where_can_we_buy_ticket': _("Where can we buy a ticket?"),
            "busking": _("Busking"),
            "free_hugs": _("Free hugs"),
            'n0': _("Zero"),
            'n1': _("One"),
            'n2': _("Two"),
            'n3': _("Three"),
            'n4': _("Four"),
            'n5': _("Five"),
            'n6': _("Six"),
            'n7': _("Seven"),
            'n8': _("Eight"),
            'n9': _("Nine"),
            'n10': _("Ten"),
            'n11': _("Eleven"),
            'n12': _("Twelve"),
            'n13': _("Thirteen"),
            'n14': _("Fourteen"),
            'n15': _("Fifteen"),
            'n16': _("Sixteen"),
            'n17': _("Seventeen"),
            'n18': _("Eighteen"),
            'n19': _("Nineteen"),
            'n20': _("Twenty"),
            'n21': _("Twenty-one"),
            'n30': _("Thirty"),
            'n100': _("Hundred"),
            'n1000': _("Thousand"),
            'n1000000': _("Million")
        },

        # Strings are divided into these categories
        "categories": {
            "category-other": _("Other"), # Not in use currently, but we might need in future
            "category-basics": _("Basics"),
            "category-directions_time": _("Directions & time"),
            "category-danger": _("Danger"),
            "category-food": _("Food"),
            "category-sleep": _("Sleep"),
            "category-introduction": _("Introduction"),
            "category-places": _("Places"),
            "category-questions": _("Questions"),
            "category-numbers": _("Numbers"),
        },

        # User Interface
        "UI": {
            "phrasebook": _("Phrasebook"),
            "translate_from": _("Translate from..."),
            "translate_to": _("Translate to..."),
            "search": _("Search..."),
            "about": _("About"),
            "back": _("Back"),
            "choose": _("Choose"),
            "contact_us": _("Contact us"),
            "help_translating": _("Help translating"),
            "audio_off": _("Audio off"),
            "audio_on": _("Audio on"),
            "voice_off": _("Voice commands off"),
            "voice_on": _("Voice commands on"),
            "visibility_off": _("Hide translations"),
            "visibility_on": _("Show translations"),
            "pictograms": _("Pictograms")
        }
    }


    # Clear variables for this loop
    del _
    del translation

    return strings



#
# Write produced json to the app's ./build/ folder
#
# Note: for some reason json was full of nullbytes (\u0000)
# at the end of strings. That's why replace()
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
def saveLangJSON(filename, json):
    print "Writing to "+filename+"..."
    fp = open(localeJsonDir+filename, 'w')
    fp.write(json)
    fp.close()
    return True


def saveDefaultUI(UIStrings):
    print "Saving default UI strings to "+defaultUIFile
    fp = open(defaultUIFile, 'w')
    fp.write( 'var defaultUI=' + json.dumps(UIStrings, ensure_ascii=False).replace('\u0000','') )
    fp.close()


#
# Save locale list
#
print "Writing full list of locales and their names to "+localesListFile
localeList = {}
for language in languages:

    localeList.update({language[0]: {
            'code': language[0],
            'name': language[2],
            'orig': language[3],
            'RTL': language[4],
            'alt': language[5]
           #'flag': language[0][-2:].lower(),
    }});

today = datetime.date.today()

fp = open(localesListFile, 'w')
fp.write( 'var localesOrig="'+localesOrig+'",localeExtraDivider="'+localeExtraDivider+'",localesVer="'+today.strftime('%Y-%m-%d')+'",locales='+json.dumps(localeList, ensure_ascii=False).replace('\u0000','') )
fp.close()


# Write a model of phrasebook to json
localesStructure = [
    [
        'category-basics',
        [
            'hitchhike',
            'hitchhiker',
            'hello',
            'bye',
            'excuse_me',
            'thank_you',
            'yes',
            'no',
            'maybe',
            'stop',
            'sorry',
            'are_you_going_towards',
            'bad',
            'no_problem',
            'ok',
            'perfect',
            'no_thanks',
            'thats_great',
            'have_nice_day',
            'for_free',
            'i_cant_pay',
            'do_you_speak',
            'any_other_languages',
            'speak_slower',
            'i_dont_understand',
            'i_dont_know',

            # Really other but as long as it's not more, keeping it under basics
            'money',
            'smoke',
            'busking',
            'free_hugs'
        ]
    ],
    [
        'category-questions',
        [
            'could_get_lift_to',
            'just_before',
            'just_after',
            'how_much_cost',
            'who',
            'what',
            'where',
            'why',
            'when',
            'how',
            'how_much',
            'how_long',
            'which',
            'can_leave_my_bag',
            'how_far',
            'where_are_we',
            'what_time',
        ]
    ],
    [
        'category-places',
        [
            'hitchhiking_spot',
            'petrol_station',
            'service_area',
            'rest_area',
            'along_the_highway',
            'roundabout',
            'junction',
            'tjunction',
            'crossroads',
            'ring_road',
            'across_the_road',
            'highway_to',
            'toll_road_to',
            'small_road_to',
            'city_centre',
            'tourist_office',
            'map',
            'toilet',
            'supermarket',
            'fruit_market',
            'pharmacy',
            'camp_site',
            'internet_cafe',
            'cash_machine',
            'bank',
            'bus_stop',
            'metro_station',
            'bus_station',
            'train_station',
            'wifi'


        ]
    ],
    [
        'category-introduction',
        [
            'im_not_in_hurry',
            'im_going_to',
            'where_going',
            'my_name_is',
            'whats_your_name',
            'im_from',
            'where_are_you_from',
            'am_years_old',
            'how_old',
            'i_study',
            'im_in_year',
            'im_studying',
            'im_holiday',
            'im_visiting',
            'im_hh_around',
            'im_will_stay',
            'im_going_back',
            'im_tired',
            'im_fine',
            'im_cold',
            'im_hot',
            'im_sick',
        ]
    ],
    [
        'category-sleep',
        [
            'place_to_sleep',
            'tent',
            'hostel',
            'room',
            'hotel',
        ]
    ],
    [
        'category-food',
        [
            'cheers',
            'thirsty',
            'drink',
            'water',
            'tea',
            'hot_chocolate',
            'coffee',
            'juice',
            'beer',
            'wine',
            'eat',
            'bread',
            'fruit',
            'meat',
            'vegetarian',
            'vegan',
            'i_dont_eat_meat',
            'cheap_restaurant',
            'enjoy_meal',
            'dupsterdiving',
            'im_hungry'
        ]
    ],
    [
        'category-danger',
        [
            'stop', # twice, also in basics
            'help', # twice, also in basics
            'i_have_friend',
            'im_married',
            'texted_my_father',
            'dont_touch_me',
            'let_me_out',
            'pull_over',
            'drop_me_off'
        ]
    ],
    [
        'category-directions_time',
        [
            'today',
            'tomorrow',
            'day',
            'week',
            'month',
            'year',
            'kilometre',
            'left',
            'right',
            'before',
            'after',
            'this',
            'next',
            'last',
            'often',
            'never',
            'sometimes',
            'rarely',
            'long',
            'short',
            'up',
            'down',
            'over',
            'under',
            'north',
            'east',
            'south',
            'west'
        ]
    ],
    [
        'category-numbers',
        [
            'n0',
            'n1',
            'n2',
            'n3',
            'n4',
            'n5',
            'n6',
            'n7',
            'n8',
            'n9',
            'n10',
            'n11',
            'n12',
            'n13',
            'n14',
            'n15',
            'n16',
            'n17',
            'n18',
            'n19',
            'n20',
            'n21',
            'n30',
            'n100',
            'n1000',
            'n1000000'
        ]
    ]
];

fp = open(localesStructureFile, 'w')
fp.write( 'var localesStructure='+json.dumps(localesStructure, ensure_ascii=False).replace('\u0000','') )
fp.close()


# If directory for json doesn't exist, create it
if not os.path.isdir(localeJsonDir):
    print localeJsonDir + " doesn't exist, creating it."
    os.makedirs(localeJsonDir)

#
# Process and save each locale to json files
#
for language in languages:

    # language is an array, for example:
    # language[0]:  "bg_BG"
    # language[1]:  "bg"
    # language[2]:  "Bulgarian"
    # language[3]:  "български език"
    # language[4]:  False
    # language[5]:  ['transliteration']


    print
    print language[2]+" ("+language[0]+"):";

    #
    # Download and save .po and .mo files from GlotPress
    #
    if not localesOrig == language[0]:

        fetchLanguage(language)

        # Check if this language has attached transliterations/phonetics
        try:
            language[5]

            for languageExtra in language[5]:

                fetchLanguage([language[0] + localeExtraDivider + languageExtra, language[1]])

        except IndexError:
            pass


    #
    # Produce language json with downloaded .mo files and save them to json files
    #
    if localesOrig == language[0] or os.path.isfile(localeSrcDir+language[0]+'/LC_MESSAGES/'+projectname+'.mo'):

        # Translate language
        languageTranslated = translateLanguage(language[0]);

        # Save This translation to the json
        saveLangJSON(language[0]+'.json', json.dumps(languageTranslated, ensure_ascii=False).replace('\u0000',''));

        # If it was default locale, save UI bit into a separate file to be used as UI fallback
        if language[0] == localesOrig:
            saveDefaultUI(languageTranslated['UI']);

        # Check if this language has attached transliterations/phonetics
        try:
            language[5]

            # Yay, we found transliterations/phonetics. Loop them trough.
            for languageExtra in language[5]:

                # Translate transliteration
                languageTranslatedExtra = translateLanguage(language[0] + localeExtraDivider + languageExtra);

                # Save transliteration to .json
                saveLangJSON(language[0] + localeExtraDivider + languageExtra+'.json', json.dumps(languageTranslatedExtra, ensure_ascii=False).replace('\u0000',''));

        except IndexError:
            pass

    else:

        error_count += 1
        print "Error: "+language[0]+" ("+language[2]+") - can't find translation file ("+localeSrcDir+language[0]+"/LC_MESSAGES/"+projectname+".mo). Perhaps Glotpress didn't have any translations for this language? Skipping..."

print

if error_count > 0:
    print "Done with translations, but with " + str(error_count) + " error(s). Scroll backlog to see more."
else:
    print "Done with translations, no errors."
