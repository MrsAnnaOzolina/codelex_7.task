document.addEventListener('DOMContentLoaded', () =>{
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
const startGame =document.querySelector<HTMLButtonElement>('.mybutton')
let cardsChosen:string[] = [];
let cardsChoosenId: string[] = [];
let cardsWon:string[] = []; 
// click on the button and start the game

// function that starts the game if we click on start game.
function startGameAgain() {
    cardArray.sort(() => 0.5 - Math.random());
    startGame.style.display = 'none';
    const hideCards =document.querySelector<HTMLButtonElement>('.parent')
    hideCards.style.display = 'inline block';
  
        const parent = document.body.querySelector<HTMLDivElement>(".parent");
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement("div");
            card.classList.add("box");
            card.classList.add("box-"+String((i+1)));
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

function checkForMatch(){
    let cards =document.querySelectorAll<HTMLDivElement>('.box')
    const optionOneId:number= Number(cardsChoosenId[0]);
    const optionTwoId: number= Number(cardsChoosenId[1]);
    if (cardsChosen[0] === cardsChosen[1]){
        cards[optionOneId].style.backgroundColor = 'white';
        cards[optionTwoId].style.backgroundColor = 'white';
        cards[optionOneId].innerHTML = 'You did it';
        cards[optionTwoId].innerHTML = 'You did it';
         cardsWon =[...cardsWon,...cardsChosen];
        
        
    } else{
        cards[optionOneId].style.backgroundColor = '#D9D9D9';
        cards[optionTwoId].style.backgroundColor = '#D9D9D9';
    }
    cardsChosen =[]
    cardsChoosenId = []
    if (cardsWon.length === 6 || cardsWon.length > 6 ){
        const hideCards =document.querySelector<HTMLButtonElement>('.parent')
        const resetGaim =document.querySelector<HTMLButtonElement>('.startButtton')
        hideCards.style.display = 'none';
     startGame.style.display='inline-block';
     resetGaim.innerHTML = "Congradulations, you won! click - to play again"
     resetGaim.style.fontSize =  "32px";
     function removeElements(){
        let cardsss =document.querySelectorAll<HTMLDivElement>('#id')
        for(var i = 0; i < cardsss.length; i++){
            cardsss[i].parentNode.removeChild(cardsss[i]);
        }
    }
     resetGaim.addEventListener('click',() => {
        cardsWon = []
        hideCards.style.display = 'inline block';
     })
    }
}
// flipcard function here:
function flipcard (){
 let cardId = this.getAttribute('id');
cardsChosen.push(cardArray[cardId].name)
 cardsChoosenId.push(cardId);
 document.getElementById(cardId).style.backgroundColor = cardArray[cardId].color
//  if(document.getElementById(cardId).style.backgroundColor === 'white'){

//  }
 if(cardsChosen.length === 2 ){
    setTimeout(checkForMatch, 200)
 } 
}

// createBoard()

})

