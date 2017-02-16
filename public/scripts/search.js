var input               = document.querySelector('input'),
    searchElements      = document.querySelectorAll('td.fullName');

input.addEventListener("input", function() {
    var filter = input.value.toLowerCase();
    searchElements.forEach(function(item){
       if( item.innerHTML.toLowerCase().indexOf(filter) > -1) {
           item.parentNode.style.display = "";
       } else {
           item.parentNode.style.display = "none";
       }
    });
});
