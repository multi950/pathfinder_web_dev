 function populateSelect(selectID, options) {
        options.forEach(option => {
         var optionElement = document.createElement("option");
         optionElement.value = option.id;
         optionElement.innerHTML = option.name;
         $("#"+selectID).append(optionElement);
     })
 }
 function populateSelectorDiv(divID, optionsList) {
        
        for(var index = 0; index < optionsList.length; index++){
         var selectElement = document.createElement("select");
         selectElement.id = "boostSelect"+index;
         $("."+divID).append(selectElement);
         $("."+divID).append("</br>");
         populateSelect("boostSelect"+index, optionsList[index]);
        }

 }