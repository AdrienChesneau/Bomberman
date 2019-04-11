let canvas = document.getElementById("cvn");
let context = canvas.getContext("2d");

// let player1 = new Objet("player1.png", 10, 10, 0, 0, 15, 22, 8, true);
let player1 = new Objet("sprites/player1/forward1.png", 10, 10, 0, 0, 32, 48, 8, true);
let map = [];
let walls = []

let wall1 = new Objet("", 0, 0, 0, 0, 800, 0, 0, false);
let wall2 = new Objet("", 800, 0, 0, 0, 0, 600, 0, false);
let wall3 = new Objet("", 0, 600, 0, 0, 800, 0, 0, false);
let wall4 = new Objet("", 0, 0, 0, 0, 0, 600, 0, false);
walls.push(wall1);
walls.push(wall2);
walls.push(wall3);
walls.push(wall4);

// let json = '{ "lvl1" : "000000000000000001010101101010100000000000000000010101011010101000000000000000000101010110101010010101011010101000000000000000000101010110101010000000000000000001010101101010100000000000000000" }';
let json = '{ "lvl1" : "000000000000000001210121121012100000000000000000012101211210121000000000000000000121012113101210012101211210121000000000000000000121012112101210000000000000000001210121121012100000000000000000" }';

let init_map = function(){
    for(let i = 0; i < 12; i++){
        map[i] = [];
        for (let j = 0; j < 16; j++){
            map[i][j] = new Case(null, i, j);
        }
    }
}

let parser= function(pathname){
   /* Parsing de data.json qui renvoie une liste pour l'instant, les blocs */
   let data = JSON.parse(pathname);
   let lvl = data.lvl1;
   let k = 0;
   for(let i=0; i<map.length; i++){
       for (let j = 0; j < map[i].length; j++){
            if(lvl[k]==1){
                block = new Objet("sprites/decor/block.png", j*50, i*50, i, j, 50, 50, 0, false);
                map[i][j].addObj(block);
            }
            if(lvl[k]==2){
                tree = new Objet("sprites/decor/tree.png", j*50, i*50, i, j, 50, 50, 0, true);
                map[i][j].addObj(tree);
            }
            if(lvl[i]==3){
                victory = new Objet("sprites/decor/tree.png", j*50, i*50, i, j, 50, 50, 0, true);
                map[i][j].addObj(victory);
            }
            k++;
        }
   }
}   

let draw = function (){
    let background = new Image();
    background.src = "sprites/decor/map.png";
    context.drawImage(background,0,0);
    map.forEach(tab => {
        tab.forEach(c => {
            let o = c.getObj();
            if (o != null){
                let img = new Image();
                img.src = o.src;
                context.drawImage(img,o.x,o.y,o.width,o.height);
            }
        });
    });

    player = new Image();
    player.src = player1.src;
    // console.log(player1.x +" "+player1.y);
    context.drawImage(player,player1.x,player1.y,player1.width,player1.height);
}

let collision = function(player){
    let pos = {x:-1, y:-1, width:-1, height:-1}
    map.forEach(tab => {
        tab.forEach(c =>{
            if (c.objet != null && player.hasCollision(c.objet)){
                pos = c.objet.getCollision();
            }
        });
    });

    walls.forEach(elem => {
        if(player.hasCollision(elem)) {
            pos = elem.getCollision();
        }
    });

    return pos;
}

let keyboard = function (e) {
    let pos = {x:-1, y:-1, width:-1, height:-1};
    switch (e.keyCode){
        case 90:
            player1.y= player1.y-player1.speed; 
            pos = collision(player1, map);
            if(pos.x !== -1 || pos.y !== -1){
                player1.y = pos.y+pos.height;
            }
            break;
        case 81:
            player1.x= player1.x-player1.speed;
            pos = collision(player1, map);
            if(pos.x !== -1 || pos.y !== -1){
                player1.x = pos.x+pos.width; 
            }
            break;
        case 83:
            player1.y= player1.y+player1.speed;
            pos = collision(player1, map);
            if(pos.x !== -1 || pos.y !== -1){
                player1.y = pos.y-player.height; 
            }
            break;
        case 68:
            player1.x= player1.x+player1.speed;
            pos = collision(player1, map);
            if(pos.x !== -1 || pos.y !== -1){
                player1.x= pos.x-player.width; 
            }
            break;
        case 69:
            // console.log(map);
            let i = player1.getCase[0];
            let j = player1.getCase[1];
            map[i][j].addObj(player1.dropBomb());
    }
};

init_map();
parser(json);
// console.log(block_list);
setInterval(draw,16);
document.addEventListener("keydown", keyboard);