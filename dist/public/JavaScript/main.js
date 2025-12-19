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

let game_mode = 0; // 0: "normal" mode; 1: writing mode

// load the new name for the new guess
function loadNewName(){
    // when all the name have been guessed, show points
    if(name_index == names.length){
        $("#points").html(points);
        $("#result").removeClass("hidden");
        return;
    }

    if(game_mode == 0){
        $("#name").html(names[name_index]);
    }else if(game_mode == 1){
        $(".guessable").removeClass("active");
        $("." + names[name_index].toLowerCase()).addClass("active");
    }
    
    // reset guesses
    guesses = 0;
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
    })

    loadNewName();
}

function restart(){
    console.log("restart");

    // reset all variables
    name_index = 0;
    guesses = 0;
    points = 0;

    // hide the result message
    $("#result").addClass("hidden");

    // hide all the names
    $(".guessable").addClass("hidden");
    $(".guessable").removeClass("guessed wrong orange");

    shuffle(names);
    loadNewName();
}

function change_mode(){
    game_mode = (game_mode + 1) % 2;
    console.log("change mode to " + game_mode);

    if(game_mode == 0){
        $(".mode_one").removeClass("hidden");
        $(".mode_two").addClass("hidden");
        $("#change_mode").html("schreib Modus");
        $(".guessable").removeClass("active");
    }else if(game_mode == 1){
        $(".mode_one").addClass("hidden");
        $(".mode_two").removeClass("hidden");
        $("#change_mode").html("tipp Modus");
    }

    restart();
}

function enter_guess(){
    let word = $("#name_input").val();

    if(word.toLowerCase() == names[name_index].toLowerCase()){
        console.log("Congratulations, you guessed correctly");
        // make guessed name visible
        $("."+names[name_index].toLowerCase()).removeClass("hidden");
        $("."+names[name_index].toLowerCase()).addClass("guessed");
        
        if(guesses != 0){
            $("."+names[name_index].toLowerCase()).addClass("orange");
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

    // remove the entered guess from the input field
    $("#name_input").val("");
}

window.onload = function(){
    start_game();

    if(game_mode == 0){
        $(".mode_one").removeClass("hidden");
        $(".mode_two").addClass("hidden");
        $(".guessable").removeClass("active");
    }else if(game_mode == 1){
        $(".mode_one").addClass("hidden");
        $(".mode_two").removeClass("hidden");
    }

    $("#change_mode").on("click", function(e){e.preventDefault();change_mode();})
    $("#new_game").on("click", function(){restart();});
    $("#send_input").on("click", function(){enter_guess();})
    $("#name_input").on("keypress", function(e){
        if(e.which == 13){ // enter pressed
            enter_guess();
        }
    });

    // split guessable td vertical items for vertical text orientation
    $("tr.vertical td.guessable").each(function(){
        this.innerHTML = '<div><span>' + this.innerHTML.split('').join('</span><span>') + '</span></div>';
    });
};