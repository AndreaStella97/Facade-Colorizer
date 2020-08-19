import * as parser from "./jsonParser.js";
import * as potential from "./potential.js";
import * as rgbConverter from "./rgbConverter.js";

var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext("2d");
var myRange = document.getElementById("myRange");


/**
 * richiede al server il file JSON con le dimensioni delle stanze e temperature
 * @type {XMLHttpRequest}
 */

var httpReq = new XMLHttpRequest();
httpReq.onreadystatechange = function() {
    if (httpReq.readyState == 4 && httpReq.status == 200) {
        var jsonObj = JSON.parse(httpReq.responseText);
        parser.parsing(jsonObj);
        setImage();
        setCanvas();
        setRect();
        calcRoomsDataColors();
        setRoomsDataColors();
        setText();
        setRangeAction();
    }
};

httpReq.open("GET", "http://localhost:8081/annotations", true);
httpReq.send();


/**
 * aggiunge l'immagine di background selezionata
 * @param jsonObj l'oggetto JSON che contiene tutte le annotazioni
 */

function setImage() {
    var img = document.getElementById("myImage");
    img.setAttribute("src", parser.getImagePath());
}

/**
 * setta altezza e larghezza del canvas
 * @param jsonObj l'oggetto JSON che contiene tutte le annotazioni
 */

function setCanvas(jsonObj) {
    var imageDimension = parser.getImageDimension();
    myCanvas.width = imageDimension.width;
    myCanvas.height = imageDimension.height;
}

/**
 * crea i rettangoli delle dimensioni delle camere
 */

function setRect() {
    for(var i=0; i<parser.rooms.length; i++){
        context.beginPath();
        context.fillRect(parser.rooms[i].xtl, parser.rooms[i].ytl, parser.rooms[i].width, parser.rooms[i].height);
        context.stroke();
    }
}

/**
 * setta il testo con le varie temperature
 */

function setText(){
    for(var i=0; i<parser.rooms.length; i++){
        context.font = "40px Arial";
        context.textAlign = "center";
        context.fillText( parser.rooms[i].temperatures[myRange.value -1]+"°",parser.rooms[i].xtl+parser.rooms[i].width/2, parser.rooms[i].ytl+ parser.rooms[i].height/2 );
    }
}

/**
 * calcola i dati dei colori per ogni temperatura e stanza
 */

function calcRoomsDataColors(){
   for(var k=0; k<parser.rooms.length;k++){
       for(var j=0; j<parser.rooms[k].temperatures.length;j++){
           var imageData = context.getImageData(parser.rooms[k].xtl,parser.rooms[k].ytl,parser.rooms[k].width,parser.rooms[k].height);
           var pixels = imageData.data;
           for(var i = 0; i<pixels.length; i+=4){
               var numPixel = i/4+4;
               var pixelX = numPixel%parser.rooms[k].width;
               var pixelY = Math.ceil(numPixel/parser.rooms[k].width);
               var rgb=rgbConverter.numToRgb(potential.getPotential(pixelX, pixelY,parser.rooms[k], parser.getRadiatorsInsideRoom(parser.rooms[k].roomId), parser.getWindowsInsideRoom(parser.rooms[k].roomId),parser.rooms[k].temperatures[j]));
               pixels[i]=rgb.r;
               pixels[i+1]=rgb.g;
               pixels[i+2]=rgb.b;
               pixels[i+3]=150;
           }
           parser.rooms[k].colorsData[j] = pixels;
       }
   }
}

/**
 * setta i colori di ogni stanza
 */

function setRoomsDataColors(){
    for(var i=0; i<parser.rooms.length;i++){
        var imageData = context.getImageData(parser.rooms[i].xtl,parser.rooms[i].ytl,parser.rooms[i].width,parser.rooms[i].height);
        imageData.data.set(parser.rooms[i].colorsData[myRange.value -1]);
        context.putImageData(imageData,parser.rooms[i].xtl,parser.rooms[i].ytl);
    }
}

/**
 * ogni volta che viene utilizzato lo slider vengono aggiornati i rettangoli con le nuove temperature
 */

function setRangeAction() {
    myRange.oninput = function(){
        setRoomsDataColors();
        setText();
    }
}
