const allTypes=[
    "normal","fire","water","electric","grass","ice",
    "fighting","poison","ground","flying","psychic",
    "bug","rock","ghost","dragon","dark","steel","fairy"
];
let score=0;
let currentQuestion=1;
const progresssBar= document.getElementById("progressBar");
const pokeball=document.getElementById("pokiball");
//fetch pokemon img using api
let correctType= "";
async function getPokemon() {
const randomId=Math.floor(Math.random()*1025)+1;
const response= await fetch(
    `https://pokeapi.co/api/v2/pokemon/${randomId}`
);
const data= await response.json();
const pokemonImage=document.getElementById("pokemonImage");
pokemonImage.src=data.sprites.other["official-artwork"].front_default;
correctType= data.types[0].type.name;
generateOptions();
}
getPokemon();

//display options
const optionButtons=document.querySelectorAll(".optionBtn");
function generateOptions() {
    let options=[correctType];
    while(options.length<4) {
        let randomType=allTypes[Math.floor(Math.random()*allTypes.length)];
        if(!options.includes(randomType)) {
            options.push(randomType);
        }
    }
    options.sort(() => Math.random()-0.5);
    optionButtons.forEach((button,index) => {
        button.textContent=options[index];
        button.disabled=false;
    });
}

optionButtons.forEach(button => {
    button.addEventListener("click", checkAnswer);
});
function checkAnswer(event) {
    const selectedAnswer=event.target.textContent.toLowerCase();
    if(selectedAnswer===correctType) {
        score++;
        scoreText.textContent="Score: " +score;
    }
    optionButtons.forEach(button => {
        button.disabled=true;
    });
    currentQuestion++;
    progresssBar.style.width=`${((currentQuestion-1) /10 ) *100 }%`;
    pokeball.style.left=`${((currentQuestion-1) /10 ) *100}%`;

    if(currentQuestion<=10) {
        questionText.textContent= `Question ${currentQuestion} /10`;
        setTimeout(() => {
            getPokemon();
        }, 700);
    } else {
        alert(`Quiz Completed!
            Your Score: ${score}/10`);
            let accuracy=Math.round((score/10)*100);
        let previousScores=JSON.parse(localStorage.getItem("scores")) || [];
        previousScores.push({
           score: score,
           total: 10,
           date: new Date().toLocaleDateString(),
           accuracy: accuracy+"%"
    });
        localStorage.setItem("scores",JSON.stringify(previousScores));
        window.location.href="scores.html";
    }
}

const scoreText=document.getElementById("score");
const questionText=document.getElementById("questionText");

//back button
const backBtn=document.getElementById("backBtn");
backBtn.addEventListener("click", function() {
    window.location.href="index.html";
});



