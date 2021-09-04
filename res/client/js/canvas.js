import * as parser from "./jsonParser.js";
import * as potential from "./potential.js";
import * as rgbConverter from "./rgbConverter.js";


export var myCanvas = document.getElementById("myCanvas");
export var context = myCanvas.getContext("2d");
var pixelPartition;
var transparency;
var displayText = true;


/**
 * setta il partizionamento dei pixel
 * @param pixPart il partizionamento
 */
export function setPixelPartition(pixPart){
    pixelPartition=pixPart;
}

/**
 * setta la costante di trasparenza
 * @param transp la costante di trasparenza
 */

export function setTransparency(transp){
    transparency=255-transp;
}

/**
 * setta il boolean che specifica la visibilita del testo con le temperature
 * @param displayBoolean il boolean
 */

export function setDisplayText(displayBoolean){
    displayText = displayBoolean;
}

/**
 * aggiunge l'immagine di background selezionata
 * @param jsonObj l'oggetto JSON che contiene tutte le annotazioni
 */

export function setFlatImage() {
    var img = document.getElementById("imageFlat");
    img.setAttribute("src", parser.getImagePath());
}

/**
 * setta altezza e larghezza del canvas
 */

export function setCanvas() {
    var imageDimension = parser.getImageDimension();
    myCanvas.width = imageDimension.width;
    myCanvas.height = imageDimension.height;
}

/**
 * setta il testo con le varie temperature ricevute in real-time
 */

function setRealTimeTemperatureText(){
    for(var i=0; i<parser.rooms.length; i++){
        context.font = "25px Arial";
        context.textAlign = "center";
        context.fillText( parser.rooms[i].temperature+"°",parser.rooms[i].xtl+parser.rooms[i].width/2, parser.rooms[i].ytl+ parser.rooms[i].height/2 );
    }
}


/**
 * setta il colore dei vari rettangoli date le temperature ricevute in real-time
 */


function setRealTimeTemperatureColor(){
    for(var i=0; i<parser.rooms.length; i++){
        var imageData = context.getImageData(parser.rooms[i].xtl,parser.rooms[i].ytl,parser.rooms[i].width,parser.rooms[i].height);
        var pixels = imageData.data;
        for(var k=0; k<pixels.length; k+=4*pixelPartition){
            var numPixel = k/4;
            var pixelX = numPixel%parser.rooms[i].width;
            var pixelY = Math.ceil(numPixel/parser.rooms[i].width);
            var pot = potential.getPotential(pixelX,pixelY,parser.rooms[i]);
            var rgb=rgbConverter.numToRgb(pot);
            for(var j=0; j<4*pixelPartition;j+=4){
                pixels[k+j]= rgb.r;
                pixels[k+j+1]= rgb.g;
                pixels[k+j+2]= rgb.b;
                pixels[k+j+3]=transparency;
            }
        }
        context.putImageData(imageData,parser.rooms[i].xtl,parser.rooms[i].ytl);
    }
}

/**
 * setta colore e testo con le temperature ricevute in real-time
 */

export function setRealTimeImage(){
    setRealTimeTemperatureColor();
    if(displayText){
        setRealTimeTemperatureText();
    }

}

/**
 * calcola i dati dei colori per ogni temperatura e stanza date le temperature ricevute in time-lapse
 */

export function calcTimeLapseTemperaturesColors(){
    const start = Date.now();
    for(var t=0; t<parser.rooms[0].timeLapseTemperatures.length;t++){
        for(var s=0; s<parser.rooms.length; s++){
            parser.rooms[s].temperature = parser.rooms[s].timeLapseTemperatures[t];
        }
        for(var i=0; i<parser.rooms.length; i++){
            var imageData = context.getImageData(parser.rooms[i].xtl,parser.rooms[i].ytl,parser.rooms[i].width,parser.rooms[i].height);
            var pixels = imageData.data;
            for(var k=0; k<pixels.length; k+=4*pixelPartition){
                var numPixel = k/4;
                var pixelX = numPixel%parser.rooms[i].width;
                var pixelY = Math.ceil(numPixel/parser.rooms[i].width);
                var pot = potential.getPotential(pixelX,pixelY,parser.rooms[i]);
                var rgb=rgbConverter.numToRgb(pot);
                for(var j=0; j<4*pixelPartition;j+=4){
                    pixels[k+j]= rgb.r;
                    pixels[k+j+1]= rgb.g;
                    pixels[k+j+2]= rgb.b;
                    pixels[k+j+3]=transparency;
                }
            }
            parser.rooms[i].colorsData[t] = pixels;
        }
    }
    const loadingTime = new Date(Date.now()-start);
    console.log("frame totali: "+parser.rooms[0].timeLapseTemperatures.length);
    console.log("tempo di caricamento: "+loadingTime.getUTCHours()+" ore " + loadingTime.getUTCMinutes() +" minuti " + loadingTime.getUTCSeconds()+ " secondi ");
}


/**
 * setta i colori di ogni stanza in base ai dati dei colori salvati
 * @param tempIndex l'indice corrispondente ad una data temperatura
 */

function setTimeLapseTemperaturesColors(tempIndex){
    for(var i=0; i<parser.rooms.length;i++){
        var imageData = context.getImageData(parser.rooms[i].xtl,parser.rooms[i].ytl,parser.rooms[i].width,parser.rooms[i].height);
        imageData.data.set(parser.rooms[i].colorsData[tempIndex]);
        context.putImageData(imageData,parser.rooms[i].xtl,parser.rooms[i].ytl);
    }
}

/**
 * setta il testo con le varie temperature ricevute in time-lapse
 * @param tempIndex l'indice corrispondente ad una data temperatura
 */

function setTimeLapseTemperaturesText(tempIndex){
    for(var i=0; i<parser.rooms.length; i++){
        context.font = "25px Arial";
        context.textAlign = "center";
        context.fillText( parser.rooms[i].timeLapseTemperatures[tempIndex]+"°",parser.rooms[i].xtl+parser.rooms[i].width/2, parser.rooms[i].ytl+ parser.rooms[i].height/2 );
    }
}

/**
 * setta colore e testo con le temperature ricevute in time-lapse
 * @param tempIndex l'indice corrispondente ad una data temperatura
 */

export function setTimeLapseImages(tempIndex){
    setTimeLapseTemperaturesColors(tempIndex);
    if(displayText){
        setTimeLapseTemperaturesText(tempIndex);
    }
}








