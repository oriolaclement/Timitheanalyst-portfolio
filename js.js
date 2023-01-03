const TypeWriter = function(textElement, words, wait = 3000){
    this.textElement = textElement;
    this.words = words;
    this.text = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function(){

    // Current Index of word
    const current = this.wordIndex % this.words.length;

    //Get full txt of current word
    const fullTxt = this.words[current];


    //Check if deleting
    if(this.isDeleting){
        //Remove Char
        this.text = fullTxt.substring(0, this.text.length - 1);
    }else{
        //Add Char
        this.text = fullTxt.substring(0, this.text.length + 1);
    }

    // Insert text into element
    this.textElement.innerHTML = `<span class="txt">${this.text}</span>`; 


    // Initial Type Speed
    let typeSpeed = 300;
    
    if(this.isDeleting){
        typeSpeed /= 2;
    }


    //If word is complete
    if(!this.isDeleting && this.text === fullTxt){
       //Make pause at end 
        typeSpeed = this.wait;
        //Set delete to true
        this.isDeleting = true;
    }else if(this.isDeleting && this.text === ''){
        this.isDeleting = false;
        //Move to next word;
        this.wordIndex++;
        //Paus before start typing
        typeSpeed = 500;
    }


    setTimeout(() => this.type(), 500)
}


// Init on Dom Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init(){
    const textElement = document.querySelector('.text-type');
    const words = JSON.parse(textElement.getAttribute('data-words'));
    const wait = textElement.getAttribute('data-wait');

//Init Typewriter
    new TypeWriter(textElement, words, wait);
}





        //The toggler for the theme change
    //    const checkbox = document.getElementById('checkbox');


      //  checkbox.addEventListener('change', ()=> {
            //Change the theme of the function
        //    document.body.classList.toggle('white');
        //});