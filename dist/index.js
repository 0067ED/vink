(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vink = factory());
}(this, (function () { 'use strict';

var Vink = /** @class */ (function () {
    function Vink() {
    }
    return Vink;
}());

Vink.install = function (VueClass) {
    VueClass.component('v-ink', Vink);
};

return Vink;

})));
//# sourceMappingURL=index.js.map
