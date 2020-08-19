import * as parser from "./jsonParser.js";
import * as canvas from "./main.js";
import * as inputTypes from "./inputTypes.js"

/**
 * richiede al server il file JSON con le dimensioni delle stanze e temperature
 * @type {XMLHttpRequest}
 */

var httpReq = new XMLHttpRequest();
httpReq.onreadystatechange = function() {
    if (httpReq.readyState == 4 && httpReq.status == 200) {
        var jsonObj = JSON.parse(httpReq.responseText);
        parser.parsing(jsonObj);
        inputTypes.setDefaultSettings();
        inputTypes.setRangeAction();
        inputTypes.setRangeSaturationAction();
        inputTypes.setRangeRepConstAction();
        inputTypes.setSaveButtonAction();
        canvas.setImage();
        canvas.setCanvas();
        canvas.setRect();
        canvas.calcRoomsDataColors();
        canvas.setRoomsDataColors();
        canvas.setText();
    }
};

httpReq.open("GET", "http://localhost:8080/annotations", true);
httpReq.send();