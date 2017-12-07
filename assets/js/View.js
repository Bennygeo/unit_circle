var View = function (model) {
    this.model = model;
    this.init();

}

View.prototype = {
    /**
     * 
     */
    init: function () {
        this.createReference().setupHandlers().enable();
    },

    /**
     * 
     */
    createReference: function(){
        return this;
    },

    /**
     * 
     */
    setupHandlers: function(){
        return this;
    },

    /**
     * 
     */
    enable: function(){
        return this;
    }


}