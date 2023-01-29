const assert = require('chai').assert

const Card = require("../week6")

describe("Card test", function() {

    let card = Card;

    it("Check that the card value is returned", function(){
        assert.equal(card.getValue(), 5);
    });
});