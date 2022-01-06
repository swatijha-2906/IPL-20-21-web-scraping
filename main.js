const request = require("request");
const cheerio = require("cheerio");
const fs= require("fs");
const path = require("path");
const matchObj = require("./matches");
const iplPath = path.join(__dirname, "ipl");

if(fs.existsSync(iplPath)==false){
    fs.mkdirSync(iplPath);
}

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url, cb);
function cb(err, response, html){
    if(err){
        console.error(err);
    }
    else{
        extractResultLink(html);
    }
}

function extractResultLink(html){
    let $=cheerio.load(html);
    let resultLink = $("a[data-hover='View All Results']").attr("href");
    let fullResultLink= "https://www.espncricinfo.com" + resultLink;
    //console.log(fullResultLink);
    matchObj.getAllMatchesLinkKey(fullResultLink);

}
