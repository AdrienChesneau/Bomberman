let canvas = document.getElementById("cvn");
let context = canvas.getContext("2d");

let player1 = {src: "player1.png", x:100, y:250, length:33, height:22, speed:8};
let block_list = [];

let json = '{ "lvl1" : "000000000000000001010101101010100000000000000000010101011010101000000000000000000101010110101010010101011010101000000000000000000101010110101010000000000000000001010101101010100000000000000000" }';

let parser= function(pathname){
   /* Parsing de data.json qui renvoie une liste pour l'instant, les blocs */
   let data = JSON.parse(pathname);
   let lvl = data.lvl1;
   for(let i=0; i<lvl.length; i++){
        if(lvl[i]==1){
            block_list.push({x:(i%16)*50,y:Math.trunc(i/16)*50});
        }
   }
}   

let draw = function (){
    background = new Image();
    background.src = "map.png";
    context.drawImage(background,0,0);
    block_list.forEach(e => {
        block = new Image();
        block.src = "block.png";
        context.drawImage(block,e.x,e.y);
    });
    player = new Image();
    player.src = player1.src;
    //console.log(player1.x +" "+player1.y);
    context.drawImage(player,player1.x,player1.y,33,22);
}

let keyboard = function (e) {
    switch (e.keyCode){
        case 90:
            if(player1.y>=player1.speed){
                let bool = true;
                block_list.forEach(e => {
                    if(((e.x<player1.x && player1.x<e.x+50) || (e.x<player1.x+22 && player1.x+22<e.x+50)) && (player1.y>=e.y+50 && e.y+50>player1.y-2)){
                        bool = false;
                    }
                });
                if(bool){player1.y= player1.y-player1.speed;}
            }
            break;
        case 81:
            if(player1.x>=player1.speed){
                let bool = true;
                block_list.forEach(e => {
                    if(((e.y<player1.y && player1.y<e.y+50) || (e.y<player1.y+33 && player1.y+33<e.x+50)) && (player1.x>=e.x+50 && e.x+50>player1.x-2)){
                        bool = false;
                    }
                });
                if(bool){player1.x= player1.x-player1.speed;}
            }
            break;
        case 83:
            if(player1.y+player.height<600-player1.speed){
                let bool = true;
                block_list.forEach(e => {
                    if(((e.x<player1.x && player1.x<e.x+50) || (e.x<player1.x+22 && player1.x+22<e.x+50)) && (player1.y+33<=e.y && e.y<player1.y+35)){
                        bool = false;
                    }
                });
                if(bool){player1.y= player1.y+player1.speed;}
            }
            else { player1.y = 600-player1.height; }
            break;
        case 68:
            if(player1.x+player1.length<=800-player1.speed){
                let bool = true;
                block_list.forEach(e => {
                    if(((e.y<player1.y && player1.y<e.y+50) || (e.y<player1.y+33 && player1.y+33<e.x+50)) && (player1.x+22<=e.x && e.x<player1.x+24)){
                        bool = false;
                    }
                });
                if(bool){player1.x= player1.x+player1.speed;}
            }
            break;
    }
};

parser(json);
// console.log(block_list);
setInterval(draw,16);
document.addEventListener("keydown", keyboard);