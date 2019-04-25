let canvas = document.getElementById("cvn");
let context = canvas.getContext("2d");
let player1 = new Objet(loadImageToCanvas("sprites/"+classe+"/forward0.png"), 10, 10, 0, 0, 32, 48, 8, 0, true, "player");
let BreakException = {};
let int_id;
let json;
let time = 60;
let map = [];
let walls = [];
let level = 1;


let sprite_tab = forward_tab;

let wall1 = new Objet("", 0, 0, 0, 0, 800, 0, 0, 0,false,"wall");
let wall2 = new Objet("", 800, 0, 0, 0, 0, 600, 0, 0,false,"wall");
let wall3 = new Objet("", 0, 600, 0, 0, 800, 0, 0, 0,false,"wall");
let wall4 = new Objet("", 0, 0, 0, 0, 0, 600, 0, 0,false,"wall");
walls.push(wall1);
walls.push(wall2);
walls.push(wall3);
walls.push(wall4);


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
   let k = 0;
   for(let i=0; i<map.length; i++){
       for (let j = 0; j < map[i].length; j++){
            if(pathname[k]==1){
                block = new Objet(block_sprites, j*50, i*50, i, j, 50, 50, 0, 0, false,"block");
                map[i][j].addObj(block);
            }
            if(pathname[k]==2){
                tree = new Objet(tree_sprites, j*50, i*50, i, j, 50, 50, 0, 0, true,"tree");
                map[i][j].addObj(tree);
            }
            if(pathname[k]==3){
                victory = new Objet(victory_sprites[0], j*50, i*50, i, j, 50, 50, 0, 0, true,"block_victory");
                map[i][j].addObj(victory);
            }
            k++;
        }
   }
}   

let explosion = function(i, j){
    map[i][j].removeObj();
    map[i][j].addObj(new Objet(explosion_sprites[0], j*50, i*50, i, j, 50, 50, 0, 0, false,"explosion"));
    if(player1.inRange(i, j)){return false;}
    if(i-1>=0 && !map[i-1][j].destroy()){
        map[i-1][j].addObj(new Objet(explosion_sprites[3], j*50, (i-1)*50, i-1, j, 50, 50, 0, 0, false,"explosion"));
        if(i-2>=0){
            if(player1.i == i-2 && player1.j == j){return false; }
            else{
                if(!map[i-2][j].destroy()){
                    map[i-1][j].removeObj();
                    map[i-1][j].addObj(new Objet(explosion_sprites[1], j*50, (i-1)*50, i-1, j, 50, 50, 0, 0, false,"explosion"));
                    map[i-2][j].addObj(new Objet(explosion_sprites[3], j*50, (i-2)*50, i-2, j, 50, 50, 0, 0, false,"explosion"));
                }
            }
        }
    }
    
    if(i+1<=11 && !map[i+1][j].destroy()){
        map[i+1][j].addObj(new Objet(explosion_sprites[4], j*50, (i+1)*50, i+1, j, 50, 50, 0, 0, false,"explosion"));
        if(i+2<=11){
            if(player1.i == i+2 && player1.j == j){return false;}
            else{
                if(!map[i+2][j].destroy()){
                    map[i+1][j].removeObj();
                    map[i+1][j].addObj(new Objet(explosion_sprites[1], j*50, (i+1)*50, i+1, j, 50, 50, 0, 0, false,"explosion"));
                    map[i+2][j].addObj(new Objet(explosion_sprites[4], j*50, (i+2)*50, i+2, j, 50, 50, 0, 0, false,"explosion"));
                }
            }
        }
    }
    if(j-1>=0 && !map[i][j-1].destroy()){
        map[i][j-1].addObj(new Objet(explosion_sprites[5], (j-1)*50, i*50, i, j-1, 50, 50, 0, 0, false,"explosion"));
        if(j-2>=0){
            if(player1.i == i && player1.j == j-2){return false;}
            else{
                if(!map[i][j-2].destroy()){
                    map[i][j-1].removeObj();
                    map[i][j-1].addObj(new Objet(explosion_sprites[2], (j-1)*50, i*50, i, j-1, 50, 50, 0, 0, false,"explosion"));
                    map[i][j-2].addObj(new Objet(explosion_sprites[5], (j-2)*50, i*50, i, j-2, 50, 50, 0, 0, false,"explosion"));
                }
            }
        }
    }
    if(j+1<=15 && !map[i][j+1].destroy()){
        map[i][j+1].addObj(new Objet(explosion_sprites[6], (j+1)*50, i*50, i, j+1, 50, 50, 0, 0, false,"explosion"));
        if(j+2<=15){
            if(player1.i == i && player1.j == j+2){return false;}
            else{   
                if(!map[i][j+2].destroy()){
                    map[i][j+1].removeObj();
                    map[i][j+1].addObj(new Objet(explosion_sprites[2], (j+1)*50, i*50, i, j+1, 50, 50, 0, 0, false,"explosion"));
                    map[i][j+2].addObj(new Objet(explosion_sprites[6], (j+2)*50, i*50, i, j+2, 50, 50, 0, 0, false,"explosion"));
                }
            }
        }
    }
    return true;
}

let win = function (){
    clearInterval(int_id);
    document.removeEventListener("keydown", keyboard);

    if(level==2){
        player1.sprite = 0;
        sprite_tab = victory_tab;
        let draw = function(){
            context.drawImage(background_sprites[1],0,0);
            context.drawImage(sprite_tab[player1.sprite],350,200,120,146);
            player1.sprite = (player1.sprite+1)%9;
        }
        setInterval(draw,1000/17);
    }
    else{
        level += 1;
        player1.x = 10;
        player1.y = 10;
        player1.i = 0;
        player1.j = 0;
        player1.sprite = 0;
        main(json[1].level);
    }
}


let loose = function (){
    clearInterval(int_id);
    document.removeEventListener("keydown", keyboard);
    player1.sprite = 0;

    let draw = function(){
        sprite_tab = loose_tab;
        context.drawImage(background_sprites[0],0,0);
        context.drawImage(sprite_tab[player1.sprite],player1.x,player1.y);
        player1.sprite+=1;
        if(player1.sprite==8){
            clearInterval(int_id);
            context.drawImage(background_sprites[2],0,0);
        }
    }
    int_id = setInterval(draw,1000/16);
}

let draw = function (){
    context.drawImage(background_sprites[0],0,0);
    try {
        map.forEach(tab => {
            tab.forEach(c => {
                let o = c.getObj();
                if (o != null){
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

                    context.drawImage(o.src,o.x,o.y,o.width,o.height);
                }
            });
        });
        context.drawImage(sprite_tab[player1.sprite],player1.x,player1.y,player1.width,player1.height);
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
                player1.y = pos.y-player1.height; 
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
                player1.x= pos.x-player1.width; 
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
    init_map();
    parser(json);
    int_id = setInterval(draw,1000/60);
    document.addEventListener("keydown", keyboard);
}

let init = async function(){
    await load_tabs();

    let req = new XMLHttpRequest();
    req.open("get","data.json");
    req.send();
    req.addEventListener("readystatechange",function(e){
        if(req.readyState==4){
            json = JSON.parse(req.responseText);
            main(json[0].level);
        }
    });
}

init();

