// Global variables: Initial array of topics ----------------------------------------------------------------------

var topics = ["Sea turtle", "Spinner dolphin", "Lanikai Hawaii", "Oahu", "Maui", "Kauai waterfalls", "Hawaii surfing", "Kilauea lava flow"];

// Functions ------------------------------------------------------------------------------------------------------

// Display the appropriate content using displaySearchInfo function to re-render the HTML
function displaySearchInfo() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=D4Z98APNkOv11SGew7wHNFGJ2ZcULCta&limit=10";
    console.log(queryURL);

    // Creating an AJAX call for the specific search button being clicked
    $.ajax({
        url: queryURL, method: "GET"
    }).then(function (response) {
        console.log(response);

        for (var i = 0; i < response.data.length; i++) {
            // Creating a div to hold the topic
            var searchDiv = $("<div class='topic'>");

            // Storing the rating data
            var gifRating = response.data[i].rating;
            var pOne = $("<p>").text("Rating: " + gifRating);
            searchDiv.append(pOne);

            // Retrieving the URL for the image
            var imgURL = response.data[i].images.original.url;
            var image = $("<img>").attr("src", imgURL);
            searchDiv.append(image);

            // Putting the entire topic above the previous topics
            $("#gifs-view").prepend(searchDiv);
        }
    });
}

// Function for displaying topic data
function renderButtons() {
    // Deleting the topics prior to adding new topics (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array
        var a = $("<button>");
        a.addClass("topic-btn fas fa-umbrella-beach");
        // a.css("color:blue");
        // a.addClass("topic-btn fas fa-umbrella-beach style='color:blue;'"); //???????
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

// Main processes -------------------------------------------------------------------------------------------------------

// Calling the renderButtons function to display the intial buttons
renderButtons();

// Adding a click event listener to all elements with a class of "topic-btn"
$(document).on("click", ".topic-btn", displaySearchInfo);

// This function handles events where a search button is clicked
$("#add-search").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#search-input").val().trim();
    topics.push(topic);
    renderButtons();
});