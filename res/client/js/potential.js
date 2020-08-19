import * as geometry from "./geometry.js";

var repulsionConstant = 2000;
var tempMax=35;
var tempMin = 5;
var maxPotCost = 3;
var minPotCost = 1/3;

export function setRepulsionConstant(repConst){
    repulsionConstant=repConst;
}

/**
 * calcola il potenziale di attrazione del punto dovuto alle distanze dalle sorgenti calde
 * @param coordX la coordinata x del punto
 * @param coordY la coordinata y del punto
 * @param room la stanza considerata
 * @param rad i termosifoni
 * @returns il potenziale d'attrazione
 */

function getAttrattivePotential(coordX, coordY, room, rad){
    var minRadDistance = geometry.getDistance(0,0,room.width,room.height);
    for(var j=0; j<rad.length;j++){
        var radCoord = geometry.getRelativeCoordinates(rad[j].xtl,rad[j].ytl, rad[j].xtl+rad[j].width, rad[j].ytl+rad[j].height, room.xtl, room.ytl);
        var radClosestPoint = geometry.getClosestPoint(radCoord[0], radCoord[1], radCoord[2], radCoord[3], coordX, coordY);
        var hotDistance = geometry.getDistance(coordX, coordY,radClosestPoint[0], radClosestPoint[1]);
        if(hotDistance<minRadDistance){
            minRadDistance=hotDistance;
        }
    }
    return minRadDistance;
}

/**
 * calcola il potenziale di repulsione del punto dovuto alle distanze dalle sorgenti fredde
 * @param coordX la coordinata x del punto
 * @param coordY la coordinata y del punto
 * @param room la stanza considerata
 * @param win le finestre
 * @returns il potenziale di repulsione
 */

function getRepulsionPotential(coordX, coordY, room, win){
    return getWindowsRepulsionPotential(coordX, coordY, room, win) + getWallRepulsionPotential(coordX, coordY, room);
}

/**
 * calcola il potenziale di repulsione del punto dovuto alle distanze dalle finestre
 * @param coordX la coordinata x del punto
 * @param coordY la coordinata y del punto
 * @param room la stanza considerata
 * @param win le finestre
 * @returns il potenziale di repulsione delle finestre
 */

function getWindowsRepulsionPotential(coordX, coordY, room, win){
    var minWinDistance = geometry.getDistance(0,0,room.width,room.height);
    for(var j=0; j<win.length;j++){
        var winCoord = geometry.getRelativeCoordinates(win[j].xtl,win[j].ytl, win[j].xtl+win[j].width, win[j].ytl+win[j].height, room.xtl, room.ytl);
        var winClosestPoint = geometry.getClosestPoint(winCoord[0], winCoord[1], winCoord[2], winCoord[3], coordX, coordY);
        var coldDistance = geometry.getDistance(coordX,coordY,winClosestPoint[0], winClosestPoint[1]);
        if (coldDistance<win[j].width/4){
            coldDistance=win[j].width/4;
        }
        if(coldDistance<minWinDistance){
            minWinDistance=coldDistance;
        }
    }
    return (1/minWinDistance)*repulsionConstant;
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
    if(wallDistance<=repulsionLimit){
        repulsionPotential = (1 / wallDistance-1/(repulsionLimit))*repulsionConstant;
    }
    return repulsionPotential;
}

/**
 * calcola la costante con cui moltiplicare il potenziale in base alla temperatura della stanza.
 * maggiore è la temperatura, minore sarà la costante
 * @param temperatura
 * @returns la costante calcolata
 */

function getPotentialCostant(temperatura) {
    temperatura>tempMax?temperatura=tempMax:null;
    temperatura<tempMin?temperatura=tempMin:null;
    var potentialCostant = 1/(((temperatura-tempMin)*(maxPotCost-minPotCost)/(tempMax-tempMin)) + minPotCost);

    return potentialCostant;
}

/**
 * calcola il potenziale complessivo
 * @param coordX la coordinata x del punto
 * @param coordY la coordinata y del punto
 * @param room la stanza considerata
 * @param rad i termosifoni(punti caldi)
 * @param win le finestre(punti freddi)
 * @param temperatura la temperatura della stanza
 * @returns il potenziale calcolato
 */

export function getPotential(coordX, coordY, room, rad, win, temperatura){
    return (getAttrattivePotential(coordX, coordY, room, rad) + getRepulsionPotential(coordX, coordY, room, win))*getPotentialCostant(temperatura);

}
