 function populateSelect(selectID, options, filter = function(){return true}) {
    console.log(options);
        options.forEach(option => {
        if(filter(option)){
         var optionElement = document.createElement("option");
         optionElement.value = option.id;
         optionElement.innerHTML = option.name;
         $("#"+selectID).append(optionElement);
        }
     })
 }
 function populateSelectorDiv(divID, optionsList, filter = function(){return true}) {
     console.log(optionsList);

        for(var index = 0; index < optionsList.length; index++){
         var selectElement = document.createElement("select");
         selectElement.id = "boostSelect"+index;
         $("."+divID).append(selectElement);
         populateSelect("boostSelect"+index, optionsList[index], filter);
        }

 }