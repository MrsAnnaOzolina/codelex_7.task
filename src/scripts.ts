document.addEventListener('DOMContentLoaded', () => {
    // Here are all the card we have, 
    // if we want to make more we can add them here
    interface CardArray {
        name: string;
        color: string;
    }
    const cardArray: CardArray[] = [
        {
            name: 'orange card',
            color: 'orange'
        },
        {
            name: 'orange card',
            color: 'orange'
        },
        {
            name: 'yellow card',
            color: 'yellow'
        },
        {
            name: 'yellow card',
            color: 'yellow'
        },
        {
            name: 'green card',
            color: 'green'
        },
        {
            name: 'green card',
            color: 'green'
        }
    ]

    // find the button
    const startGame = document.querySelector<HTMLButtonElement>('.mybutton')
    let cardsChosen: string[] = [];
    let cardsChoosenId: string[] = [];
    let cardsWon: string[] = [];
    let points: number = 0;
    // click on the button and start the game

    // function that starts the game if we click on start game.
    function startGameAgain() {
        cardArray.sort(() => 0.5 - Math.random());
        startGame.style.display = 'none';
        const parent = document.createElement("div");
        parent.classList.add("parent");
        parent.style.display = 'grid';
        const allElements = document.body.querySelector<HTMLDivElement>(".elements");
        allElements.appendChild(parent);
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement("div");
            card.classList.add("box");
            card.classList.add("box-" + String((i + 1)));
            card.setAttribute("id", String(i));
            card.textContent = String([i + 1]);
            // need to add that checks ir clicked element isn't white. 

            card.addEventListener('click', flipcard)

            parent.appendChild(card);
        }
    }

    // click for start the game. 
    startGame?.addEventListener("click", startGameAgain);

    //check for matches 
    function checkForMatch() {
        let cards = document.querySelectorAll<HTMLDivElement>('.box')
        const optionOneId: number = Number(cardsChoosenId[0]);
        const optionTwoId: number = Number(cardsChoosenId[1]);
        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].style.backgroundColor = 'white';
            cards[optionTwoId].style.backgroundColor = 'white';
            cards[optionOneId].innerHTML = 'You did it';
            cards[optionTwoId].innerHTML = 'You did it';
            cards[optionOneId].removeEventListener('click', flipcard)
            cards[optionTwoId].removeEventListener('click', flipcard)
            cardsWon = [...cardsWon, ...cardsChosen];
        } else {
            cards[optionOneId].style.backgroundColor = '#D9D9D9';
            cards[optionTwoId].style.backgroundColor = '#D9D9D9';
            cards[optionOneId].addEventListener('click', flipcard)
            cards[optionTwoId].addEventListener('click', flipcard)
        }
        cardsChosen = []
        cardsChoosenId = []
        //checks if game is over 
        if (cardsWon.length === cardArray.length || cardsWon.length > cardArray.length) {
            //counts points 
            points++;
            window.localStorage.setItem('points', String(points));
            //removed grid and show reset button
            const allCards = document.querySelector<HTMLDivElement>('.parent')
            const resetGaim = document.querySelector<HTMLButtonElement>('.startButtton')
            allCards.remove();
            startGame.style.display = 'grid';
            resetGaim.innerHTML = "Congradulations, you won! click - to play again"
            resetGaim.style.fontSize = "32px";
            resetGaim.addEventListener('click', () => {
                cardsWon = []
            })
        }
    }
    // flipcard function here:
    function flipcard() {
        let cardId = this.getAttribute('id');
        cardsChosen.push(cardArray[cardId].name)
        cardsChoosenId.push(cardId);
        document.getElementById(cardId).style.backgroundColor = cardArray[cardId].color
        //  if(document.getElementById(cardId).style.backgroundColor === 'white'){
        document.getElementById(cardId).removeEventListener('click', flipcard)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 200)

        } else {

        }

    }

})

