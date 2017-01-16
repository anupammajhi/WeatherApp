$(document).ready(function(){
  //Make the weatherBox a circle to fit all data
    var weatherBoxDimentions = Math.max($(".weatherBox").css("height").replace("px",""),$(".weatherBox").css("width").replace("px",""))
    $(".weatherBox").css("height",weatherBoxDimentions)
    $(".weatherBox").css("width",weatherBoxDimentions)
});
