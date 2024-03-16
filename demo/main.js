"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Solid_animal_1 = require("./Solid_animal");
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.solve = function () {
        (0, Solid_animal_1.animalMain)();
    };
    return Main;
}());
new Main().solve();
