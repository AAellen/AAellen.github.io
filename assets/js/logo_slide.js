  
  window.addEventListener('DOMContentLoaded', (event) => {
    // find all places to put a logo slide
    var logos =document.getElementsByClassName("gen-logo-slide");
    for(let i=0; i<logos.length; i++){
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
        text.style.flex="0 1 0";
        
        // set transition to none while setting initial positions
       	before.style.transition="none";
        text.style.transition="none";
        after.style.transition="none";
        
        let textW = text.offsetWidth;
        container.style.width=`${before.offsetWidth+after.offsetWidth}px`;
        outside();

				// now reset transitions after everything is in the correct starting place
        setTimeout(()=>{
            before.style.transition="";
            text.style.transition="";
            after.style.transition="";
        }, 50);
        // slide in text on mouse hover
        container.addEventListener("mouseover", function( event ){
          if (event.target.className!=text.className){
              text.style.transform="translateX(0)";
              text.style.width=`${textW}px`;
              text.style.opacity="1";
              container.style.width="auto";
              text.style.transition = "all .5s ease-in, opacity .3s .2s ease-in";
          }
        }, false);
        
        container.addEventListener("mouseout", function( event ){
          let clss=event.relatedTarget.className.split(' ')[0];
          let classes = ["logo-slide", "logo-slide-before", "logo-slide-text", "logo-slide-after"]
          if(!classes.includes(clss)){
            outside();
          }
        }, false);
        
        function outside(){           
          text.style.width="0px";
          text.style.opacity="0";
          text.style.transform=`translateX(-${textW}px)`;
          text.style.transition = "all .5s ease-in, opacity .3s ease-in";

        }

    
        logos[i].remove();
    }
  
  });
  