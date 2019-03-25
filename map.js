const json = require('./data.json');

let canvas = document.getElementById("cvn");
let context = canvas.getContext("2d");

let parser= function(){
   /* let json = $.getJSON('data.json');
    let archi = JSON.parse(json);
    console.log(archi);*/
    
    console.log(json);
}   

let initiliaze = function (){
    background = new Image();
    background.src = "map.png";
    context.drawImage(background,0,0);
}

initiliaze();
parser();

