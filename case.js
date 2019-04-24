class Case {
    constructor(obj, i, j){
        Object.defineProperty(this, "objet", {value : obj, writable : true});
        Object.defineProperty(this, "i", {value : i, writable : false});
        Object.defineProperty(this, "j", {value : j, writable : false});    
    }

    addObj = function(o){
        this.objet = o;
    }

    removeObj = function(){
        this.objet = null;
    }

    getObj = function(){
        return this.objet;
    }

    destroy = function(){
        if (this.objet != null){
            if(this.objet.destr){
                if(this.objet.src == "sprites/decor/victory0.png"){
                    victory = new Objet("sprites/decor/victory1.png", this.objet.x, this.objet.y, this.objet.i, this.objet.j, 50, 50, 0, 0, false);
                    map[victory.i][victory.j].removeObj();
                    map[victory.i][victory.j].addObj(victory);
                }
                else{this.objet = null;}
            }
            return true;
        }
        return false;
    }
}