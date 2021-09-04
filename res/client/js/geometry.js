
/**
 * calcola le coordinate di un rettangolo relative ad un determinato punto
 * @param x1 prima coordinata x del rettangolo
 * @param y1 prima coordinata y del rettangolo
 * @param x2 seconda coordinata x del rettangolo
 * @param y2 seconda coordinata y del rettangolo
 * @param a coordinata x del punto
 * @param b coordinata y del punto
 * @returns le coordinate relative
 */

export function getRelativeCoordinates(x1,y1,x2,y2,a,b){
    var x1rel = x1-a;
    var y1rel = y1-b;
    var x2rel = x2-a;
    var y2rel = y2-b;
    var coordinates = new Array(x1rel,y1rel,x2rel,y2rel);
    return coordinates;
}

/**
 * calcola la distanza tra due punti
 * @param x1 coordinata x primo punto
 * @param y1 coordinata y secondo punto
 * @param x2 coordinata x secondo punto
 * @param y2 coordinata y secondo punto
 * @returns la distanza tra i due punti
 */

export function getDistance(x1,y1,x2,y2) {
    var distance= Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));

    return distance;

}

/**
 * calcola la distanza tra un punto esterno ad un rettangolo e il bordo del rettangolo stesso
 * @param x1 prima coordinata x rettangolo
 * @param y1 prima coordinata y rettangolo
 * @param x2 seconda coordinata x rettangolo
 * @param y2 seconda coordinata y rettangolo
 * @param a  coordinata x punto
 * @param b  coordinata y punto
 * @returns le coordinate del punto nel bordo del rettangolo piu vicino al punto passato come parametro
 */

export function getClosestPoint(x1,y1,x2,y2,a,b){
    var coordX;
    var coordY;
    a>=x2 ? coordX = x2 : null;
    a<=x1 ? coordX = x1 : null;
    a>=x1 && a<=x2 ? coordX = a : null;
    b>=y2 ? coordY = y2 : null;
    b<=y1 ? coordY = y1 : null;
    b>=y1 && b<=y2 ? coordY = b : null;
    var coordinates=new Array(coordX,coordY);
    return coordinates;
}

/**
 * calcola la distanza tra un punto interno ad un rettangolo e il bordo delrettangolo stesso
 * @param x1 prima coordinata x rettangolo
 * @param y1 prima coordinata y rettangolo
 * @param x2 seconda coordinata x rettangolo
 * @param y2 seconda coordinata y rettangolo
 * @param a  coordinata x punto
 * @param b  coordinata y punto
 * @returns le coordinate del punto nel bordo del rettangolo piu vicino al punto passato come parametro
 */

export function getClosestInternalPoint(x1,y1,x2,y2,a,b) {
    var sideX;
    var sideY;

    (a-x1)>(x2-x1)/2 ? sideX = x2 : sideX = x1;
    (b-y1)>(y2-y1)/2 ? sideY = y2 : sideY = y1;
    var coordX;
    var coordY;
    if(Math.abs(sideX-a)<Math.abs(sideY-b)){
        coordX = sideX;
        coordY = b;
    } else {
        coordX = a;
        coordY = sideY;
    }

    var coordinates=new Array(coordX,coordY);
    return coordinates;
}

/**
 * ritorna la diagonale data altezza e larghezza di un rettangolo
 * @param width larghezza
 * @param height altezza
 * @returns {number} diagonale
 */

export function getDiagonal(width, height){
    return Math.sqrt(Math.pow(width,2)+Math.pow(height,2));

}
