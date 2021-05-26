window.addEventListener('DOMContentLoaded', (event) => {
    var logos =document.getElementsByClassName("gen-logo-slide");
    for(var i=0; i<logos.length; i++){
  
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
      outside(null);
  
      container.addEventListener("mouseover", function( event ){
        var fullW = text.offsetWidth;
  
        text.style.transform="translateX(0)";
        text.style.opacity="1";
  
        before.style.paddingLeft="0";
        after.style.transform = "";
        
        console.log("inside")
  
      }, false);
  
      container.addEventListener("mouseout", outside);
  
      function outside(event){
      var W = text.offsetWidth
        text.style.transform=""; // reset back to default defined in .css
        text.style.opacity = "0";
        before.style.paddingLeft=`${W}px`;
        after.style.transform=`translateX(-${W}px)`;
        console.log("outside")
  
      }
  
          console.log("removiing")
      logos[i].remove();
    }
  
  });