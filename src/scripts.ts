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
            card.addEventListener('click', flipcard, {once:true})
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
                            // set here that you cannot click on more then two cards
                        // let allCardArray: number[]= [0,1,2,3,4,5]
                        // for (let i=0; i<allCardArray.length; i++){
                        //     if (allCardArray[i]=== optionOneId){

                        //     }
                        // }
                            
        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].style.backgroundColor = 'white';
            cards[optionTwoId].style.backgroundColor = 'white';
            cards[optionOneId].removeEventListener('click', flipcard);
            cards[optionTwoId].removeEventListener('click', flipcard);
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
                            updateUI();
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
        let changingcard = document.getElementById(cardId);
        changingcard.style.backgroundColor = cardArray[cardId].color
                        // flipcard transformation
                        // changingcard.style.transition= '0.1s';
                        // changingcard.style.transform= 'rotateY(180deg)';
                        
                        // const hideColor = () => {
                        //     changingcard.style.backgroundColor = cardArray[cardId].color
                        //    }
                        // setTimeout(hideColor, 200);
        
        document.getElementById(cardId).removeEventListener('click', flipcard)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 300)
        } else {

        }

    }
    function updateUI (){
        let values:string[] = [], keys = Object.keys(localStorage), i= keys.length;
        while (i--){values.push(localStorage.getItem(keys[i]));} 
       document.getElementById('showPoints').textContent ="Points: "+values+"";
    }
})

