const  cheerio  = require("cheerio");
const fs = require("fs");
const request = require("request");
const xlsx= require("xlsx");
const path =require("path");

function getScoreCardDetails(url){
    request(url, function(err, response, html){
        if(err){
            console.error(err);
        }
        else{
            extractScoreDetails(html);
        } 
    });
}

function extractScoreDetails(html){
    let $=cheerio.load(html);
    let desc= $(".match-header-info.match-info-MATCH .description").text();
    let date= desc.split(",")[2].trim();
    let venue= desc.split(",")[1].trim();
    let result= $(".match-info.match-info-MATCH.match-info-MATCH-half-width .status-text").text();

    //shorten the search domain
    let innings=$("div.Collapsible");
    let htmlString="";
    for(let i=0;i<innings.length;i++){
        htmlString+=$(innings[i]).html();
        
    }
    
    //console.log(htmlString);
    //htmlString copied to table.html file

    for(let i=0;i<innings.length;i++){
        let teamName=$(innings[i]).find(".header-title.label").text().split("INNINGS")[0].trim();
        let opponentIndex= i==0?1:0;
        let opponentName=$(innings[opponentIndex]).find(".header-title.label").text().split("INNINGS")[0].trim();

        console.log(`${teamName}| ${opponentName} | ${date} | ${venue}| ${result}`);

        //batsman table
        let battingTable= $(innings[i]).find(".table.batsman");
        let allRows=$(battingTable).find("tbody tr");

        for(let j=0;j<allRows.length;j++){

            
            let allColumns= $(allRows[j]).find("td");
            if($(allColumns[0]).hasClass("batsman-cell")){
                let playerName= $(allColumns[0]).text();
                let runs =  $(allColumns[2]).text();
                let balls =  $(allColumns[3]).text();
                let fours =  $(allColumns[5]).text();
                let sixes =  $(allColumns[6]).text();
                let sr =  $(allColumns[7]).text();

                console.log(`${playerName}| ${runs} | ${balls}| ${fours} | ${sixes} | ${sr}`);

                processPlayer(teamName, opponentName, date, venue, result, playerName, runs, balls, fours, sixes, sr);

            }
            
            
            
        }

    }



}
function processPlayer(teamName, opponentName, date, venue, result, playerName, runs, balls, fours, sixes, sr){
    let teamPath = path.join(__dirname, "ipl", teamName);
    if(fs.existsSync(teamPath)==false){
        fs.mkdirSync(teamPath);
    }
    let filePath= path.join(teamPath, playerName + ".xlsx");
    let content= excelReader(filePath, playerName);
    let player={
        teamName, 
        opponentName,
        playerName,
        runs,
        balls, 
        fours,
        sixes,
        sr,
        date,
        venue,
        result
    }
    content.push(player);
    excelWriter(filePath, content, playerName);

}

function excelWriter(filePath, json, sheetName){
    let newWB=xlsx.utils.book_new();
    let newWS=xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
    xlsx.writeFile(newWB, filePath);
}
function excelReader(filePath, sheetName){
    if(fs.existsSync(filePath)==false){
        return [];
    }else{
        let wb= xlsx.readFile(filePath);
        let ws= wb.Sheets[sheetName];
        let ans= xlsx.utils.sheet_to_json(ws);
        return ans;
    }

}

module.exports={
    getScoreCardDetailsKey : getScoreCardDetails
}