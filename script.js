

var APIkey = "0ba0c1d4b48af80e63d116478eae89cc"



$(document).ready(function() {
            

var cities = JSON.parse(localStorage.getItem("cities")) || [];


$("#search-button").on("click", function() {
  var searchCity = $("#search-value").val();       //event listener for search button
  $("#search-value").val("");
  getCity(searchCity);
  console.log("search-button")
  
})

$(".list").on("click", "li", function(){
    getCity($(this).text());

})

function addRow(text) {
  var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
  $(".list").append(li);
}

console.log("cities", cities[cities.length - 1])
  if (cities.length < 0) {
    getCity(cities[cities.length - 1]);

  }

  for (var i = 0; i < cities.length; i ++) {
    addRow(cities[i]);
  }



function getCity(searchCity) {
  
      $.ajax({
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIkey + "&units=imperial",
      dataType: "json",
      }).then(function (data) {
      
        if (cities.indexOf(searchCity) === -1) {
          cities.push(searchCity)

          window.localStorage.setItem("cities", JSON.stringify(cities))
          addRow(searchCity);
        }

        $("#today").empty();     //clearing out my div for new information

        //cards for temperature, wind, image, humidity
        var card = $("<div>").addClass("card")
        var title = $("<h4>").text("City: " + searchCity)
        var wind = $("<div>").addClass("card-text").text("Wind Speed: " + data.wind.speed)
        var humid = $("<div>").addClass("card-text").text("Humidity: " + data.main.humidity)
        var temp = $("<div>").addClass("card-text").text("Temperature: " +  data.main.temp)
        var cardBody = $("<div>").addClass("card-body")
        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png" )
        cardBody.append(title, temp, img, humid, wind);

        card.append(cardBody);
        $("#today").append(card);
        getForecast(searchCity);


  })        

}

        function getForecast(searchCity) {
          console.log("it worked!");
          $.ajax({
            type: "GET",
            url: 'https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${APIkey}&units=imperial',
            dataType:"json"
           }).then(function(data) {
            console.log(data);
            
            $("#forecast").html("<h4 class='mt-3'> 5-Day Forecast:</h4>").append("<div class=\"row\">");
                for (i = 0; i < data.length; i++){
                    if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                      var col = $("<div>").addClass("col-md-2");
                      var card = $("<div>").addClass("card bg-primary text-white");
                      var body = $("<div>").addClass("card-body p-2")
                      var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png" )
                      var p1 = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp_max)
                      var p2 = $("<p>").addClass("card-text").text("Humidity " + data.list[i].main.humidity)


                      col.append(card.append(body.append(img, p1, p2)));
                      $("#forecast .row").append(col);
                    }
                }

          })
        }

      })
