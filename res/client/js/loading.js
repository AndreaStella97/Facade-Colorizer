var loadingSettings = document.getElementById("loadingSettings");
var loadingTimeLapse = document.getElementById("loadingTimeLapse");


/**
 * rende visibile la gif di caricamento
 */

export function startLoadingSettings(){
    loadingSettings.setAttribute("style", "display:block");
}

/**
 * rende invisibile la gif di caricamento
 */

export function stopLoadingSettings(){
    loadingSettings.setAttribute("style", "display:none");
}


/**
 * rende visibile la gif di caricamento
 */

export function startLoadingTimeLapse(){
    loadingTimeLapse.setAttribute("style", "display:block");
}

/**
 * rende invisibile la gif di caricamento
 */

export function stopLoadingTimeLapse(){
    loadingTimeLapse.setAttribute("style", "display:none");
}


