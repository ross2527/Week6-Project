class Card {
    value; 

    constructor(value){
    this.value = value;
    }


    getValue() {
        return this.value;
    }
}

class game {
    // create 2 players taking in their names
    // divide out the 26 cards in between
    // start the game
    // have it ask player 1 "What card do you want to play"
    // then have it ask player 2 "What card do you want to play"
    // after that it will tell the players which player got the point then store each point

    // Turn instructions; "Ask player 1 what card do you want to play" then ask player 2, 
    // then it will compare each players cards
    // The player with the higher score will have their score incremented 
    // List the scores out after each turn
    // Repeats until all cards are used up
    // Then compare players scores then list which player won and their score

    // condition to end the game is a player is out of cards

    constructor(player1Name, player2Name) {

        this.player1Name = player1Name;
        this.player2Name = player2Name;
       

    }

    createGame() {
        let pick = null

        while (pick !== "QUIT") {

            pick = prompt("would you like play a game of war with players" + this.player1name + "and" + this.player2name + "? Y for Yes, QUIT for quit.")
            
            this.Deck = [];
            this.deck1 = [];
            this.deck2 = [];

            this.createDeck();

            this.splitDeck();

            this.player1 = new Player(this.player1Name, this.deck1)
            this.player2 = new Player(this.player2Name, this.deck2)

            this.playGame();
        }
    }

    createDeck() {

        for (let i = 0; i < 4; i++) {
            for (let i = 1; i < 14; i++) {
                this.Deck.push(new Card(i))
            }
        }

    }

    splitDeck() {

        for (let i = 0; i < 26; i++) {
            let num = getRandomInt(this.Deck.length)
            let currCard = this.Deck[num]
            this.deck1.push(currCard)
            this.Deck.splice(num, 1)

        }
        for (let i = 0; i < 26; i++) {
            let num = getRandomInt(this.Deck.length)
            let currCard = this.Deck[num]
            this.deck2.push(currCard)
            this.Deck.splice(num, 1)

        }

    }

    playGame() {

        while ( (this.player1.getHandSize() !== 0) && (this.player2.getHandSize() !== 0) ) {
            let player1Card = this.player1.getCard();
            let player2Card = this.player2.getCard();

            if (player1Card.getValue() > player2Card.getValue()) {
                this.player1.addCardToDeck(player2Card)
            }
            else if (player1Card.getValue() < player2Card.getValue()) {
                this.player2.addCardToDeck(player1Card)
            }
            else {
                this.playWar();
            }

        }

        if(this.player1.getHandSize() === 0) {
            console.log(this.player1.getName() + " has lost the game. " + this.player2.getName() + " congrats you've won!\n Player 1 cards: " + this.player1.getCards() + "\n Player 2 cards: " + this.player2.getCards())
        }
        else {
            console.log(this.player2.getName() + " has lost the game. " + this.player1.getName() + " congrats you've won!\n Player 1 cards: " + this.player1.getCards() + "\n Player 2 cards: " + this.player2.getCards())
        }


    }

    playWar() {

        let war = true;
        let player1Cards = [];
        let player2Cards = [];

        while (war) {

            for (let i = 0; i < 3; i++) {
                player1Cards.push(this.player1.getCard());
            }
            for (let i = 0; i < 3; i++) {
                player2Cards.push(this.player2.getCard());
            }

            let player1Card = this.player1.getCard();
            let player2Card = this.player2.getCard();

            if (player1Card === null || player2Card === null) {
                break;
            }
    

            if (player1Card.getValue() > player2Card.getValue()) {
                
                for (let i = 0; i < player1Cards.length; i++) {
                    let currCard = player1Cards[i]
                    this.player1.addCardToDeck(currCard)
                }
            

                for (let i = 0; i < player2Cards.length; i++) {
                    let currCard = player2Cards[i]
                    this.player1.addCardToDeck(currCard)  
                } 

                this.player1.addCardToDeck(player1Card);
                this.player1.addCardToDeck(player2Card);

                war = false
            }

            else if (player1Card.getValue() < player2Card.getValue()) {
                
                for (let i = 0; i < player1Cards.length; i++) {
                    let currCard = player1Cards[i]
                    this.player2.addCardToDeck(currCard)
                }
            

                for (let i = 0; i < player2Cards.length; i++) {
                    let currCard = player2Cards[i]
                    this.player2.addCardToDeck(currCard)  
                } 

                this.player2.addCardToDeck(player1Card);
                this.player2.addCardToDeck(player2Card);

                war = false
            }
            else {
                
                player1Cards.push(player1Card);
                player2Cards.push(player2Card);
            }


        }

    }

}

class Player {

    name;
    cards;

    constructor(name, cards) {
        this.name = name
        this.cards = cards;
    }

    getCards() {
        return this.cards;
    }

    getName(){
        return this.name;
    }

    getCard() {
        // Player will enter value
        // Check if cards contain a card with that value
        // If yes, play card
        // If no, tell player "Card is unavailable"

        if (this.cards.length === 0){
            console.log("No cards are left\n")
            return null;
        }
        else {
        let cardNum =  getRandomInt(this.cards.length)

        let card = this.cards[cardNum]

        this.removeCardFromDeck(cardNum)

        return card;
        }

    }

    removeCardFromDeck(index) {

        this.cards.splice(index, 1)
    }

    addCardToDeck(card) {
        this.cards.push(card)
    }

    getHandSize() {
        return this.cards.length;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);

}

name1 = prompt("What is player 1's name?")
name2 = prompt("What is player 2's name?")

game1 = new game(name1, name2);

game1.createGame();

let card = new Card()

module.exports = card;