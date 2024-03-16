"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalMain = void 0;
var Animal = /** @class */ (function () {
    function Animal(_a) {
        var name = _a.name, sound = _a.sound;
        this.name = name;
        this.sound = sound;
    }
    Animal.prototype.shout = function () {
        console.log(this.sound);
    };
    return Animal;
}());
var AnimalRepository = /** @class */ (function () {
    function AnimalRepository() {
        this.animals = [];
    }
    AnimalRepository.prototype.addAnimal = function (animal) {
        this.animals.push(animal);
    };
    AnimalRepository.prototype.getAnimals = function () {
        return this.animals;
    };
    return AnimalRepository;
}());
var Farm = /** @class */ (function () {
    function Farm(animalRepository) {
        this.animalRepository = animalRepository;
    }
    Farm.prototype.addAnimal = function (animal) {
        this.animalRepository.addAnimal(animal);
    };
    Farm.prototype.getAnimals = function () {
        return this.animalRepository.getAnimals();
    };
    return Farm;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(_a) {
        var name = _a.name, sound = _a.sound;
        return _super.call(this, { name: name, sound: sound }) || this;
    }
    return Cat;
}(Animal));
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(_a) {
        var name = _a.name, sound = _a.sound;
        return _super.call(this, { name: name, sound: sound }) || this;
    }
    return Dog;
}(Animal));
var animalMain = function () {
    var animalRepository = new AnimalRepository();
    var farm_1 = new Farm(animalRepository);
    var cat_1 = new Cat({ name: "Mee", sound: "Meo" });
    var dog_1 = new Dog({ name: "Juu", sound: "Grw" });
    farm_1.addAnimal(cat_1);
    farm_1.addAnimal(dog_1);
    farm_1.getAnimals().forEach(function (animal) {
        animal.shout();
    });
};
exports.animalMain = animalMain;
