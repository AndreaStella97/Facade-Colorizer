var jsonCategoryRoomsId;
var jsonCategoryRadiatorsId;
var jsonCategoryWindowsId;
var jsonCategoryRoomsName = "Camere";
var jsonCategoryRadiatorsName = "Termosifoni";
var jsonCategoryWindowsName = "Finestre";
var jsonObj;

export var rooms = new Array();
export var radiators = new Array();
export var windows = new Array();


export function parsing(jObj){
    jsonObj = jObj;
    setCategoriesId();
    setRooms();
    setRadiators();
    setWindows();
}


/**
 * setta gli id delle varie categorie segmentate: camere, finestre e termosifoni
 */

function setCategoriesId(){
    for(var i =0; i<jsonObj.categories.length; i++){
        if(jsonObj.categories[i].name == jsonCategoryRoomsName){
            jsonCategoryRoomsId = jsonObj.categories[i].id;
        }
        if(jsonObj.categories[i].name == jsonCategoryRadiatorsName){
            jsonCategoryRadiatorsId = jsonObj.categories[i].id;
        }
        if(jsonObj.categories[i].name == jsonCategoryWindowsName) {
            jsonCategoryWindowsId = jsonObj.categories[i].id;
        }
    }
}

/**
 * setta le dimensioni, l'id e le temperature delle stanze
 */

function setRooms(){
    var j=0;
    for(var i=0; i<jsonObj.annotations.length; i++){
        if(jsonObj.annotations[i].category_id == jsonCategoryRoomsId)  {
            rooms[j] = {
                roomId : jsonObj.annotations[i].attributes.ID,
                xtl : Math.floor(jsonObj.annotations[i].bbox[0]),
                ytl : Math.floor(jsonObj.annotations[i].bbox[1]),
                width : Math.floor(jsonObj.annotations[i].bbox[2]),
                height : Math.floor(jsonObj.annotations[i].bbox[3]),
                temperatures : jsonObj.annotations[i].temperatures,
                colorsData : []
            };
            j++;
        }
    }
}

/**
 * setta le dimensioni, l'id e l'id della stanza a cui appartiene
 */

function setRadiators() {
    var j=0;
    for(var i=0; i<jsonObj.annotations.length; i++){
        if(jsonObj.annotations[i].category_id == jsonCategoryRadiatorsId){
            radiators[j] = {
                radiatorId : jsonObj.annotations[i].attributes.ID,
                roomId : jsonObj.annotations[i].attributes.Camera,
                xtl : Math.floor(jsonObj.annotations[i].bbox[0]),
                ytl : Math.floor(jsonObj.annotations[i].bbox[1]),
                width : Math.floor(jsonObj.annotations[i].bbox[2]),
                height : Math.floor(jsonObj.annotations[i].bbox[3])
            };
            j++;
        }
    }
}

/**
 * setta le dimensioni, l'id e l'id della stanza a cui appartiene
 */

function setWindows() {
    var j=0;
    for(var i=0; i<jsonObj.annotations.length; i++){
        if(jsonObj.annotations[i].category_id == jsonCategoryWindowsId){
            windows[j] = {
                windowId : jsonObj.annotations[i].attributes.ID,
                roomId : jsonObj.annotations[i].attributes.Camera,
                xtl : Math.floor(jsonObj.annotations[i].bbox[0]),
                ytl : Math.floor(jsonObj.annotations[i].bbox[1]),
                width : Math.floor(jsonObj.annotations[i].bbox[2]),
                height : Math.floor(jsonObj.annotations[i].bbox[3])
            };
            j++;
        }
    }
}

/**
 * @returns il path dell'immagine
 */

export function getImagePath(){
    return jsonObj.images[0].file_name;
}

/**
 * @returns le dimensioni dell'immagine
 */
export function getImageDimension(){
    return {width: jsonObj.images[0].width, height: jsonObj.images[0].height}
}

/**
 * ritorna i termosifoni contenuti nella camera specificata dall'id
 * @param roomId l'id della camera di cui vogliamo avere i termosifoni
 * @returns un array di termosifoni contenuti nella camera
 */

export function getRadiatorsInsideRoom(roomId) {
    var radiatorsInRoom = new Array();
    var j=0;
    for(var i=0; i<radiators.length; i++){
        if(radiators[i].roomId==roomId){
            radiatorsInRoom[j] = radiators[i];
            j++;
        }
    }
    return radiatorsInRoom;
}

/**
 * ritorna le finestre contenute nella camera specificata dall'id
 * @param roomId l'id della camera di cui vogliamo avere le finestre
 * @returns un array di finestre contenuti nella camera
 */

export function getWindowsInsideRoom(roomId) {
    var windowsInRoom = new Array();
    var j=0;
    for(var i=0; i<windows.length; i++){
        if(windows[i].roomId==roomId){
            windowsInRoom[j] = windows[i];
            j++;
        }
    }
    return windowsInRoom;
}
