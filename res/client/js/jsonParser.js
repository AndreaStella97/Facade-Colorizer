
var jsonCategoryRoomsId;
var jsonCategoryRadiatorsId;
var jsonCategoryWindowsId;
var jsonCategoryRoomsName = "Stanza";
var jsonCategoryRadiatorsName = "Termosifone";
var jsonCategoryWindowsName = "Finestra";
var jsonObjAnnotations;

export var rooms = new Array();
export var radiators = new Array();
export var windows = new Array();

/**
 * setta i vari elementi del condominio in base all'oggetto JSON con le annotazioni
 * @param jObjAnnot l'oggetto JSON con le annotazioni
 */

export function parsingAnnotation(jObjAnnot){
    jsonObjAnnotations = jObjAnnot;
    setCategoriesId();
    setRooms();
    setRadiators();
    setWindows();
}

/**
 * imposta la temperature misurate in real time nelle stanze
 * @param jObjTemperatures l'oggetto JSON con le temperature
 */

export function parsingTemperatures(jObjTemperatures){
    for(var i=0; i<jObjTemperatures.temperatures.length;i++){
        for(var j=0; j<rooms.length; j++){
            if(jObjTemperatures.temperatures[i].room_id == rooms[j].roomId ){
                rooms[j].temperature = jObjTemperatures.temperatures[i].temperature;
            }
        }
    }
}

/**
 * imposta le temperature misurate in time lapse nelle stanze
 * @param jObjTemperatures l'oggetto JSON con le temperature
 */

export function parsingTimeLapseTemperatures(jObjTemperatures){
    for(var i=0; i<rooms.length;i++){
        rooms[i].timeLapseTemperatures = [];
    }
    for(var i=0; i<jObjTemperatures.temperatures.length; i++){
        for(var j=0; j<rooms.length; j++){
            if(jObjTemperatures.temperatures[i].room_id == rooms[j].roomId ){
                for(var k=0; k<jObjTemperatures.temperatures[i].time_lapse_temperatures.length; k++){
                    rooms[j].timeLapseTemperatures[k] = jObjTemperatures.temperatures[i].time_lapse_temperatures[k];
                }
            }
        }
    }
}

/**
 * setta gli id delle varie categorie segmentate: camere, finestre e termosifoni
 */

function setCategoriesId(){
    for(var i =0; i<jsonObjAnnotations.categories.length; i++){
        if(jsonObjAnnotations.categories[i].name == jsonCategoryRoomsName){
            jsonCategoryRoomsId = jsonObjAnnotations.categories[i].id;
        }
        if(jsonObjAnnotations.categories[i].name == jsonCategoryRadiatorsName){
            jsonCategoryRadiatorsId = jsonObjAnnotations.categories[i].id;
        }
        if(jsonObjAnnotations.categories[i].name == jsonCategoryWindowsName) {
            jsonCategoryWindowsId = jsonObjAnnotations.categories[i].id;
        }
    }
}

/**
 * setta le dimensioni, l'id e le temperature delle stanze
 */

function setRooms(){
    var j=0;
    for(var i=0; i<jsonObjAnnotations.annotations.length; i++){
        if(jsonObjAnnotations.annotations[i].category_id == jsonCategoryRoomsId)  {
            rooms[j] = {
                roomId : jsonObjAnnotations.annotations[i].attributes.ID,
                xtl : Math.floor(jsonObjAnnotations.annotations[i].bbox[0]),
                ytl : Math.floor(jsonObjAnnotations.annotations[i].bbox[1]),
                width : Math.floor(jsonObjAnnotations.annotations[i].bbox[2]),
                height : Math.floor(jsonObjAnnotations.annotations[i].bbox[3]),
                timeLapseTemperatures : [],
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
    for(var i=0; i<jsonObjAnnotations.annotations.length; i++){
        if(jsonObjAnnotations.annotations[i].category_id == jsonCategoryRadiatorsId){
            radiators[j] = {
                radiatorId : jsonObjAnnotations.annotations[i].attributes.ID,
                roomId : jsonObjAnnotations.annotations[i].attributes.IDStanza,
                xtl : Math.floor(jsonObjAnnotations.annotations[i].bbox[0]),
                ytl : Math.floor(jsonObjAnnotations.annotations[i].bbox[1]),
                width : Math.floor(jsonObjAnnotations.annotations[i].bbox[2]),
                height : Math.floor(jsonObjAnnotations.annotations[i].bbox[3])
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
    for(var i=0; i<jsonObjAnnotations.annotations.length; i++){
        if(jsonObjAnnotations.annotations[i].category_id == jsonCategoryWindowsId){
            windows[j] = {
                windowId : jsonObjAnnotations.annotations[i].attributes.ID,
                roomId : jsonObjAnnotations.annotations[i].attributes.IDStanza,
                xtl : Math.floor(jsonObjAnnotations.annotations[i].bbox[0]),
                ytl : Math.floor(jsonObjAnnotations.annotations[i].bbox[1]),
                width : Math.floor(jsonObjAnnotations.annotations[i].bbox[2]),
                height : Math.floor(jsonObjAnnotations.annotations[i].bbox[3])
            };
            j++;
        }
    }
}

/**
 * @returns il path dell'immagine
 */

export function getImagePath(){
    return jsonObjAnnotations.images[0].file_name;
}

/**
 * @returns le dimensioni dell'immagine
 */
export function getImageDimension(){
    return {width: jsonObjAnnotations.images[0].width, height: jsonObjAnnotations.images[0].height}
}


