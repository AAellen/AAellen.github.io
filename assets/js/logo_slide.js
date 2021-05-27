window.addEventListener('DOMContentLoaded', (event) => {
    // find all places to put a logo slide
    var logos =document.getElementsByClassName("gen-logo-slide");
    for(var i=0; i<logos.length; i++){
        // create all the divs for each part of the logo slide
        var parent = logos[i].parentElement;
        var container = document.createElement(logos[i].id);
        var before = document.createElement("div");
        var after = document.createElement("div");
        var text = document.createElement("div");
        container.appendChild(before);
        container.appendChild(text);
        container.appendChild(after);
        parent.insertBefore(container, logos[i]);
    
    
        container.className = "logo-slide";
        before.innerText = "</";
        text.innerText = logos[i].innerText;
        after.innerText = ">";
        before.className="logo-slide-before noselect";
        text.className="logo-slide-text noselect";
        after.className="logo-slide-after noselect";
    
        text.style.display="inline-block";
        // set initial position without transitions
        before.style.transition="none";
        text.style.transition="none";
        after.style.transition="none";
        outside();
        setTimeout(()=>{
            before.style.transition="";
            text.style.transition="";
            after.style.transition="";
        }, 10);
  
        // slide in text on mouse hover
        container.addEventListener("mouseenter", function( event ){ 
            text.style.transform="translateX(0)";
            text.style.opacity="1";
    
            before.style.paddingLeft="0";
            after.style.transform = "";
    
        }, false);
    
        container.addEventListener("mouseleave", outside);
    
        // slide out text when mouse leaves and when page is first loaded    
        function outside(){
            var W = text.offsetWidth
            text.style.transform=""; // reset back to default defined in .css file
            text.style.opacity = "0";
            before.style.paddingLeft=`${W-before.offsetWidth}px`;
            after.style.transform=`translateX(-${W}px)`;
        }
    
        logos[i].remove();
    }
  
  });