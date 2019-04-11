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
}