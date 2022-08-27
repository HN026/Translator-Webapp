const selectTag = document.querySelectorAll('select');
const toText = document.querySelector('.to-text');
const fromText = document.querySelector('.from-text');
const exchangeIcon = document.querySelector('.exchange');
const translateBtn = document.querySelector("button");
const icons = document.querySelectorAll('.row i')

const newarray = ["#3D2B3D", "#EC4E20", "#FF9505", "#016FB9","#35CE8D"];

function changingbg(){
    let x = `${newarray[Math.floor(Math.random()*(newarray.length))]}`;
    document.getElementById('btn').style.background = x;
    document.body.style.background = x;
    // console.log(newarray[Math.floor(Math.random()*3)]);
}

changingbg();


selectTag.forEach((tag, id)=> {
    for(const country_code in countries){
// console.log(country_code);
    // console.log(countries[country_code]);

    // Selecting English by default as FROM language and Hindi to as To language

    // Selecting default conversion languages....
    let selected;
    if(id === 0 && country_code === "en-GB"){
        selected = "selected";
    }
    else if (id === 1 && country_code === "hi-IN"){
        selected = "selected"
    }
   


    
    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
    tag.insertAdjacentHTML("beforeend", option); // adding options tag inside select tag.


    }
});


exchangeIcon.addEventListener("click", () => {

    // Exchanging textarea and select tag values
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;

    let tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
    
});



translateBtn.addEventListener('click', ()=> {
 let text = fromText.value;
 let translateFrom = selectTag[0].value;  // getting fromSelect tag value
 let translateTo = selectTag[1].value;  // getting toSelect tag value
 if(!text){
    return ;
 }
 toText.setAttribute("placeholder", "Translating.......");
 
 let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;

 //Fetching api response and returning it with parsing into js obj
 // and in another then method recieving that obj
 fetch(apiUrl)
   .then((res) => res.json())
   .then((data) => {
     toText.value = data.responseData.translatedText;
     toText.setAttribute("placeholder", "Translation");
   });




});


icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy")){
            // if clicked icon has from id, copy the fromtextarea value else copy the totextarea value
            if(target.id ==='from')
            {
                
                navigator.clipboard.writeText(fromText.value);
            }
            else
            {
                
                navigator.clipboard.writeText(toText.value);
            }
           
        }
        else
        {
            let utterance;
            // if clicked icon has from the id, speak the fromtextarea value else speak the totextarea value
                if (target.id === "from") {
                  utterance = new SpeechSynthesisUtterance(fromText.value);
                  utterance.lang = selectTag[0].value;
                } else {
                  utterance = new SpeechSynthesisUtterance(toText.value);
                  utterance.lang = selectTag[1].value;
                }
                speechSynthesis.speak(utterance); // Speak the passed utterance
        }

    });
})