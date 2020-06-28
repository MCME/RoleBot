echo Starting the Discord Application: jobberbot
screen -dmS jobberdiscord
# this doesn't seem to work:
#   screen -S jobberdiscord -X nodemon --inspect index.js
# instead connect to the screen and do:
#   nodemon --inspect index.js