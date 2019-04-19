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
                console.log(this.objet.i+" "+this.objet.j);
                this.objet = null;
            }
            return true;
        }
        return false;
    }
}