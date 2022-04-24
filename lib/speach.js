export function speak(text) {
    var uttr = new SpeechSynthesisUtterance();
    uttr.text = "I have a pen.";
    //言語種類を設定
    uttr.lang = 'en-US';
    speechSynthesis.speak(uttr);
}
