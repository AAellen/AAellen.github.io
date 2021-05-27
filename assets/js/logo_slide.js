function setHitbox(container, hitbox, before, after, beforeW, opening){
    console.log(opening)
    var rect = container.getBoundingClientRect();
    hitbox.style.top = "0px";
    hitbox.style.height = `${rect.height}px`
  
    var updateHitbox = setInterval(()=>{
        rect = container.getBoundingClientRect();
        if(opening===false){
            hitbox.style.left = `${before.getBoundingClientRect().right - rect.left - beforeW}px`;
        }else{
            hitbox.style.left = `${before.getBoundingClientRect().left - rect.left}px`;
        }
        hitbox.style.right = `${rect.right - after.getBoundingClientRect().right}px`;
    }, 50);
    setTimeout(()=> clearInterval(updateHitbox), 500);
  }
  
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
        var hitbox = document.createElement("div");
        container.appendChild(before);
        container.appendChild(text);
        container.appendChild(after);
        container.appendChild(hitbox);
        parent.insertBefore(container, logos[i]);
    
    
        container.className = "logo-slide";
        before.innerText = "</";
        text.innerText = logos[i].innerText;
        after.innerText = ">";
        before.className="logo-slide-before noselect";
        text.className="logo-slide-text noselect";
        after.className="logo-slide-after noselect";
        hitbox.className="logo-slide-hitbox";
    
        text.style.display="inline-block";
        // set initial position without transitions
        before.style.transition="none";
        text.style.transition="none";
        after.style.transition="none";
        container.style.opacity="0";
        // calculate the width of the </ block before it changes due to its padding-left
        var beforeW;
        try {
            beforeW = parseInt(window.getComputedStyle(before, null).getPropertyValue("width"));
        } catch(e) {
            beforeW = before.currentStyle.width;
        } 
        outside();
        // now reset transitions after everything is in the correct starting place
        setTimeout(()=>{
            before.style.transition="";
            text.style.transition="";
            after.style.transition="";
            container.style.opacity="1";
        }, 50);
    
        // slide in text on mouse hover
        hitbox.addEventListener("mouseover", function( event ){ 
            console.log("in")
            text.style.transform="translateX(0)";
            text.style.opacity="1";
    
            before.style.paddingLeft="0";
            after.style.transform = "";
    
            //change hitbox
            setHitbox(container, hitbox, before, after, beforeW, true)
    
    
        }, false);
    
        hitbox.addEventListener("mouseout", () => outside());
    
        // slide out text when mouse leaves and when page is first loaded    
        function outside(){
            console.log("out")
    
            var W = text.offsetWidth
            text.style.transform=`translateX(-${W}px)`; // reset back to default defined in .css file
            text.style.opacity = "0.1";
    
            before.style.paddingLeft=`${W-beforeW}px`;
            after.style.transform=`translateX(-${W}px)`;
    
            // set hitbox after everything else is in place
            setHitbox(container, hitbox, before, after, beforeW, false)
            //}, 500);
        }
    
        logos[i].remove();
    }
  
  });
  