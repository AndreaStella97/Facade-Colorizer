
var saturationThreshold = 350;

export function setSaturationThreshold(sat){
    saturationThreshold = sat;
}

/**
 * converte il valore passato come parametro in tripla rgb proporzionale al valore
 * @param h valore da convertire
 * @returns {{r: number, b: number, g: number}} la tripla rgb
 */

export function numToRgb (h) {
    var r, g, b;

    h>saturationThreshold?h=saturationThreshold:null;

    if(h<=saturationThreshold/6){
        r=255;
        g=(-255*h/(saturationThreshold/6)) + 255;
        b=(-255*h/(saturationThreshold/6)) + 255;
    } else if(h>saturationThreshold/6 && h<=saturationThreshold/3){
        r=255;
        g=(255/(saturationThreshold/6))*(h-(saturationThreshold/6));
        b=0;
    } else if(h>saturationThreshold/3 && h<=saturationThreshold/2){
        r= (-255/(saturationThreshold/6))*(h-saturationThreshold/3) + 255;
        g=255;
        b=0;
    } else if(h>saturationThreshold/2 && h<=saturationThreshold*2/3){
        r=0;
        g=255;
        b=(255/(saturationThreshold/6))*(h-saturationThreshold/2);
    } else if(h>saturationThreshold*2/3 && h<= saturationThreshold*5/6){
        r=0;
        g=(-255/(saturationThreshold/6))*(h-(saturationThreshold*2/3)) +255;
        b=255;
    } else {
        r=0;
        g=0;
        b=(-105/(saturationThreshold/6))*(h-(saturationThreshold*5/6)) +255;
    }

    return { r: r, g: g, b: b };
}