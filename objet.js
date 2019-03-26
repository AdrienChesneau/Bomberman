class Objet {
    constructor(src, x, y, width, height, speed, destr){
        Object.defineProperty(this, "src", {value : src, writable : true});
        Object.defineProperty(this, "x", {value : x, writable : true});
        Object.defineProperty(this, "y", {value : y, writable : true});
        Object.defineProperty(this, "width", {value : width, writable : false});
        Object.defineProperty(this, "height", {value : height, writable : false});
        Object.defineProperty(this, "speed", {value : speed, writable : false});
        Object.defineProperty(this, "destr", {value : destr, writable : false});
    }

    hasCollision = function(obj){
        return(! (obj.x >= this.x + this.width || 
            obj.x + obj.width <= this.x || 
            obj.y >= this.y + this.height || 
            obj.y + obj.height <= this.y) )
    }

    getCollision = function(){
        return {x:this.x, y:this.y, width:this.width, height:this.height};
    }
}