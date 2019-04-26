let canvas = document.getElementById("cvn");
let context = canvas.getContext("2d");
let player1 = new Objet(forward_tab[0], 10, 10, 0, 0, 32, 48, 5, 0, true, "player");
let player2 = new Objet(forward_tab[9], 760, 550, 0, 0, 32, 48, 5, 0, true, "player"); 
let BreakException = {};
let draw_seq;
let moove_seq;
let json;
let map = [];
let walls = [];
let commande = {90:false, 81:false, 83:false, 68:false, 69:false, 37:false, 38:false, 39:false, 40:false, 96:false};
let winner;
let sprite_tab = forward_tab;
let sprite_tab2 = backward_tab;

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
            if(pathname[k]==2 || pathname[k]==3){
                tree = new Objet(tree_sprites, j*50, i*50, i, j, 50, 50, 0, 0, true,"tree");
                map[i][j].addObj(tree);
            }
            k++;
        }
   }
}   

let explosion = function(i, j){
    map[i][j].removeObj();
    map[i][j].addObj(new Objet(explosion_sprites[0], j*50, i*50, i, j, 50, 50, 0, 0, false,"explosion"));
    if(player1.inRange(i, j)){winner = player2; return false;}
    if(player2.inRange(i, j)){winner = player1; return false;}
    if(i-1>=0 && !map[i-1][j].destroy()){
        map[i-1][j].addObj(new Objet(explosion_sprites[3], j*50, (i-1)*50, i-1, j, 50, 50, 0, 0, false,"explosion"));
        if(i-2>=0){
            if(player1.i == i-2 && player1.j == j){winner = player2; return false; }
            if(player2.i == i-2 && player2.j == j){winner = player1; return false; }
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
            if(player1.i == i+2 && player1.j == j){winner = player2; return false;}
            if(player2.i == i+2 && player2.j == j){winner = player1; return false;}
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
            if(player1.i == i && player1.j == j-2){winner = player2; return false;}
            if(player2.i == i && player2.j == j-2){winner = player1; return false;}
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
            if(player1.i == i && player1.j == j+2){winner = player2; return false;}
            if(player2.i == i && player2.j == j+2){winner = player1; return false;}
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

let win = function (player){
    clearInterval(draw_seq);
    clearInterval(moove_seq);
    document.removeEventListener("keydown", keyboard);

    player.sprite = 0;
    let draw = function(){
        context.drawImage(background_sprites[1],0,0);
        if(player == player1){context.drawImage(victory_tab[player.sprite],350,200,120,146);}
        else {context.drawImage(victory_tab[player.sprite+9],350,200,120,146);}
        player.sprite = (player.sprite+1)%9;
   }
    setInterval(draw,1000/17);
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
        context.drawImage(sprite_tab[player1.sprite],player1.x,player1.y);
        context.drawImage(sprite_tab2[player2.sprite+9],player2.x,player2.y);
    } catch (e) {
        if (e == BreakException){
            win(winner);
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
    if(player==player1){
        if(player.hasCollision(player2)){
            pos = player2.getCollision();
        }
    }
    else{
        if(player.hasCollision(player1)){
            pos = player1.getCollision();
        }
    }

    return pos;
}

let moove = function () {
    let pos;
    if(commande[90]){
        player1.sprite = (player1.sprite+1)%8;
        sprite_tab = backward_tab;
        player1.y= player1.y-player1.speed; 
        pos = collision(player1, map);
        if(pos.win == 2){
            win(player2);
        }
        else if(pos.x !== -1 || pos.y !== -1){
            player1.y = pos.y + Math.trunc(pos.height/2) + 1
        }
        player1.updateCoord();
    }
    if(commande[81]){
        player1.sprite = (player1.sprite+1)%8;
        sprite_tab = left_tab;
        player1.x= player1.x-player1.speed;
        pos = collision(player1, map);
        if(pos.win == 2){
            win(player2);
        }
        else if(pos.x !== -1 || pos.y !== -1){
            player1.x = pos.x+pos.width; 
        }
        player1.updateCoord();
    }
    if(commande[83]){
        player1.sprite = (player1.sprite+1)%8;
        sprite_tab = forward_tab;
        player1.y= player1.y+player1.speed;
        pos = collision(player1, map);
        if(pos.win == 2){
            win(player2);
        }
        else if(pos.x !== -1 || pos.y !== -1){
            player1.y = pos.y-player1.height; 
        }
        player1.updateCoord();
    }
    if(commande[68]){
        player1.sprite = (player1.sprite+1)%8;
        sprite_tab = right_tab;
        player1.x= player1.x+player1.speed;
        pos = collision(player1, map);
        if(pos.win == 2){
            win(player2);
        }
        else if(pos.x !== -1 || pos.y !== -1){
            player1.x= pos.x-player1.width; 
        }
        player1.updateCoord();
    }
    if(commande[69]){
        let i = player1.getCoord()[0];
        let j = player1.getCoord()[1];
        if (map[i][j].getObj() == null){
            map[i][j].addObj(player1.dropBomb());
        }
    }
    if(commande[38]){
        player2.sprite = (player2.sprite+1)%8;
        sprite_tab2 = backward_tab;
        player2.y= player2.y-player2.speed; 
        pos = collision(player2, map);
        if(pos.win == 2){
            win(player1);
        }
        else if(pos.x !== -1 || pos.y !== -1){
            player2.y = pos.y + Math.trunc(pos.height/2) + 1
        }
        player2.updateCoord();
    }
    if(commande[37]){
        player2.sprite = (player2.sprite+1)%8;
        sprite_tab2 = left_tab;
        player2.x= player2.x-player2.speed;
        pos = collision(player2, map);
        if(pos.win == 2){
            win(player1);
        }
        else if(pos.x !== -1 || pos.y !== -1){
            player2.x = pos.x+pos.width; 
        }
        player2.updateCoord();
    }
    if(commande[40]){
        player2.sprite = (player2.sprite+1)%8;
        sprite_tab2 = forward_tab;
        player2.y= player2.y+player2.speed;
        pos = collision(player2, map);
        if(pos.win == 2){
            win(player1);
        }
        else if(pos.x !== -1 || pos.y !== -1){
            player2.y = pos.y-player2.height; 
        }
        player2.updateCoord();
    }
    if(commande[39]){
        player2.sprite = (player2.sprite+1)%8;
        sprite_tab2 = right_tab;
        player2.x= player2.x+player2.speed;
        pos = collision(player2, map);
        if(pos.win == 2){
            win(player1);
        }
        else if(pos.x !== -1 || pos.y !== -1){
            player2.x= pos.x-player2.width; 
        }
        player2.updateCoord();
    }
    if(commande[96]){
        let i = player2.getCoord()[0];
        let j = player2.getCoord()[1];
        if (map[i][j].getObj() == null){
            map[i][j].addObj(player2.dropBomb());
        }
    }
};

let keyboard= function (e){
    if(e.keyCode in commande){
        commande[e.keyCode] = true;
    }
}

let stop = function(e){
    if(e.keyCode in commande){
        commande[e.keyCode] = false;
    }   
}

let start = function(json){
    init_map();
    parser(json);
    draw_seq = setInterval(draw,1000/60);
    moove_seq = setInterval(moove,1000/30);
    document.addEventListener("keydown", keyboard);
    document.addEventListener("keyup", stop);
}

let main = async function(){
    await load_tabs();

    let req = new XMLHttpRequest();
    req.open("get","data.json");
    req.send();
    req.addEventListener("readystatechange",function(e){
        if(req.readyState==4){
            json = JSON.parse(req.responseText);
            start(json[0].level);
        }
    });
}

main();

