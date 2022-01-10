# IPL-20-21-web-scraping
## using nodejs

### About
This is a web scraping project which scraps the [cricinfo website](https://www.espncricinfo.com/series/ipl-2020-21-1210595) to get information regarding Indian Premier League 2020/21.
The following  activities are carried out when we run this project-
1. The ipl directory is created inside the current directory.
2. Separate directories are created for each team inside the ipl directory
3. Inside each team's directory, separate excel sheet is created for each player. 
4. Each row in the excel sheet represents different match played by the player and details like team name, opponent team name, player name, runs, balls, fours, sixes, sr, date of match, venue of match and the result of the match is shown.


### How to run this project
1. Clone this repository in your local environment.
2. Run command `npm install` to install all the required packages.
3. Run command `node main.js` to get the required information.




### Insights-

1. Cheerio module used here for web scraping.
2. Disadvantage of cheerio module: it only parses and extracts initial loaded html.
3. HTML seggregation is done using another file (table.html) to make information extraction easier.
4. Multiple page scraping is done here.
