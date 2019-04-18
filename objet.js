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
        return(! (obj.x >= this.x + this.width || 
            obj.x + obj.width <= this.x || 
            obj.y >= this.y + this.height || 
            obj.y + obj.height <= this.y+(Math.trunc(this.height/2)+1)) )
    }

    getCollision = function(){
        return {x:this.x, y:this.y, width:this.width, height:this.height};
    }

    dropBomb = function(){
        return new Objet("bomb.png", (this.i*75)-2, (this.j*75)-2, this.i, this.j, 4, 4, 0, false);
    }

    getCoord = function(){
        return [this.i,this.j];
    }
}