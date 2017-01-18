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
    getIP("C")
  }
  if($(this).html() == "°F"){
    getIP("F")
  }

});


//Get Weather
function getWeather(type,city,country){

  $("#city").html("- - - - - -");
  $("#country").html("- - - -");
  $("#tempValue").html("Loading");
  $("#tempUnit").html("");
  $("#weatherDesc").html("- - - - - -")

  query = city + "," + country

      if(type == "C"){
        var url="http://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+APPID
        var tempUnit = "&deg;C"
      }
      else{
        var url="http://api.openweathermap.org/data/2.5/weather?q="+query+"&units=imperial&appid="+APPID
        var tempUnit = "&deg;F"
      }

      $.ajax(url,{
        dataType:"jsonp"
      })
      .done(function(data){
        console.log(data)
        $("#city").html(city);
        $("#country").html(" , "+country);
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
}

//Get IP
function getIP(type){

  var IP = ""
  var IPUrl = "https://api.ipify.org"
  $.ajax(IPUrl)
  .done(function(data){
    IP=data
    console.log(IP);
      var IPInfourl = "http://ipinfo.io/"+IP+"/json"
      $.ajax(IPInfourl,{
        dataType:"jsonp"
      })
      .done(function(data){
        getWeather(type,data.city,data.country);
      })
  })
}

getIP("C")
