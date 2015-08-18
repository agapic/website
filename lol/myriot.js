var sumName = "";
var APIKEY = "";
function champIdToName(number){
var obj = {
"35":"Shaco",
"36":"DrMundo",
"33":"Rammus",
"34":"Anivia",
"39":"Irelia",
"157":"Yasuo",
"37":"Sona",
"38":"Kassadin",
"154":"Zac",
"150":"Gnar",
"43":"Karma",
"42":"Corki",
"41":"Gangplank",
"40":"Janna",
"201":"Braum",
"22":"Ashe",
"23":"Tryndamere",
"24":"Jax",
"25":"Morgana",
"26":"Zilean",
"27":"Singed",
"28":"Evelynn",
"29":"Twitch",
"3":"Galio",
"161":"Velkoz",
"2":"Olaf",
"1":"Annie",
"7":"Leblanc",
"30":"Karthus",
"6":"Urgot",
"32":"Amumu",
"5":"XinZhao",
"31":"Chogath",
"4":"TwistedFate",
"9":"FiddleSticks",
"8":"Vladimir",
"19":"Warwick",
"17":"Teemo",
"18":"Tristana",
"15":"Sivir",

    "16":"Soraka",
"13":"Ryze",
"14":"Sion",
"11":"MasterYi",
"12":"Alistar",
"21":"MissFortune",
"20":"Nunu",
"107":"Rengar",
"106":"Volibear",
"105":"Fizz",
"104":"Graves",
"103":"Ahri",
"99":"Lux",
"102":"Shyvana",
"101":"Xerath",
"412":"Thresh",
"98":"Shen",
"222":"Jinx",
"96":"KogMaw",
"223":"TahmKench",
"92":"Riven",
"91":"Talon",
"90":"Malzahar",
"429":"Kalista",
"10":"Kayle",
"421":"RekSai",
"89":"Leona",
"79":"Gragas",
"117":"Lulu",
"114":"Fiora",
"78":"Poppy",
"115":"Ziggs",
"77":"Udyr",
"112":"Viktor",
"113":"Sejuani",
"110":"Varus",
"111":"Nautilus",
"119":"Draven",
"432":"Bard",
"245":"Ekko",
"82":"Mordekaiser",
"83":"Yorick",
"80":"Pantheon",
"81":"Ezreal",
"86":"Garen",
"84":"Akali",
"85":"Kennen",
"67":"Vayne",
"126":"Jayce",
"69":"Cassiopeia",
"127":"Lissandra",
"68":"Rumble",
"121":"Khazix",
"122":"Darius",
"120":"Hecarim",
"72":"Skarner",
"236":"Lucian",
"74":"Heimerdinger",
"75":"Nasus",
"238":"Zed",
"76":"Nidalee",
"134":"Syndra",
"133":"Quinn",
"59":"JarvanIV",
"58":"Renekton",
"57":"Maokai",
"56":"Nocturne",
"55":"Katarina",
"64":"LeeSin",
"62":"MonkeyKing",
"63":"Brand",
"268":"Azir",
"267":"Nami",
"60":"Elise",
"131":"Diana",
"61":"Orianna",
"266":"Aatrox",
"143":"Zyra",
"48":"Trundle",
"45":"Veigar",
"44":"Taric",
"51":"Caitlyn",
"53":"Blitzcrank",
"54":"Malphite",
"254":"Vi",
"50":"Swain"
}

s=number;

    return obj[s];
                          
}


function summonerLookUp() {   

    sumName = $("#summonerName").val();
    APIKEY = "b1afd608-2b9f-4e1d-8519-05134b1fab6f";
    if (sumName !== "") {
        $.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + sumName + '?api_key=' + APIKEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {
                var sumNamenospace = sumName.replace(" ", "");

                sumNamenospace = sumNamenospace.toLowerCase().trim();

                summonerLevel = json[sumNamenospace].summonerLevel;
                summonerID = json[sumNamenospace].id;

                document.getElementById("sLevel").innerHTML = summonerLevel;
                document.getElementById("sID").innerHTML = summonerID;

                // NEW FUNCTION!
                letsGetMasteries(summonerID);

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("error getting Summoner data 1!");
            }
        });
    } else {}
}

function letsGetMasteries(summonerID) {
    var season = "SEASON2015";

    $.ajax({
        url: 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/' + summonerID + '/ranked?season=' + season + '&api_key=' + APIKEY,
        type: 'GET',
        
        dataType: 'json',
        data: {

        },        success: function (resp) {

        var max = 0;
        var champId = 0;
            var bestChampGames;

            for(i=0; i<resp.champions.length; i++){
                if(parseInt(resp.champions[i].stats.totalPhysicalDamageDealt + resp.champions[i].stats.totalMagicDamageDealt) > max && resp.champions[i].id != 0){
                      max = parseInt(resp.champions[i].stats.totalPhysicalDamageDealt + resp.champions[i].stats.totalMagicDamageDealt);
                    champId = parseInt(resp.champions[i].id);
                    bestChampGames = parseInt(resp.champions[i].stats.totalSessionsPlayed);
                    
                }
                
            }
                
                
                totalChamps = resp.champions.length;
                bestChamp = champIdToName(champId);
                totalDamage = max;
                
                document.getElementById("sNumberChamps").innerHTML = totalChamps;
                document.getElementById("sBestChamp").innerHTML = bestChamp;
                document.getElementById("sTotalDamage").innerHTML = totalDamage;
                document.getElementById("sGamesWithChamp").innerHTML = bestChampGames;
                document.getElementById("sDmgPerGame").innerHTML = parseInt(totalDamage/bestChampGames);
            
        },

    });
}