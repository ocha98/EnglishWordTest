export function speak(text: string): void{
    var uttr = new SpeechSynthesisUtterance();
    uttr.text = text
    
    //言語種類を設定
    uttr.lang = 'en-US';
    
    speechSynthesis.speak(uttr);
}