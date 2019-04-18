class Objet {
    constructor(src, x, y, i, j, width, height, speed, sprite, destr){
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
    }

    hasCollision = function(obj){
        if(obj.src==""){
            return(! (obj.x >= this.x + this.width || 
                obj.x + obj.width <= this.x || 
                obj.y >= this.y + this.height || 
                obj.y + obj.height <= this.y) )
        }
        return(! (obj.x >= this.x + this.width || 
            obj.x + obj.width <= this.x || 
            obj.y >= this.y + this.height || 
            obj.y + obj.height <= this.y+(Math.trunc(this.height/2)+1)) )
    }

    getCollision = function(){
        return {x:this.x, y:this.y, width:this.width, height:this.height};
    }

    dropBomb = function(){
        return new Objet("sprites/decor/bomb0.png", (this.j*50)+10, (this.i*50)+10, this.i, this.j, 30, 30, 0, 0, false);
    }

    getCoord = function(){
        return [this.i,this.j];
    }

    updateCoord = function(){
        this.i = Math.trunc((this.y+this.width/2)/50);
        this.j = Math.trunc((this.x+this.height/2)/50);
    }

    isBomb = function(){
        return (this.src == "sprites/decor/bomb0.png" || this.src == "sprites/decor/bomb1.png");
    }

    getSprite = function(val){
        return Math.trunc(this.sprite/val)%2; 
    }
}
