"use strict";
$( document ).ready(function() {
    console.log( "ready!" );

var shows = ["Arrested Development", "Parks and Recreation", "Peep Show", "Aqua Teen Hunger Force"];

function displayShowGIFS() {
    $("#gifs-display").empty();
    var show = $(this).attr("data-name"); //get text value of button pressed
    show=show.replace(/ /g,"_"); //replace spaces in the name with underscores (the API needs this)
    var limit = 10; //how many gifs to display 
    var apiKey = "dc6zaTOxFJmzC"; // my API key
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${show}&limit=${limit}&lang=en`; // query URL to use

    console.log(`using URL ${queryURL}`)

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log("completed AJAX request");
        for (var i = 0; i <=response.data.length;i++){

       
        var src = JSON.stringify(response.data[i].images.fixed_height_downsampled.url);
        console.log(`src is ${src}`)
      $("#gifs-display").append(`<img src=${src}>`);
      console.log(`<img src=${src}>`);
        };
      renderButtons();

       
    });
  }

      function renderButtons() {
        // Deleting the show buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#gifs-view").empty();
        // Looping through the array of shows to make a button for each
        for (var i = 0; i < shows.length; i++) {
          var a = $("<button>");
          a.addClass("show");
          a.attr("data-name", shows[i]);
          a.text(shows[i]);
          $("#gifs-view").append(a);  // add the button to the HTML with jQuery
        }
      }

      // when the add button is clicked
      $("#add-show").on("click", function(event) {
        // prevents the form from trying to submit itself and reload the page
        event.preventDefault();
        var show = $("#show-input").val().trim(); // get text from the input box
        shows.push(show); // add it to the show array
        renderButtons(); //re-render the buttons
      });
    

    // handles what happens when someone clicks a show title button (runs the ajax function)
    $(document).on("click", ".show", displayShowGIFS);

    $("#clear").on("click",function(event2){
        event2.preventDefault();
        $("#gifs-display").empty();
    })
    
      renderButtons(); //call render buttons to have some default buttons displayed when the page loads
    });