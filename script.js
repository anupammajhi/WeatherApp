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
