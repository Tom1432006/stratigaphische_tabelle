const names = [
    "Hadaikum",
    "Archaikum",
    "Proterozoikum",
    "Phanerozoikum",
    "Paläozoikum",
    "Mesozoikum",
    "Känozoikum",
    "Kambrium",
    "Ordovizium",
    "Silur",
    "Devon",
    "Karbon",
    "Perm",
    "Trias",
    "Jura",
    "Kreide",
    "Paläogen",
    "Neogen",
    "Quatär"
];

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

// first shuffle the array
shuffle(names);

// Variables for the game
let name_index = 0;
let guesses = 0;
let points = 0;

// load the new name for the new guess
function loadNewName(){
    $("#name").html(names[name_index]);
    
    // reset guesses
    guesses = 0;
    console.log("lng:" + guesses);
}

function start_game(){
    console.log("start game");

    // reset all variables
    name_index = 0;
    guesses = 0;
    points = 0;

    // hide the result message
    $("#result").addClass("hidden");

    // hide all the names
    $(".guessable").addClass("hidden");

    $(".guessable").on("click", function(){
        console.log("sk: " + guesses);
        // make the guess
        let guessed_name = this.id;

        console.log(guessed_name);

        if(guessed_name == names[name_index].toLowerCase()){
            console.log("Congratulations, you guessed correctly");
            // make guessed name visible
            $("."+guessed_name).removeClass("hidden");
            $("."+guessed_name).addClass("guessed");
            
            if(guesses != 0){
                $("."+guessed_name).addClass("orange");
            }

            // add points
            points += 3 - guesses;
            console.log("Current Points: " + points.toString());
            
            // increase name index to load a new name
            name_index+=1;
            loadNewName();
        }else{ // wrong guess
            guesses += 1;
            console.log("wg: " + guesses);

            // after three guesses, reveal the answer and load the new name
            if(guesses == 3){
                $("." + names[name_index].toLowerCase()).removeClass("hidden");
                $("." + names[name_index].toLowerCase()).addClass("guessed");
                $("." + names[name_index].toLowerCase()).off("click"); // remove event handler
                $("." + names[name_index].toLowerCase()).addClass("wrong");

                name_index += 1;
                loadNewName();
            }
        }

        // when all the name have been guessed, show points
        if(name_index == names.length){
            $("#points").html(points);
            $("#result").removeClass("hidden");
        }

        console.log("ek: " + guesses);
    })

    loadNewName();
}

function restart(e){
    console.log("restart");

    // reset all variables
    name_index = 0;
    guesses = 0;
    points = 0;

    // hide the result message
    $("#result").addClass("hidden");

    // hide all the names
    console.log("hide all names please");
    $(".guessable").addClass("hidden");
    $(".guessable").removeClass("guessed wrong orange");
    console.log("hide all names");

    shuffle(names);
    loadNewName();
    e.stopPropagation();
}

window.onload = function(){
    start_game();

    $("#new_game").on("click", function(e){restart(e);});
};