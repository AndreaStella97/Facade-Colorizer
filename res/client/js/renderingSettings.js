import * as canvas from "./canvas.js"
import * as potential from "./potential.js";
import * as rgbConverter from "./rgbConverter.js";
import * as connector from "./serverConnector.js";
import * as loading from "./loading.js";


var rangeSaturation = document.getElementById("rangeSaturation");
var rangeColdEffect = document.getElementById("rangeColdEffect");
var rangeInterRoomEffect = document.getElementById("rangeInterRoomEffect");
var rangeTransparency = document.getElementById("rangeTransparency");
var rangeResolution = document.getElementById("rangeResolution");
var buttonSettings = document.getElementById("btnSettings");
var dropDownSettings = document.getElementById("dropDownSettings");
var checkTempText = document.getElementById("checkTempText");

/**
 * setta le impostazioni di default sui valori di saturazione e costante di repulsione
 */

export function setDefaultSettings(){
    rgbConverter.setSaturationThreshold(rangeSaturation.value);
    potential.setColdSurfaceEffect(rangeColdEffect.value);
    potential.setInterRoomEffect(rangeInterRoomEffect.value);
    canvas.setTransparency(rangeTransparency.value);
    canvas.setPixelPartition(Number(rangeResolution.max)+Number(rangeResolution.min)-Number(rangeResolution.value));
}

/**
 * ogni volta che viene cliccato il checkbox viene aggiunto o rimosso
 * il testo con le temperature
 */

function setCheckTempTextAction(){
    checkTempText.onclick = function (){
        if(checkTempText.checked == true){
            canvas.setDisplayText(true);
        } else {
            canvas.setDisplayText(false);
        }
        updateImage();
    }
}

/**
 * ogni volta che viene utilizzato lo slider si vede un'anteprima dell'immagine con la
 * nuova saturazione
 */

function setRangeSaturationAction(){
    rangeSaturation.onmousedown = function (){loading.startLoadingSettings()}
    rangeSaturation.onclick = function(){
        rgbConverter.setSaturationThreshold(rangeSaturation.value);
        updateImage();
        loading.stopLoadingSettings();
    }
}

/**
 * ogni volta che viene utilizzato lo slider viene modificata l'immagine con la
 * nuova costante di effetto delle superfici fredde
 */

function setRangeColdEffectAction(){
    rangeColdEffect.onmousedown = function (){loading.startLoadingSettings()}
    rangeColdEffect.onclick = function(){
        potential.setColdSurfaceEffect(rangeColdEffect.value);
        updateImage();
        loading.stopLoadingSettings();
    }
}

/**
 * ogni volta che viene utilizzato lo slider viene modificata l'immagine con la
 * nuova costante di effetto inter-stanza
 */

function setRangeInterRoomEffectAction(){
    rangeInterRoomEffect.onmousedown = function (){loading.startLoadingSettings()}
    rangeInterRoomEffect.onclick = function (){
        potential.setInterRoomEffect(rangeInterRoomEffect.value);
        updateImage();
        loading.stopLoadingSettings();
    }
}

/**
 * ogni volta che viene utilizzato lo slider viene modificata l'immagine con la
 * nuova trasparenza
 */

function setRangeTransparencyAction(){
    rangeTransparency.onmousedown = function (){loading.startLoadingSettings()}
    rangeTransparency.onclick = function (){
        canvas.setTransparency(rangeTransparency.value);
        updateImage();
        loading.stopLoadingSettings();
    }
}

/**
 * ogni volta che viene utilizzato lo slider viene modificata l'immagine con la
 * nuova risoluzione
 */

function setRangeResolutionAction(){
    rangeResolution.onmousedown = function (){loading.startLoadingSettings()}
    rangeResolution.onclick = function (){
        canvas.setPixelPartition(Number(rangeResolution.max)+Number(rangeResolution.min)-Number(rangeResolution.value));
        updateImage();
        loading.stopLoadingSettings();
    }
}

/**
 * setta l'azione del bottone impostazioni
 */

function setButtonSettingAction(){
    buttonSettings.onmouseover = function (){
        connector.stopAskForTemperatures();
    }
}

/**
 * setta l'azione della tendina impostazioni
 */

function setDropDownSettingsAction(){
    dropDownSettings.onmouseleave = function (){
        connector.startAskForTemperatures();
    }
}

/**
 * setta le azioni di tutti gli elementi
 */

export function setInputTypesActions(){
    setRangeSaturationAction();
    setRangeColdEffectAction();
    setRangeInterRoomEffectAction();
    setRangeTransparencyAction();
    setRangeResolutionAction();
    setButtonSettingAction();
    setDropDownSettingsAction();
    setCheckTempTextAction();
}


/**
 * rende invisibile il bottone impostazioni
 */

export function setButtonSettingInvisible(){
    buttonSettings.setAttribute("style", "display:none");
}

/**
 * rende visibile il bottone impostazioni
 */

export function setButtonSettingVisible(){
    buttonSettings.setAttribute("style", "display:block");
}

/**
 * aggiorna i coloti e testi con le temperature di ogni stanza
 */

function updateImage(){
    canvas.setRealTimeImage();
}
