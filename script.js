const mic = document.getElementById('mic')
const display = document.getElementById('display')
const bgColor = document.getElementById('bgColor')
display.innerText = "Click the button to start recording"


var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [...
    'aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'white', 'green'
];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;



mic.addEventListener('click', () => {

    display.innerText = "Recording .."
    recognition.start()
    recognition.addEventListener('result', (e) => {

        let color = e.results[0][0].transcript.toLowerCase();
        console.log(color)
        document.body.style.backgroundColor = color;

        if (document.body.style.backgroundColor == 'black') {

            display.classList.add('display')
            bgColor.classList.add('bgColor')
        } else {
            display.classList.remove('display')
            bgColor.classList.remove('bgColor')
        }
        if (colors.filter(definedColor => definedColor == color).length) {

            bgColor.innerText = 'Background color is ' + color + '.';
        } else {
            bgColor.innerText = 'Background color is not defined';
        }



    })
    recognition.onspeechend = function() {
        recognition.stop();
        display.innerText = "Click the button to start recording"


    }




})