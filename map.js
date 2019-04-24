let canvas = document.getElementById("cvn");
let context = canvas.getContext("2d");
let url = document.location.href;
let classe = url.substr(url.lastIndexOf("player=")+7);
let player1 = new Objet("sprites/"+classe+"/forward0.png", 10, 10, 0, 0, 32, 48, 8, 0, true);
let BreakException = {};
let int_id;
let draw_seq;
let time = 100000;
let map = [];
let walls = [];
let forward_tab = [];
let backward_tab = [];
let left_tab = [];
let right_tab = [];
let loose_tab = [];
let victory_tab = [];
let level = 1;
for(let i=0; i<9; i++){
    forward_tab.push("sprites/"+classe+"/forward"+i+".png");
    backward_tab.push("sprites/"+classe+"/backward"+i+".png");
    left_tab.push("sprites/"+classe+"/left"+i+".png");
    right_tab.push("sprites/"+classe+"/right"+i+".png");
    loose_tab.push("fall"+i+".png");
    victory_tab.push("sprites/"+classe+"/victory"+i+".png");
}
let sprite_tab = forward_tab;

let sprites_bomb = ["sprites/decor/bomb0.png", "sprites/decor/bomb1.png"];

let wall1 = new Objet("", 0, 0, 0, 0, 800, 0, 0, false);

let wall2 = new Objet("", 800, 0, 0, 0, 0, 600, 0, false);
let wall3 = new Objet("", 0, 600, 0, 0, 800, 0, 0, false);
let wall4 = new Objet("", 0, 0, 0, 0, 0, 600, 0, false);
walls.push(wall1);
walls.push(wall2);
walls.push(wall3);
walls.push(wall4);

let level1 = '{ "lvl1" : "000000000000000001210121121012100000000000000000012101211210121000000000000000000121012112101210012101211310121000000000000000000121012112101210000000000000000001210121121012100000000000000000" }';
let level2 = '{ "lvl1" : "012101211310121000000000000000000121012112101210000000000000000001210121121012100000000000000000000000000000000001210121121012100000000000000000012101211210121000000000000000000121012112101210" }';

/*let json;
var requestURL= 'http://localhost::9000.com';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    json = request.response;
}*/

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
                block = new Objet("sprites/decor/block.png", j*50, i*50, i, j, 50, 50, 0, 0, false);
                map[i][j].addObj(block);
            }
            if(lvl[k]==2){
                tree = new Objet("sprites/decor/tree.png", j*50, i*50, i, j, 50, 50, 0, 0, true);
                map[i][j].addObj(tree);
            }
            if(lvl[k]==3){
                victory = new Objet("sprites/decor/victory0.png", j*50, i*50, i, j, 50, 50, 0, 0, true);
                map[i][j].addObj(victory);
            }
            k++;
        }
   }
}   

let explosion = function(i, j){
    map[i][j].removeObj();
    map[i][j].addObj(new Objet("sprites/decor/explosion0.png", j*50, i*50, i, j, 50, 50, 0, 0, false));
    if(player1.inRange(i, j)){return false;}
    if(i-1>=0 && !map[i-1][j].destroy()){
        map[i-1][j].addObj(new Objet("sprites/decor/explosion2_u.png", j*50, (i-1)*50, i-1, j, 50, 50, 0, 0, false));
        if(i-2>=0){
            if(player1.i == i-2 && player1.j == j){return false; }
            else{
                if(!map[i-2][j].destroy()){
                    map[i-1][j].removeObj();
                    map[i-1][j].addObj(new Objet("sprites/decor/explosion1_h.png", j*50, (i-1)*50, i-1, j, 50, 50, 0, 0, false));
                    map[i-2][j].addObj(new Objet("sprites/decor/explosion2_u.png", j*50, (i-2)*50, i-2, j, 50, 50, 0, 0, false));
                }
            }
        }
    }
    
    if(i+1<=11 && !map[i+1][j].destroy()){
        map[i+1][j].addObj(new Objet("sprites/decor/explosion2_d.png", j*50, (i+1)*50, i+1, j, 50, 50, 0, 0, false));
        if(i+2<=11){
            if(player1.i == i+2 && player1.j == j){return false;}
            else{
                if(!map[i+2][j].destroy()){
                    map[i+1][j].removeObj();
                    map[i+1][j].addObj(new Objet("sprites/decor/explosion1_h.png", j*50, (i+1)*50, i+1, j, 50, 50, 0, 0, false));
                    map[i+2][j].addObj(new Objet("sprites/decor/explosion2_d.png", j*50, (i+2)*50, i+2, j, 50, 50, 0, 0, false));
                }
            }
        }
    }
    if(j-1>=0 && !map[i][j-1].destroy()){
        map[i][j-1].addObj(new Objet("sprites/decor/explosion2_l.png", (j-1)*50, i*50, i, j-1, 50, 50, 0, 0, false));
        if(j-2>=0){
            if(player1.i == i && player1.j == j-2){return false;}
            else{
                if(!map[i][j-2].destroy()){
                    map[i][j-1].removeObj();
                    map[i][j-1].addObj(new Objet("sprites/decor/explosion1_w.png", (j-1)*50, i*50, i, j-1, 50, 50, 0, 0, false));
                    map[i][j-2].addObj(new Objet("sprites/decor/explosion2_l.png", (j-2)*50, i*50, i, j-2, 50, 50, 0, 0, false));
                }
            }
        }
    }
    if(j+1<=15 && !map[i][j+1].destroy()){
        map[i][j+1].addObj(new Objet("sprites/decor/explosion2_r.png", (j+1)*50, i*50, i, j+1, 50, 50, 0, 0, false));
        if(j+2<=15){
            if(player1.i == i && player1.j == j+2){return false;}
            else{   
                if(!map[i][j+2].destroy()){
                    map[i][j+1].removeObj();
                    map[i][j+1].addObj(new Objet("sprites/decor/explosion1_w.png", (j+1)*50, i*50, i, j+1, 50, 50, 0, 0, false));
                    map[i][j+2].addObj(new Objet("sprites/decor/explosion2_r.png", (j+2)*50, i*50, i, j+2, 50, 50, 0, 0, false));
                }
            }
        }
    }
    return true;
}

let win = function (){
    clearInterval(int_id);
    document.removeEventListener("keydown", keyboard);
    context.clearRect(0,0,canvas.width,canvas.height);
    if(level==2){
        player1.sprite = 0;
        sprite_tab = victory_tab;
        let draw = function(){
            context.clearRect(0,0,canvas.width,canvas.height);
            let background = new Image();
            let player = new Image();
            background.src = "sprites/"+classe+"/win.png";
            player.src = sprite_tab[player1.sprite];
            context.drawImage(background,0,0);
            context.drawImage(player,350,200,120,146);
            player1.sprite = (player1.sprite+1)%9;
        }
        setInterval(draw,1000/17);
    }
    else{
        level += 1;
        main(level2);
    }
}


let loose = function (){
    clearInterval(int_id);
    document.removeEventListener("keydown", keyboard);
    context.clearRect(0,0,canvas.width,canvas.height);
    let v = new Image();
    v.onload = function(){context.drawImage(v,0,0);};
    v.src = "sprites/"+classe+"/loose.png";
}

let draw = function (){
    context.clearRect(0,0,canvas.width,canvas.height);
    background = new Image();
    player = new Image();
    player.src = sprite_tab[player1.sprite];
    background.src = "sprites/decor/map.png";
    context.drawImage(background,0,0);
    try {
        map.forEach(tab => {
            tab.forEach(c => {
                let o = c.getObj();
                if (o != null){
                    let img = new Image();
                    if (o.isBomb()) {   
                        o.sprite = o.sprite + 1;
                        if (o.sprite == 180) {
                            if (!explosion(o.i, o.j)){ throw BreakException;} 
                        } else {
                            if (o.sprite%20 == 0) {
                                o.src = sprites_bomb[o.getSprite(20)];
                            }
                        }
                    }
                    if(o.isExplosion()){
                        if(o.sprite == 20){
                            map[o.i][o.j].removeObj();
                        }
                        o.sprite+=1;
                    }
                    img.src = o.src;

                    context.drawImage(img,o.x,o.y,o.width,o.height);
                }
            });
        });
        context.drawImage(player,player1.x,player1.y,player1.width,player1.height);
        time = time-0.016; 
        document.getElementById('timer').innerHTML =Math.round(time);
        if(time<0){
            throw BreakException;
        }

    } catch (e) {
        if (e == BreakException){
            loose();
        }
    }
}

let collision = function(player){
    let pos = {x:-1, y:-1, width:-1, height:-1, win:0};
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
            player1.sprite = (player1.sprite+1)%8;
            sprite_tab = backward_tab;
            player1.y= player1.y-player1.speed; 
            pos = collision(player1, map);
            if(pos.win==1){
                win();
            }
            else if(pos.win == 2){
                loose();
            }
            else if(pos.x !== -1 || pos.y !== -1){
                player1.y = pos.y + Math.trunc(pos.height/2) + 1
            }
            player1.updateCoord();
            break;
        case 81:
            player1.sprite = (player1.sprite+1)%8;
            sprite_tab = left_tab;
            player1.x= player1.x-player1.speed;
            pos = collision(player1, map);
            if(pos.win==1){
                win();
            }
            else if(pos.win == 2){
                loose();
            }
            else if(pos.x !== -1 || pos.y !== -1){
                player1.x = pos.x+pos.width; 
            }
            player1.updateCoord();
            break;
        case 83:
            player1.sprite = (player1.sprite+1)%8;
            sprite_tab = forward_tab;
            player1.y= player1.y+player1.speed;
            pos = collision(player1, map);
            if(pos.win==1){
                win();
            }
            else if(pos.win == 2){
                loose();
            }
            else if(pos.x !== -1 || pos.y !== -1){
                player1.y = pos.y-player.height; 
            }
            player1.updateCoord();
            break;
        case 68:
            player1.sprite = (player1.sprite+1)%8;
            sprite_tab = right_tab;
            player1.x= player1.x+player1.speed;
            pos = collision(player1, map);
            if(pos.win==1){
                win();
            }
            else if(pos.win == 2){
                loose();
            }
            else if(pos.x !== -1 || pos.y !== -1){
                player1.x= pos.x-player.width; 
            }
            player1.updateCoord();
            break;
        case 69:
            // console.log(map);
            let i = player1.getCoord()[0];
            let j = player1.getCoord()[1];
            //console.log(i + " " + j);
            if (map[i][j].getObj() == null){
                map[i][j].addObj(player1.dropBomb());
            }
    }
};

let main = function(json){
    player1.x = 10;
    player1.y = 10;
    player1.i = 0;
    player1.j = 0;
    init_map();
    parser(json);
    int_id = setInterval(draw,1000/60);
    document.addEventListener("keydown", keyboard);
}

main(level1);