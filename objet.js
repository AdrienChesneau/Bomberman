
class Objet {
    constructor(src, x, y, i, j, width, height, speed, sprite, destr, type){
        Object.defineProperty(this, "src", {value : src, writable : true});
        Object.defineProperty(this, "x", {value : x, writable : true});
        Object.defineProperty(this, "y", {value : y, writable : true});
        Object.defineProperty(this, "i", {value : i, writable : true});
        Object.defineProperty(this, "j", {value : j, writable : true});
        Object.defineProperty(this, "width", {value : width, writable : false});
        Object.defineProperty(this, "height", {value : height, writable : false});
        Object.defineProperty(this, "speed", {value : speed, writable : false});
        Object.defineProperty(this, "sprite", {value : sprite, writable : true});
        Object.defineProperty(this, "destr", {value : destr, writable : false});
        Object.defineProperty(this, "type", {value : type, writable : false});
    }

    hasCollision = function(obj){
        if(obj.type=="wall"){
            return(! (obj.x >= this.x + this.width || 
                obj.x + obj.width <= this.x || 
                obj.y >= this.y + this.height || 
                obj.y + obj.height <= this.y) )
        } else if (obj.type == "bomb") { 
            return false; 
        } else if(obj.type=="player"){
            return(! (obj.x >= this.x + this.width || 
                obj.x + obj.width <= this.x || 
                obj.y >= this.y + this.height || 
                obj.y + obj.height <= this.y) )
        } else {
            return(! (obj.x >= this.x + this.width || 
            obj.x + obj.width <= this.x || 
            obj.y >= this.y + this.height || 
            obj.y + obj.height <= this.y+(Math.trunc(this.height/2)+1)) )
        }
    }

    getCollision = function(){
        if(this.type=="victory"){
            return {x:this.x, y:this.y, width:this.width, height:this.height, win:1};
        }
        else if(this.type=="explosion"){
            return {x:this.x, y:this.y, width:this.width, height:this.height, win:2};
        }
        return {x:this.x, y:this.y, width:this.width, height:this.height, win:0};
    }

    dropBomb = function(){
        return new Objet(sprites_bomb[0], (this.j*50)+10, (this.i*50)+10, this.i, this.j, 30, 30, 0, 0, false,"bomb");
    }

    getCoord = function(){
        return [this.i,this.j];
    }

    updateCoord = function(){
        this.i = Math.trunc((this.y+this.width/2)/50);
        this.j = Math.trunc((this.x+this.height/2)/50);
    }

    isBomb = function(){
        return (this.type=="bomb");
    }

    isExplosion = function(){
        return (this.type=="explosion");
    }

    getSprite = function(val){
        return Math.trunc(this.sprite/val)%2; 
    }

    inRange = function(i, j){
        return ( 
        (this.i == i && this.j == j) || 
        (this.i == i+1 && this.j == j) ||
        (this.i == i-1 && this.j == j) ||
        (this.i == i && this.j == j+1) ||
        (this.i == i && this.j == j-1) );
    }
}