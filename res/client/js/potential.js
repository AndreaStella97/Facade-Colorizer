import * as geometry from "./geometry.js";
import * as parser from "./jsonParser.js";

var tempMax=35;
var tempMin = 5;
var maxPotCost = 3;
var minPotCost = 1/3;
var coldSurfaceEffect;
var interRoomEffect;

/**
 * setta il valore dell'effetto delle altre stanze
 * @param roomEff la nuova costante di effetto delle altre stanze
 */

export function setInterRoomEffect(roomEff){
    interRoomEffect = roomEff;
}

/**
 * setta il valore dell'effetto delle superfici fredde
 * @param rep il nuovo effetto superfici fredde
 */

export function setColdSurfaceEffect(coldEff){
    coldSurfaceEffect = coldEff;
}

/**
 * calcola il potenziale di attrazione del punto dovuto alle distanze dalle sorgenti calde
 * @param coordX la coordinata x del punto
 * @param coordY la coordinata y del punto
 * @param room la stanza considerata
 * @returns il potenziale d'attrazione
 */

function getAttrattivePotential(coordX, coordY, room){
    var minRadDistance = geometry.getDistance(0,0,room.width,room.height);
    for(var j=0; j<parser.radiators.length;j++){
        var radCoord = geometry.getRelativeCoordinates(parser.radiators[j].xtl,parser.radiators[j].ytl, parser.radiators[j].xtl+parser.radiators[j].width, parser.radiators[j].ytl+parser.radiators[j].height, room.xtl, room.ytl);
        var radClosestPoint = geometry.getClosestPoint(radCoord[0], radCoord[1], radCoord[2], radCoord[3], coordX, coordY);
        var hotDistance = geometry.getDistance(coordX, coordY,radClosestPoint[0], radClosestPoint[1]);
        if(hotDistance<minRadDistance){
            minRadDistance=hotDistance;
        }
    }
    return minRadDistance;
}

/**
 * calcola il potenziale di repulsione del punto dovuto alle distanze dalle finestre
 * @param coordX la coordinata x del punto
 * @param coordY la coordinata y del punto
 * @param room la stanza considerata
 * @returns il potenziale di repulsione delle finestre
 */

function getWindowsRepulsionPotential(coordX, coordY, room){
    var minWinDistance = geometry.getDistance(0,0,room.width,room.height);
    for(var j=0; j<parser.windows.length;j++){
        var winCoord = geometry.getRelativeCoordinates(parser.windows[j].xtl,parser.windows[j].ytl, parser.windows[j].xtl+parser.windows[j].width, parser.windows[j].ytl+parser.windows[j].height, room.xtl, room.ytl);
        var winClosestPoint = geometry.getClosestPoint(winCoord[0], winCoord[1], winCoord[2], winCoord[3], coordX, coordY);
        var coldDistance = geometry.getDistance(coordX,coordY,winClosestPoint[0], winClosestPoint[1]);
        if (coldDistance<room.height/12){
            coldDistance=room.height/12;
        }
        if(coldDistance<minWinDistance){
            minWinDistance=coldDistance;
        }
    }
    return (1/minWinDistance)*coldSurfaceEffect;
}

/**
 * calcola il potenziale di repulsione del punto dovuto alle distanze dalle pareti
 * @param coordX la coordinata x del punto
 * @param coordY la coordinata y del punto
 * @param room la stanza considerata
 * @returns il potenziale di repulsione delle pareti
 */

function getWallRepulsionPotential(coordX, coordY, room) {
    var repulsionPotential=0;
    var wallClosestPoint = geometry.getClosestInternalPoint(0, 0, room.width, room.height, coordX,coordY);
    var wallDistance = geometry.getDistance(coordX,coordY,wallClosestPoint[0], wallClosestPoint[1]);
    var repulsionLimit = room.height/12;
    if(wallDistance<repulsionLimit/2){
        wallDistance=repulsionLimit/2
    }
    if(wallDistance<=repulsionLimit){
        repulsionPotential = (1 / wallDistance-1/(repulsionLimit))*coldSurfaceEffect/4;
    }
    return repulsionPotential;
}

/**
 * calcola la variabile con cui moltiplicare il potenziale in base alla temperatura della stanza e delle stanze vicine.
 * @param coordX la coordinata x del punto
 * @param coordY la coordinata y del punto
 * @param room la stanza considerata
 * @param tempIndex l'indice della temperatura
 * @returns la variabile calcolata
 */

function getPotentialVariable(coordX, coordY, room) {
    var temperature = getPointTemperature(coordX, coordY, room);
    temperature>tempMax?temperature=tempMax:null;
    temperature<tempMin?temperature=tempMin:null;
    var potentialVariable = 1/(((temperature-tempMin)*(maxPotCost-minPotCost)/(tempMax-tempMin)) + minPotCost);

    return potentialVariable;
}

/**
 * calcola la temperatura del singolo punto a seconda della temperatura della camera in cui è contenuto
 * e a seconda delle temperature delle camere vicine. Minore è la distanza dalle altre camere piu la temperatura
 * sarà vicina alla media pesata delle temperature delle camere vicine. Maggiore è la distanza dalle altre
 * camere piu la temperatura sarà vicina alla temperatura della camera in cui è contenuto.
 * maxDistance è la distanza massima del punto da una determinata camera, oltre la quale il contributo della camera
 * è nullo. maxDistance è regolabile settando il valore di interRoomEffect.
 * @param coordX la coordinata x del punto
 * @param coordY la coordinata y del punto
 * @param room la stanza considerata
 * @returns la temperatura del punto
 */

function getPointTemperature(coordX, coordY, room){
    var maxDistance = geometry.getDiagonal(room.width, room.height)*interRoomEffect/2;
    var maxWeightTotal = 3*maxDistance;
    var sumWeightedTemp=0;
    var sumWeights=0;
    for(var i=0; i<parser.rooms.length;i++){
        if(parser.rooms[i]!=room){
            var roomClosestPoint = geometry.getClosestPoint( parser.rooms[i].xtl,parser.rooms[i].ytl,parser.rooms[i].xtl+parser.rooms[i].width,parser.rooms[i].ytl+parser.rooms[i].height,coordX+room.xtl, coordY+room.ytl);
            var distance = geometry.getDistance(coordX+room.xtl, coordY+room.ytl, roomClosestPoint[0], roomClosestPoint[1]);
            var weight = maxDistance-distance;
            if(distance<=maxDistance){
                sumWeightedTemp+=weight*parser.rooms[i].temperature;
                sumWeights+=weight;
            }
        }
    }
    var averageTemperature=0;
    sumWeights!=0 ? averageTemperature = sumWeightedTemp/sumWeights : null;
    var roomTemperature = room.temperature;
    return ((((3*averageTemperature+roomTemperature)/4) - roomTemperature) / (maxWeightTotal)) * sumWeights + roomTemperature;
}

/**
 * calcola il potenziale complessivo
 * @param coordX la coordinata x del punto
 * @param coordY la coordinata y del punto
 * @param room la stanza considerata
 * @param tempIndex l'indice della temperatura
 * @returns il potenziale calcolato
 */

export function getPotential(coordX, coordY, room){
    return (getAttrattivePotential(coordX, coordY, room) + getWindowsRepulsionPotential(coordX, coordY, room) + getWallRepulsionPotential(coordX,coordY,room))*getPotentialVariable(coordX,coordY,room);

}

