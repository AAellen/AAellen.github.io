$(document).ready(function(){
    // Image pool to select from
    var images = [
        'clouds.jpg', 'mountains.jpg', 'nebula-dark.jpg', 'nebula-purple.jpg', 'sand.jpg', 'spiral.jpg', 'sunset.jpg', 'trees.jpg'
    ];
    
    // Pick a random image
    var maxImages = images.length;
    var rand = Math.floor(Math.random() * maxImages);
    var image = images[rand];
    
     // Set image as background
    console.log("Setting background image: " + image);
    var baseUrl = window.location.origin;
    document.getElementById("title-background").style.backgroundImage=`url('${baseUrl}/assets/img/${image}')`;
});