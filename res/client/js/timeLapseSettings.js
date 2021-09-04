import * as connector from "./serverConnector.js";
import * as loading from "./loading.js";
import * as timeLapsePlayer from "./timeLapsePlayer.js"

var sampleSize = 10;
var buttonTimeLapse = document.getElementById("btnTimeLapse");
var dropDownTimeLapse = document.getElementById("dropDownTimeLapse");
var startDateTime = document.getElementById("startDateTime");
var endDateTime = document.getElementById("endDateTime");
var samples = document.getElementById("samples");
var samplesItem = document.getElementById("samplesItem");
var buttonSend = document.getElementById("btnSend");
var samplesLabel = document.getElementById("samplesLabel");



/**
 * setta l'azione del bottone time-lapse
 */

function setButtonTimeLapseAction(){
    buttonTimeLapse.onmouseover = function (){
        connector.stopAskForTemperatures();
    }
}

/**
 * setta l'azione della tendina time-lapse
 */

export function setDropDownTimeLapseAction(){
    dropDownTimeLapse.onmouseleave = function (){
        connector.startAskForTemperatures();
    }
}

/**
 * cancella l'azione della tendina time-lapse
 */

export function cancelDropDownTimeLapseAction(){
    dropDownTimeLapse.onmouseleave = null;
}

/**
 * setta l'azione del bottone di invio
 */

function setButtonSendAction(){
    buttonSend.onclick = function (){
        if(startDateTime.checkValidity() && endDateTime.checkValidity() && samples.checkValidity()){
            var params = startDateTime.name+"="+startDateTime.value+"&"+endDateTime.name+"="+endDateTime.value+"&"+samples.name+"="+samples.value;
            connector.askForTimeLapseTemperatures(params);
            cancelDropDownTimeLapseAction();
            loading.startLoadingTimeLapse();
            timeLapsePlayer.setDatesInfo(startDateTime,samples);
        }
    }
}

/**
 * setta le azioni degli input date time local
 */

function setDateTimeAction(){
    startDateTime.oninput = function (){
        setDateTimeMax();
        var startDate = new Date(startDateTime.value);
        startDate.setMilliseconds(startDate.getMilliseconds()+60000*sampleSize);
        endDateTime.min = getDateTimeLocalFormat(startDate);
        setSamples();
    };
    startDateTime.onmouseover = function (){setDateTimeMax()};
    endDateTime.oninput = function (){setSamples()};
    endDateTime.onmouseover = function (){setDateTimeMax()};
}


/**
 * setta le azioni di tutti gli elementi di input
 */

export function setInputTypesActions(){
    setButtonTimeLapseAction();
    setDropDownTimeLapseAction();
    setDateTimeAction();
    setButtonSendAction();
}

/**
 * setta la data e ora massima da poter inserire
 */

function setDateTimeMax(){
    var maxDate = new Date(Date.now());
    endDateTime.max = getDateTimeLocalFormat(maxDate);
    maxDate.setMilliseconds(maxDate.getMilliseconds()-60000*sampleSize)
    startDateTime.max = getDateTimeLocalFormat(maxDate);
}

/**
 * setta il massimo valore di grandezza dei campioni
 */

function setSamples(){
    if(startDateTime.value != 0 && endDateTime.value!=0){
        var startTime = new Date(startDateTime.value).getTime();
        var endTime = new Date(endDateTime.value).getTime();
        var max = Math.floor(((endTime-startTime)/(60000*sampleSize)));
        if(max>0){
            samplesLabel.innerText = "(Compreso tra "+samples.min+" e "+max+")";
            samples.max = max;
            samplesItem.style.display = "block";
        } else {
            samplesItem.style.display = "none";
        }
    }
}


/**
 * calcola la data col formato adatto al datetimelocal
 * @param dateToFormat la data da formattare
 * @returns {string} la data formattata
 */

function getDateTimeLocalFormat(dateToFormat){
    var dateTimeLocalFormat = dateToFormat.getFullYear()+"-";
    (dateToFormat.getMonth()+1)<10 ? dateTimeLocalFormat += "0" : null;
    dateTimeLocalFormat += dateToFormat.getMonth()+1 +"-";
    dateToFormat.getDate()<10 ? dateTimeLocalFormat += "0" : null;
    dateTimeLocalFormat += dateToFormat.getDate() +"T";
    dateToFormat.getHours()<10 ? dateTimeLocalFormat += "0" : null;
    dateTimeLocalFormat += dateToFormat.getHours() +":";
    dateToFormat.getMinutes()<10 ? dateTimeLocalFormat += "0" : null;
    dateTimeLocalFormat += dateToFormat.getMinutes();
    return dateTimeLocalFormat;
}