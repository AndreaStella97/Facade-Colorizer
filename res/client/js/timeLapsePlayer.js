import * as canvas from "./canvas.js"

var sampleSize = 10;
export var rangeTimeLapse = document.getElementById("rangeTimeLapse");
var player = document.getElementById("player");
var buttonPlay = document.getElementById("btnPlay");
var buttonStop = document.getElementById("btnStop");
var buttonFast = document.getElementById("btnFast");
var labelDate = document.getElementById("labelDate");
var startDate;
var samples;
var interval;


/**
 * ogni volta che viene utilizzato lo slider vengono aggiornati i rettangoli con le nuove temperature
 */

function setRangeTimeLapseAction() {
    rangeTimeLapse.oninput = function(){
        updateLabelDate();
        stopVideo();
        updateImage();
    }
}

function setButtonPlayAction() {
    buttonPlay.onclick = function (){
        stopVideo();
        interval = setInterval(increaseRangeTimeLapse, 250);
    }
}

function setButtonStopAction(){
    buttonStop.onclick = function(){
        stopVideo();
    }
}

function setButtonFastAction(){
    buttonFast.onclick = function (){
        stopVideo();
        interval = setInterval(increaseRangeTimeLapse, 100);
    }
}

export function setRangeTimeLapse(max){
    rangeTimeLapse.value=1;
    rangeTimeLapse.max = max;
}


export function updateLabelDate(){
    moveLabelDate();
    setLabelDate();
}

function  moveLabelDate(){
    var marginLeft = 70*(rangeTimeLapse.value-1)/(rangeTimeLapse.max-1);
    var marginLeftString = "margin-left:"+marginLeft.toString()+"%";
    labelDate.setAttribute("style", marginLeftString);
    setLabelDate();
}

export function setDatesInfo(stDate, samp){
    startDate = stDate;
    samples = samp;
}

function setLabelDate(){
    var startDateMillis = new Date(startDate.value).getTime();
    var nextDateMillis = startDateMillis + (rangeTimeLapse.value-1)*samples.value*sampleSize*60000;
    var nextDateString = new Date(nextDateMillis).toLocaleString();
    labelDate.innerText = nextDateString.substring(0,nextDateString.length-3);
}

function increaseRangeTimeLapse(){
    rangeTimeLapse.value ++;
    updateLabelDate();
    updateImage();
    if(rangeTimeLapse.value == rangeTimeLapse.max){
        stopVideo();
    }
}


export function stopVideo(){
    clearInterval(interval);
}

/**
 * setta le azioni di tutti gli elementi
 */

export function setInputTypesActions(){
    setRangeTimeLapseAction();
    setButtonPlayAction();
    setButtonStopAction();
    setButtonFastAction();
}

export function setPlayerFromTheBeginning(){
    rangeTimeLapse.value = 1;
    updateLabelDate();
    updateImage();
}

export function setPlayerInvisible(){
    player.setAttribute("style", "display:none");
}

export function setPlayerVisible(){
    setPlayerFromTheBeginning();
    player.setAttribute("style", "display:block");

}

function updateImage(){
    canvas.setTimeLapseImages(rangeTimeLapse.value - 1);
}