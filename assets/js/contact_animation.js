$(document).ready(function () {
    $("a.contact").click(function () {
        var checkbox = document.getElementById("checkbox-aside");
        var delay = 200;
        if(!checkbox.checked)
        {
            delay= delay+700;
            checkbox.checked = true;
        }
        setTimeout(function(){
            $('#contact h3').animate({color: "#6cfff4", fontSize:"2rem"}, 200 );
        }, delay);
        setTimeout(function(){
            $('#contact h3').animate({color: "#c0c0cc", fontSize:"1.75rem"}, 1000);
        }, delay+500);
    });
  });