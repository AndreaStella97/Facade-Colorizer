import * as parser from "./jsonParser.js";
import * as canvas from "./canvas.js";
import * as renderingSettings from "./renderingSettings.js";
import * as timeLapseSettings from "./timeLapseSettings.js";
import * as timeLapsePlayer from "./timeLapsePlayer.js";
import * as buttonModality from "./buttonModality.js";
import * as loading from "./loading.js";

var url = "192.168.1.70";
var port = 8080;
askForAnnotations();
var tempAskingInterval;

/**
 * richiede al server il file JSON con le dimensioni dei vari elementi e il path dell'immagine
 */

function askForAnnotations(){
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            console.log("ok");
            var jObjAnn = JSON.parse(http.responseText);
            parser.parsingAnnotation(jObjAnn);
            renderingSettings.setDefaultSettings();
            renderingSettings.setInputTypesActions();
            timeLapseSettings.setInputTypesActions();
            timeLapsePlayer.setInputTypesActions();
            buttonModality.setButtonsAction();
            canvas.setFlatImage();
            canvas.setCanvas();
            askForTemperatures();
            startAskForTemperatures();
        }
    };
    http.open("GET", "http://"+url+":"+port+"/annotations", true);
    http.send();
}

/**
 * richiede al server il file JSON con le temperature delle stanze misurate in real-time
 */

function askForTemperatures(){
    var http = new XMLHttpRequest();
    http.onreadystatechange = function (){
        if(http.readyState == 4 && http.status == 200){
            var jObjTemperatures = JSON.parse(http.responseText);
            parser.parsingTemperatures(jObjTemperatures);
            canvas.setRealTimeImage();
        }
    };
    http.open("GET", "http://"+url+":"+port+"/values/last", true);
    http.send();
}

/**
 * ferma le richieste di temperature al server
 */

export function stopAskForTemperatures(){
    clearInterval(tempAskingInterval);
}

/**
 * fa partire le richieste di temperature al server
 */

export function startAskForTemperatures(){
    tempAskingInterval = setInterval(askForTemperatures,3000);
}

/**
 * richiede al server il file JSON con le temperature delle stanze misurate in time-lapse
 */

export function askForTimeLapseTemperatures(params){
    var http = new XMLHttpRequest();
    http.open("GET", "http://"+url+":"+port+"/values/frames?"+params, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var jObjTemperatures = JSON.parse(http.responseText);
            parser.parsingTimeLapseTemperatures(jObjTemperatures);
            canvas.calcTimeLapseTemperaturesColors();
            buttonModality.setButtonRealTimeVisible();
            buttonModality.setButtonTimeLapseInvisible();
            renderingSettings.setButtonSettingInvisible();
            canvas.setTimeLapseImages(0);
            timeLapsePlayer.setRangeTimeLapse(parser.rooms[0].timeLapseTemperatures.length);
            timeLapsePlayer.updateLabelDate();
            timeLapsePlayer.setPlayerVisible();
            loading.stopLoadingTimeLapse();
        }
    }
    http.send();

}







