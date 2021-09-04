import * as renderingSettings from "./renderingSettings.js";
import * as connector from "./serverConnector.js";
import * as timeLapseSettings from "./timeLapseSettings.js";
import * as timeLapsePlayer from "./timeLapsePlayer.js";


var buttonRealTime = document.getElementById("btnRealTimeModality");
var buttonTimeLapse = document.getElementById("btnTimeLapseModality");


/**
 * setta l'azione del bottone di ritorno alla modalita real-time
 */

function setButtonRealTimeAction(){
    buttonRealTime.onclick = function(){
        renderingSettings.setButtonSettingVisible();
        setButtonRealTimeInvisible();
        setButtonTimeLapseVisible();
        timeLapsePlayer.stopVideo();
        timeLapsePlayer.setPlayerInvisible();
        timeLapseSettings.setDropDownTimeLapseAction();
        connector.startAskForTemperatures();
    }
}

function setButtonTimeLapseAction(){
    buttonTimeLapse.onclick = function (){
        renderingSettings.setButtonSettingInvisible();
        setButtonTimeLapseInvisible();
        setButtonRealTimeVisible()
        timeLapsePlayer.setPlayerVisible();
        timeLapseSettings.cancelDropDownTimeLapseAction();
        connector.stopAskForTemperatures();
    }
}

/**
 * rende il bottone di ritorno alla modalita real-time invisibile
 */

function setButtonRealTimeInvisible(){
    buttonRealTime.setAttribute("style", "display:none");
}

/**
 * rende il bottone di ritorno alla modalita real-time visibile
 */

export function setButtonRealTimeVisible(){
    buttonRealTime.setAttribute("style", "display:block");
}

/**
 * rende il bottone di ritorno alla modalita time-lapse invisibile
 */

export function setButtonTimeLapseInvisible(){
    buttonTimeLapse.setAttribute("style", "display:none");
}

/**
 * rende il bottone di ritorno alla modalita time-lapse visibile
 */

function setButtonTimeLapseVisible(){
    buttonTimeLapse.setAttribute("style", "display:block");
}

export function setButtonsAction(){
    setButtonRealTimeAction();
    setButtonTimeLapseAction();
}
