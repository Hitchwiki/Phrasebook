#!/usr/bin/python
# -*- coding: UTF-8 -*-

# Produces languages.js and puts it under ./www/assets/js/
import gettext
import json
import time
import os
import urllib2


#
# Configuration
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #


# Path to GlotPress
glotpress = 'http://hitchwiki.org/translate/';

# Project name at GlotPress
projectname = 'phrasebook';

# Define languages here
# Make sure you have .mo file in place under ./locale/
languages = [
    # Code     English name             Original name       # transliteration/phonetic
    [ "en_UK", "English (UK)",          "English (UK)"      ],
    [ "en_US", "English (US)",          "English (US)"      ],
    [ "sq_AL", "Albanian",              "Gjuha shqipe"      ],
    [ "hr_HR", "Croatian",              "Hrvatski"          ],
    [ "de_DE", "German",                "Deutch"            ],
    [ "es_ES", "Spanish",               "Español"           ],
    [ "fr_FR", "French",                "Français"          ],
    [ "fi_FI", "Finnish",               "Suomi"             ],
    [ "hu_HU", "Hungarian",             "Magyar"            ],
    [ "it_IT", "Italian",               "Italiano"          ],
    [ "lv_LV", "Latvian",               "Latviešu"          ],
    [ "lt_LT", "Lithuanian",            "Lietuvių"          ],
    [ "nl_NL", "Dutch",                 "Nederlands"        ],
    [ "nb_NO", "Norwegian (Bokmål)",    "Norsk (Bokmål)"    ],
    [ "ru_RU", "Russian",               "Русский",          ['transliteration'] ],
    [ "pl_PL", "Polish",                "Polski"            ],
    [ "pt_PT", "Portuguese",            "Português"         ],
    [ "ro_RO", "Romanian",              "Română"            ],
    [ "sk_SK", "Slovakian",             "Slovenčina"        ],
    [ "sv_SE", "Swedish",               "Svenska"           ],
    [ "tr_TR", "Turkish",               "Türkçe"            ]
]

# Language of original strings
origLang = 'en_UK'

# Divider to be used between translations for same line
divider = ' | '

languageJsonFile = './www/assets/js/languages.js'


#
# Function to download and save language files from GlotPress
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
def fetchLanguage(language):

    print "Processing: "+language[0]+" ("+language[1]+")"
    
    # Path where to save files
    directory = './locale/%s/LC_MESSAGES/' % language[0]
    
    # If language directory doesn't exist, create it
    if not os.path.isdir(directory):
        print directory + " doesn't exist, creating it."
        os.makedirs(directory)
    
    # Format url from where to fetch files 
    fetchURL = glotpress + 'projects/' + projectname + '/' + language[0][:2].lower() + '/' + language[0] + '/export-translations?format='

    # Download and save files in two formats
    for fileformat in ['po', 'mo']:

        # Fetch language file
        response = urllib2.urlopen( fetchURL + fileformat)
        poContents = response.read()
        
        # Save language file
        fp = open(directory + projectname + '.' + fileformat, 'w')
        fp.write(poContents)
        fp.close()

    return True



#
# Returns chunk of translated texts in one langauge as an array
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
def translateLanguage(language, onlyStrings):
    
    # Prepare gettext for this language
    translation = gettext.translation(projectname, "./locale", languages=[language[0]], fallback=True)
    
    translation.install()
    
    _ = translation.gettext
    
    print "Translating: "+language[0]+" ("+language[1]+")"
    
    strings = [
                _("Hello"),
                _("Excuse me...")+divider+_("Sorry"),
                _("Are you going towards ...?"),
                _("Could I get a lift to ...?"),
                [
                    _("just before"),
                    _("just after"),
                    _("a petrol station"),
                    _("a service area"),
                    _("a lay-by")+divider+_("rest area"),
                    _("along the highway"),
                    _("roundabout"),
                    _("the junction"),
                    _("the T-junction"),
                    _("the crossroads"),
                    _("on the ring road"),
                    _("across the road")
                ],
                _("Hour")+divider+_("Day")+divider+_("Week")+divider+_("Month")+divider+_("Year"),
                _("Kilometre"),
                _("Left")+divider+_("Right"),
                _("Straight on"),
                _("Before")+divider+_("After"),
                _("This")+divider+_("Next")+divider+_("Last"),
                _("Often")+divider+_("Never")+divider+_("Sometimes")+divider+_("Rarely"),
                _("Long")+divider+_("Short"),
                _("Up")+divider+_("Down"),
                _("Over")+divider+_("Under"),
                _("How far is it (on foot)?"),
                _("Where are we?"),
                _("For free?")+divider+_("I can't pay."),
                _("Do you speak ...?")+divider+_("any other languages"),
                _("Speak slower, please?"),
                _("I don't understand"),
                _("I don't know"),
                _("Yes")+divider+_("No")+divider+_("Maybe")+divider+_("No thanks"),
                _("That's great")+divider+_("perfect")+divider+_("bad")+divider+_("no problem")+divider+_("OK")+divider+_("cool"),
                _("I'm not in a hurry"),
                _("I'm going to ...")+divider+_("Where are you going to?"),
                _("My name is ...")+divider+_("What's your name?"),
                _("I'm from ...")+divider+_("Where are you from?"),
                _("I'm ... years old.")+divider+_("How old are you?"),
                _("I study ...")+divider+_("I'm in my ... year.")+divider+_("I am studying to be a ..."),
                _("I'm on holiday."),
                _("I'm visiting friends in ..."),
                _("I'm hitchhiking around ..."),
                _("I will stay for ... days/weeks"),
                _("I'm going back to ..."),
                _("Can you drop me off here?"),
                _("I have a boy-friend/a girl-friend."),
                _("I'm married."),
                _("I have already texted my father."),
                _("Don't touch me!"),
                _("Let me out!"),
                _("Pull over I'm going to puke!"),
                _("Stop!"),
                _("Help!"),
                _("Thank you!"),
                _("Have a nice day/trip!"),
                _("Where can I find ...?"),
                [
                    _("a good hitchhiking spot"),
                    _("the highway to ..."),
                    _("the toll road to ..."),
                    _("the small road to ..."),
                    _("city centre"),
                    _("the tourist office"),
                    _("a map"),
                    _("a toilet"),
                    _("a supermarket"),
                    _("the fruit market"),
                    _("a pharmacy"),
                    _("a camp-site"),
                    _("an internet café"),
                    _("a cash machine")+divider+_("ATM"),
                    _("a bank"),
                    _("a bus stop"),
                    _("a metro station"),
                    _("a bus station"),
                    _("a train station"),
                    _("a public Wi-Fi / Internet")
                ],
                _("I'm thirsty"),
                _("Drink"),
                [
                    _("Water"),
                    _("(Herbal) tea"),
                    _("Hot chocolate"),
                    _("Coffee"),
                    _("Juice"),
                    _("Beer"),
                    _("(Red, white) wine")
                ],
                _("Cheers!"),
                _("I'm hungry"),
                _("Eat"),
                [
                    _("Bread"),
                    _("Fruit"),
                    _("Meat")
                ],
                _("Vegetarian"),
                _("Vegan"),
                _("I don't eat meat"),
                _("A cheap restaurant"),
                _("Enjoy your meal!"),
                _("Dumpster diving"),
                _("I'm tired"),
                _("I'm fine"),
                _("I'm cold"),
                _("I'm hot"),
                _("I'm sick"),
                _("Smoke"),
                _("What time is it?"),
                _("I'm looking for a place to sleep."),
                [
                    _("Tent"),
                    _("Hostel"),
                    _("Room"),
                    _("Hotel")
                ],
                _("Can I leave my bag here for a while?"),
                _("How much does it cost?"),
                _("Who?")+divider+_("What?")+divider+_("Where?")+divider+_("Why?")+divider+_("When?"),
                _("How?")+divider+_("How much?")+divider+_("How long?")+divider+_("Which?"),
                _("North")+divider+_("East")+divider+_("South")+divider+_("West"),
                _("Yesterday")+divider+_("Today")+divider+_("Tomorrow"),
                _("Where can we buy a ticket?"),
                _("Zero"),
                [
                    _("One"),
                    _("Two"),
                    _("Three"),
                    _("Four"),
                    _("Five"),
                    _("Six"),
                    _("Seven"),
                    _("Eight"),
                    _("Nine"),
                    _("Ten"),
                    _("Eleven"),
                    _("Twelve"),
                    _("Thirteen"),
                    _("Fourteen"),
                    _("Fifteen"),
                    _("Sixteen"),
                    _("Seventeen"),
                    _("Eighteen"),
                    _("Nineteen"),
                    _("Twenty"),
                    _("Twenty-one"),
                    _("Thirty"),
                    _("Hundred"),
                    _("Thousand")
                ],
                _("Free hugs")
    ]

    # Produce chunk of json
    if onlyStrings:

        language_chunk = strings
    
    else:
    
        language_chunk = {
            'flag': language[0][-2:].lower(),
            'name': language[1],
            'origName': language[2],
            'ui': {
                'phrasebook': _("Phrasebook"),
                'interface': _("Interface"),
                'search': _("Search..."),
                'info': _("Info")
            },
            'strings': strings
        }
    
    # Clear variables for this loop
    del _
    del translation
    del strings

    return language_chunk




#
# Download and save .po and .mo files
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

print "Downloading and saving language files from GlotPress..."

for language in languages:

    if not origLang == language[0]:

        fetchLanguage(language)

        # Check if this language has attached transliterations/phonetics
        try:
            language[3]

            for languageExtra in language[3]:

                fetchLanguage([language[0] + '@' + languageExtra, language[1], language[2]])

        except IndexError:
            pass



#
# Procude language json with downloaded .mo files
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

print "Creating languages.js from downloaded language files..."

languagesJson = {}

for language in languages:

    # Does translation file exist?
    if origLang == language[0] or os.path.isfile('./locale/'+language[0]+'/LC_MESSAGES/'+projectname+'.mo'):

        # Add This language to the json
        languagesJson.update({ language[0]: translateLanguage(language, False) });
        
        #languagesJson.insert(language[0], translateLanguage(language))

        # Check if this language has attached transliterations/phonetics
        try:
            language[3]

            # Yay, we found transliterations/phonetics. Loop them trough.
            for languageExtra in language[3]:

                languagesJson[language[0]].update({languageExtra: translateLanguage([language[0] + '@' + languageExtra, language[1], language[2]], True) })

        except IndexError:
            pass

    else:
    
        print "Error: "+language[0]+" ("+language[1]+") - can't file translation file (./locale/"+language[0]+"/LC_MESSAGES/"+projectname+".mo). Skipping..."



#
# Write produced json to the app's ./www/ folder
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

print "Writing to "+languageJsonFile+"..."

fp = open(languageJsonFile, 'w')
fp.write("var languagesVer="+str(int(time.time()))+",languages="+json.dumps(languagesJson))
fp.close()

print "Done! Happy Hitchhiking!"