import * as canvas from "./canvas.js"
import * as potential from "./potential.js";
import * as rgbConverter from "./rgbConverter.js";

export var rangeTime = document.getElementById("rangeTime");
var rangeSaturation = document.getElementById("rangeSaturation");
var rangeRepConst = document.getElementById("rangeRepConst");
var saveButton = document.getElementById("saveButton");
var loading = document.getElementById("buttonImage");
var settedSaturationThreshold;
var settedRepulsionConstant;

/**
 * setta le impostazioni di default sui valori di saturazione e costante di repulsione
 */
export function setDefaultSettings(){
    rgbConverter.setSaturationThreshold(rangeSaturation.max/2);
    potential.setRepulsionConstant(rangeRepConst.max/2);
    settedSaturationThreshold = rangeSaturation.max/2;
    settedRepulsionConstant = rangeRepConst.max/2;
    rangeSaturation.value = settedSaturationThreshold;
    rangeRepConst.value = settedRepulsionConstant;
}

/**
 * ogni volta che viene utilizzato lo slider vengono aggiornati i rettangoli con le nuove temperature
 */

function setRangeTimeAction() {
    rangeTime.oninput = function(){
        canvas.setRoomsDataColors(rangeTime.value - 1);
        canvas.setText(rangeTime.value - 1);
    }
    rangeTime.onmousedown = function(){
        resetRangeSettingsValue();
    }
}

/**
 * ogni volta che viene utilizzato lo slider si vede un'anteprima dell'immagine con la
 * nuova saturazione
 */

function setRangeSaturationAction(){
    rangeSaturation.onclick = function(){
        rgbConverter.setSaturationThreshold(rangeSaturation.value);
        canvas.context.clearRect(0,0,canvas.myCanvas.width, canvas.myCanvas.height);
        canvas.setRect();
        canvas.setColorPreview(rangeTime.value - 1);
        canvas.setText(rangeTime.value - 1);
    }
}

/**
 * ogni volta che viene utilizzato lo slider si vede un'anteprima dell'immagine con la
 * nuova costante di repulsione
 */

function setRangeRepConstAction(){
    rangeRepConst.onclick = function(){
        potential.setRepulsionConstant(rangeRepConst.value);
        canvas.context.clearRect(0,0,canvas.myCanvas.width, canvas.myCanvas.height);
        canvas.setRect();
        canvas.setColorPreview(rangeTime.value - 1);
        canvas.setText(rangeTime.value - 1);
    }
}

/**
 * quando il bottone viene cliccato vengono salvate le nuove impostazioni sulla
 * saturazione e costante di repulsione e viene riavviata l'immagine
 */

function setSaveButtonAction(){
    saveButton.onmousedown = function (){
        loading.setAttribute("style", "display:block");
    }
    saveButton.onclick = function(){
        settedSaturationThreshold = rangeSaturation.value;
        settedRepulsionConstant = rangeRepConst.value;
        canvas.context.clearRect(0,0,canvas.myCanvas.width, canvas.myCanvas.height);
        canvas.setRect();
        canvas.calcRoomsDataColors();
        canvas.setRoomsDataColors(rangeTime.value - 1);
        canvas.setText(rangeTime.value - 1);
        loading.setAttribute("style", "display:none");

    }
}

/**
 * resetta le impostazioni di saturazione e costante di repulsione con gli ultimi dati salvati
 */

function resetRangeSettingsValue (){
    rangeSaturation.value = settedSaturationThreshold;
    rangeRepConst.value = settedRepulsionConstant;
    rgbConverter.setSaturationThreshold(settedSaturationThreshold);
    potential.setRepulsionConstant(settedRepulsionConstant);
}

/**
 * setta le azioni di tutti gli elementi
 */

export function setInputTypesActions(){
    setRangeTimeAction();
    setRangeSaturationAction();
    setRangeRepConstAction();
    setSaveButtonAction();
}
