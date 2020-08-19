import * as canvas from "./main.js"
import * as potential from "./potential.js";
import * as rgbConverter from "./rgbConverter.js";

var myRange = document.getElementById("myRange");
var myRangeSaturation = document.getElementById("myRangeSaturation");
var myRangeRepConst = document.getElementById("myRangeRepConst");
var saveButton = document.getElementById("saveButton");
var settedSaturationThreshold;
var settedRepulsionConstant;



export function setDefaultSettings(){
    rgbConverter.setSaturationThreshold(myRangeSaturation.max/2);
    potential.setRepulsionConstant(myRangeRepConst.max/2);

    settedSaturationThreshold = myRangeSaturation.max/2;
    settedRepulsionConstant = myRangeRepConst.max/2;
    myRangeSaturation.value = settedSaturationThreshold;
    myRangeRepConst.value = settedRepulsionConstant;
}

/**
 * ogni volta che viene utilizzato lo slider vengono aggiornati i rettangoli con le nuove temperature
 */

export function setRangeAction() {
    myRange.oninput = function(){
        canvas.setRoomsDataColors();
        canvas.setText();
    }
    myRange.onmousedown = function(){
        resetRangeSettingsValue();
    }
}

export function setRangeSaturationAction(){
    myRangeSaturation.onclick = function(){
        rgbConverter.setSaturationThreshold(myRangeSaturation.value);
        canvas.context.clearRect(0,0,canvas.myCanvas.width, canvas.myCanvas.height);
        canvas.setRect();
        canvas.setColorPreview();
        canvas.setText();
    }
}

export function setRangeRepConstAction(){
    myRangeRepConst.onclick = function(){
        potential.setRepulsionConstant(myRangeRepConst.value);
        canvas.context.clearRect(0,0,canvas.myCanvas.width, canvas.myCanvas.height);
        canvas.setRect();
        canvas.setColorPreview();
        canvas.setText();
    }
}

export function setSaveButtonAction(){
    saveButton.onclick = function(){
        settedSaturationThreshold = myRangeSaturation.value;
        settedRepulsionConstant = myRangeRepConst.value;
        canvas.context.clearRect(0,0,canvas.myCanvas.width, canvas.myCanvas.height);
        canvas.setRect();
        canvas.calcRoomsDataColors();
        canvas.setRoomsDataColors();
        canvas.setText();
    }
}

function resetRangeSettingsValue (){
    myRangeSaturation.value = settedSaturationThreshold;
    myRangeRepConst.value = settedRepulsionConstant;
    rgbConverter.setSaturationThreshold(settedSaturationThreshold);
    potential.setRepulsionConstant(settedRepulsionConstant);
}
