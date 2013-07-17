# Produces languages.js and puts it under ./www/assets/js/

# Define languages here
# Make sure you have .mo file in place under ./locale/
languages = [
    [
        "en_UK", 
        "English (UK)", 
        "English (UK)"
    ],
    [
        "en_US", 
        "English (US)", 
        "English (US)"
    ],
    [
        "fi_FI", 
        "Finnish", 
        "Suomi"
    ],
    [
        "se_SE", 
        "Swedish", 
        "Svenska"
    ],
    [
        "de_DE", 
        "German", 
        "Deutch"
    ]
]

# Divider to be used between translations for same line
divider = ' | '

languageJsonFile = './www/assets/js/languages.js'

import gettext
import json
import time

package = {}

for language in languages:

    # Prepare gettext for this language
    translation = gettext.translation('phrasebook', "./locale", languages=[language[0]], fallback=True)

    translation.install()

    _ = translation.gettext

    print "Translating: "+language[0]+" ("+language[1]+")"

    # Produce chunk of json
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
        'strings': [
            _("Hello"),
            _("Excuse me..."),
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
            _("Hour")+divider+_("Day")+divider+_("Week")+divider+_("Month"),
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
            _("Cheers!"),
            _("Have a nice day/trip!"),
            _("Where can I find ...?"),
            [
                _("a good hitchhiking spot"),
                _("the highway to ..."),
                _("the toll road to ..."),
                _("the small road to ..."),
                _("city centre"),
                _("tourist office"),
                _("a map"),
                _("a toilet"),
                _("a supermarket"),
                _("the fruit market"),
                _("a pharmacy"),
                _("a camp-site"),
                _("an internet cafe"),
                _("a cash-machine"),
                _("a bank"),
                _("a metro-station"),
                _("a bus-station"),
                _("a train-station"),
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
            _("How much does it cost?"),
            _("What time is it?"),
            _("I'm looking for a place to sleep."),
            _("Tent"),
            _("Room"),
            _("Hotel"),
            _("Where can we buy a ticket?"),
            _("Who?")+divider+_("What?")+divider+_("Where?")+divider+_("Why?")+divider+_("When?"),
            _("How?")+divider+_("How much?")+divider+_("How long?")+divider+_("Which?"),
            _("North")+divider+_("East")+divider+_("South")+divider+_("West"),
            _("Yesterday")+divider+_("Today")+divider+_("Tomorrow"),
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
    }
    
    del _
    del translation
    
    package[language[0]] = language_chunk

languagesJson = "var languagesVer="+str(int(time.time()))+",languages="+json.dumps(package);

print "Writing to "+languageJsonFile+"..."

fp = open(languageJsonFile, 'w')
fp.write(languagesJson)
fp.close()

print "Done."