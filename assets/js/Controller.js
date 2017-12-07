var Controller = function (model, view) {
    this.model = model;
    this.view = view;
    this.init();

}

Controller.prototype = {
    /**
     * 
     */
    init: function () {
        this.createReference().setupHandlers().enable();
    },

    /**
     * 
     */
    createReference: function () {
        return this;
    },

    /**
     * 
     */
    setupHandlers: function () {
        return this;
    },

    /**
     * 
     */
    enable: function () {
        return this;
    }


}