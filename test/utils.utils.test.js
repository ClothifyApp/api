const {shuffleArray}  = require("../utils/utils");
const { garmentsMock } = require('../utils/mocks/garments');
const { expect } = require('chai');


describe("utils - shuffleArray", function () {

    it("should return array", function () {
        
        const garments = shuffleArray(garmentsMock);
        
        expect(garments).to.be.an('array');    
        
    });


});