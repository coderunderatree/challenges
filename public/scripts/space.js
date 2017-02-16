// .replace(/ /g,'')
var inputs  = document.querySelectorAll('input');

inputs.forEach(function(input){
    input.addEventListener("keydown",function(e){
        return e.which !== 32;
    })
});