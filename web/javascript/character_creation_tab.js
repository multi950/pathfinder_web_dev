var tabs = ["introduction", "ancestry", "background", "class", "skill", "overview" ];
var currentTab;

function openSection(evt, section) {
    var i, tabcontent, tablinks, currentIndex;
    currentTab = section;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(section).style.display = "block";
    evt.currentTarget.className += " active";

  }

  function  nextSection(){
      //click the next tab unless it is the last one
      currentIndex = getCurrentIndex();
     if(currentIndex === tabContents.length - 1){
       return;
     } else{
       document.getElementsByClassName("tablinks")[currentIndex + 1].click();  
     }
    }

    function  previousSection(){
      currentIndex = getCurrentIndex();
      //click the next tab unless it is the first one
     if(currentIndex === 0){
       return;
     } else{
       document.getElementsByClassName("tablinks")[currentIndex - 1].click();  
     }
    }

    function getCurrentIndex(){
            //get current id by comparing the current tab and the tabs on the page
            tabContents = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabContents.length; i++) {
              if(tabContents[i].id === currentTab){
                    return i;
                  }
            }
            
    }