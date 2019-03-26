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

    hasCollision = function(player, obj){
        return(! (obj.x >= player.x + player.width || 
            obj.x + obj.width <= player.x || 
            obj.y >= player.y + player.height || 
            obj.y + obj.height <= player.y) )
    }

    getCollision = function(player, obj){
        let pos = {x:-1, y:-1, width:-1, height:-1};
        if(player.hasCollision(obj)) {
            pos = {x:obj.x, y:obj.y, width:obj.width, height:elem.height};
        }
        return pos;
    }
}