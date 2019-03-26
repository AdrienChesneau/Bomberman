let canvas = document.getElementById("cvn");
let context = canvas.getContext("2d");

// let player1 = {src: "player1.png", x:10, y:10, width:15, height:22, speed:8};
let player1 = new Objet("player1.png", 10, 10, 15, 22, 8, true);
let block_list = [];
// let wall1 = {src:"", x:0, y:0, width:800, height:0};
// let wall2 = {src:"", x:800, y:0, width:0, height:600};
// let wall3 = {src:"", x:0, y:600, width:800, height:0};
// let wall4 = {src:"", x:0, y:0, width:0, height:600};
let wall1 = new Objet("", 0, 0, 800, 0, 0, false);
let wall2 = new Objet("", 800, 0, 0, 600, 0, false);
let wall3 = new Objet("", 0, 600, 800, 0, 0, false);
let wall4 = new Objet("", 0, 0, 0, 600, 0, false);
block_list.push(wall1);
block_list.push(wall2);
block_list.push(wall3);
block_list.push(wall4);

let json = '{ "lvl1" : "000000000000000001010101101010100000000000000000010101011010101000000000000000000101010110101010010101011010101000000000000000000101010110101010000000000000000001010101101010100000000000000000" }';

let parser= function(pathname){
   /* Parsing de data.json qui renvoie une liste pour l'instant, les blocs */
   let data = JSON.parse(pathname);
   let lvl = data.lvl1;
   for(let i=0; i<lvl.length; i++){
        if(lvl[i]==1){
            block = new Objet("block.png", (i%16)*50, Math.trunc(i/16)*50, 50, 50, 0, false);
            block_list.push(block);
        }
   }
}   

let draw = function (){
    background = new Image();
    background.src = "map.png";
    context.drawImage(background,0,0);
    block_list.forEach(e => {
        block = new Image();
        block.src = e.src;
        context.drawImage(block,e.x,e.y,e.width, e.height);
    });
    player = new Image();
    player.src = player1.src;
    console.log(player1.x +" "+player1.y);
    context.drawImage(player,player1.x,player1.y,player1.width,player1.height);
}

let collision = function(player, elem_list){
    let pos = {x:-1, y:-1, width:-1, height:-1};
    elem_list.forEach(elem => {
        pos = player.getCollision(elem);
    });
    return pos;
}

let keyboard = function (e) {
    let pos = {x:-1, y:-1, width:-1, height:-1};
    switch (e.keyCode){
        case 90:
            player1.y= player1.y-player1.speed; 
            pos = collision(player1, block_list);
            // console.log(pos);
            // console.log(pos.x + " " + pos.y);
            if(pos.x !== -1 || pos.y !== -1){
                player1.y = pos.y+pos.height;
            }
            break;
        case 81:
            player1.x= player1.x-player1.speed;
            pos = collision(player1, block_list);
            // console.log(pos);
            // console.log(pos.x + " " + pos.y);
            if(pos.x !== -1 || pos.y !== -1){
                player1.x = pos.x+pos.width; 
            }
            break;
        case 83:
            player1.y= player1.y+player1.speed;
            pos = collision(player1, block_list);
            // console.log(pos);
            // console.log(pos.x + " " + pos.y);
            if(pos.x !== -1 || pos.y !== -1){
                player1.y = pos.y-player.height; 
            }
            break;
        case 68:
            player1.x= player1.x+player1.speed;
            pos = collision(player1, block_list);
            // console.log(pos);
            // console.log(pos.x + " " + pos.y);
            if(pos.x !== -1 || pos.y !== -1){
                player1.x= pos.x-player.width; 
            }
            break;
    }
};

parser(json);
// console.log(block_list);
setInterval(draw,16);
document.addEventListener("keydown", keyboard);