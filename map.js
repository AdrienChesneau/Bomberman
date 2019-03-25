let canvas = document.getElementById("cvn");
let context = canvas.getContext("2d");

let player1 = {src: "player1.png", x:100, y:250};
let block_list = [];

let parser= function(){
   /* Parsing de data.json qui renvoie une liste pour l'instant, les blocs */
   block_list = [{x:200,y:200},{x:250,y:200}];
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
    context.drawImage(player,player1.x,player1.y,22,33);
}

let keyboard = function (e) {
    switch (e.keyCode){
        case 90:
            if(player1.y>=2){
                let bool = true
                block_list.forEach(e => {
                    if(((e.x<player1.x && player1.x<e.x+50) || (e.x<player1.x+22 && player1.x+22<e.x+50)) && (player1.y>=e.y+50 && e.y+50>player1.y-2)){
                        bool = false;
                        console.log("Stop")
                    }
                });
                if(bool){player1.y= player1.y - 2;}
            }
            break;
        case 81:
            if(player1.x>=2){
                let bool = true
                block_list.forEach(e => {
                    if(((e.y<player1.y && player1.y<e.y+50) || (e.y<player1.y+33 && player1.y+33<e.x+50)) && (player1.x>=e.x+50 && e.x+50>player1.x-2)){
                        bool = false;
                        console.log("Stop")
                    }
                });
                if(bool){player1.x= player1.x - 2;}
            }
            break;
        case 83:
            if(player1.y<=575){
                let bool = true
                block_list.forEach(e => {
                    if(((e.x<player1.x && player1.x<e.x+50) || (e.x<player1.x+22 && player1.x+22<e.x+50)) && (player1.y+33<=e.y && e.y<player1.y+35)){
                        bool = false;
                        console.log("Stop")
                    }
                });
                if(bool){player1.y= player1.y + 2;}
            }
            break;
        case 68:
            if(player1.x<=765){
                let bool = true
                block_list.forEach(e => {
                    if(((e.y<player1.y && player1.y<e.y+50) || (e.y<player1.y+33 && player1.y+33<e.x+50)) && (player1.x+22<=e.x && e.x<player1.x+24)){
                        bool = false;
                        console.log("Stop")
                    }
                });
                if(bool){player1.x= player1.x + 2;}
            }
            break;
    }
};

parser();
setInterval(draw,16);
document.addEventListener("keydown", keyboard);



