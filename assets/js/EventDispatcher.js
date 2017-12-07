
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Event = function (sender) {
    this._sender = sender;
    this._listeners = [];
};

Event.prototype = {
    /*
     * stores the methods
     */
    attach: function (listener) {
        this._listeners.push(listener);
    },

    /*
     * invoke the stored methods
     */
    notify: function (args) {
        for (var i = 0; i < this._listeners.length; i++) {
            this._listeners[i](this._sender, args);
        }
    }
};

