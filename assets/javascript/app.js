$(document).ready(function () {
    var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "sugar glider", "chinchilla", "hedgehog",
        "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

    function displayAnimalInfo() {
        $("#animal-view").empty();
        var animal = $(this).attr("data-name");
        var apiKey = "oOCKM6IweOsXU42khlRjbVzMTsfF8bfr";
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + animal + "&limit=10&offset=0&lang=en";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div>");
                animalDiv.addClass("d-inline-block mr-4 mb-4")
                var animalRating = $("<p>");
                var animalImage = $("<img>");
                animalRating.text("Rating: " + results[i].rating);
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.addClass("gif");
                animalImage.attr("data-state", "still");
                animalDiv.append(animalRating);
                animalDiv.append(animalImage);
                $("#animal-view").append(animalDiv);
            }
            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });
        });
    };

    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        animals.push(animal);
        renderButtons();
    });

    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < animals.length; i++) {
            var btn = $("<button>");
            btn.addClass("animal btn btn-info m-1");
            btn.attr("data-name", animals[i]);
            btn.text(animals[i]);
            $("#buttons-view").append(btn);
        }
    };
    $(document).on("click", ".animal", displayAnimalInfo);
    renderButtons();

});

