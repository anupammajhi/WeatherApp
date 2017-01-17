var APPID = "48a8f2143a44360e16a69b9a85548032"

$(document).ready(function(){
  //Make the weatherBox a circle to fit all data
    var weatherBoxDimentions = Math.max($(".weatherBox").css("height").replace("px",""),$(".weatherBox").css("width").replace("px",""))
    $(".weatherBox").css("height",weatherBoxDimentions)
    $(".weatherBox").css("width",weatherBoxDimentions)

  //Adjust Text vertical align to center
    var contentHeight = $(".location").outerHeight() + $("#temp").outerHeight() + $("#weatherDesc").outerHeight()
    var circleHeight = $(".weatherBox").innerHeight();
    var ContentPaddingTop = (circleHeight - contentHeight)/2;
    $(".location").css("padding-top",ContentPaddingTop)
});

//Change Temperature Unit on Click
$(".unitBtn button").on("click",function(){
  $(".unitBtn button").removeClass("btn-select");
  $(this).addClass("btn-select");
  if($(this).html() == "°C"){
    getWeather("C")
  }
  if($(this).html() == "°F"){
    getWeather("F")
  }

});


//Get Weather
function getWeather(type){

  $("#city").html("- - - - - -");
  $("#country").html("- - - -");
  $("#tempValue").html("Loading");
  $("#tempUnit").html("");
  $("#weatherDesc").html("- - - - - -")
  
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      var lati = position.coords.latitude
      var longi = position.coords.longitude

      if(type == "C"){
        var url="http://api.openweathermap.org/data/2.5/weather?type=like&lat="+lati+"&lon="+longi+"&units=metric&appid="+APPID
        var tempUnit = "&deg;C"
      }
      else{
        var url="http://api.openweathermap.org/data/2.5/weather?type=like&lat="+lati+"&lon="+longi+"&units=imperial&appid="+APPID
        var tempUnit = "&deg;F"
      }

      $.ajax(url,{
        dataType:"jsonp"
      })
      .done(function(data){
        console.log(data)
        $("#city").html(data.name);
        $("#country").html(" , "+data.sys.country);
        $("#tempValue").html(data.main.temp);
        $("#tempUnit").html(tempUnit);
        $("#weatherDesc").html(data.weather[0].main)
        var icon = data.weather[0].icon
        $("body").css("background-image","url('https://raw.githubusercontent.com/anupammajhi/OpenWeatherMapBGImages/master/"+icon+".jpg')")
      })
      .fail(function(error){
        console.log("Error : "+error)
        $("#tempValue").html("Could Not Fetch");
      })

    })
  }
  else{
    $("#tempValue").html("Location Not Enabled");
  }

}

getWeather("C");
