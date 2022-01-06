const cheerio = require("cheerio");
const request = require("request");
const scoreCardObj= require("./scorecard");

function getAllMatchesLink(url){
    request(url, function(err, response, html){
        if(err){
            console.error(err);
        }
        else{
            extractAllMatchLink(html);
        } 
    });

}

function extractAllMatchLink(html){
    let $=cheerio.load(html);
    let allScorecards= $("a[data-hover='Scorecard']");
    for(let i=0;i<allScorecards.length;i++){
        let matchLink= $(allScorecards[i]).attr("href");
        let fullMatchLink = "https://www.espncricinfo.com" + matchLink;
        scoreCardObj.getScoreCardDetailsKey(fullMatchLink);
    }
}

module.exports= {
    getAllMatchesLinkKey : getAllMatchesLink
}