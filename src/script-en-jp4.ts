import { speak } from "./speach.js" 
import { QuestionSystem } from "./QuestionSystem.js";

const question_text = document.getElementById("questionText");
const user_input = <HTMLInputElement>document.getElementById("userInputText");
const timer_text = document.getElementById("timerText")
const btn_start = <HTMLButtonElement>document.getElementById("btnStart")
const btn_reset = <HTMLButtonElement>document.getElementById("btnReset")
const from_sel_section = <HTMLSelectElement>document.getElementById("fromSection")
const to_sel_section = <HTMLSelectElement>document.getElementById("toSection")
const div_selection = document.getElementById("selector")
const result_text = document.getElementById("resu_text")
const words: Word[] = []
const num_section: number = 19
const num_select: number = 4
let question_system:QuestionSystem


let timer1;
let startTime: Date;
let showing_word: Word;

function random(max:number): number{
    //integer range [0, max)
    return Math.floor(Math.random() * max);
}

//初期化
function init(){
    for(let i = 1;i <= num_section; ++i){
        const option = <HTMLOptionElement>document.createElement("option");
        option.text = String(i)
        option.value = String(i)
        to_sel_section.append(option)
    }
    for(let i = 1;i <= num_section; ++i){
        const option = <HTMLOptionElement>document.createElement("option");
        option.text = String(i)
        option.value = String(i)
        from_sel_section.append(option)
    }

    for(let i = 0;i < num_select; ++i){
        const select = <HTMLButtonElement>document.createElement("button")
        select.className = "sel-button";
        select.id = String(i)
        select.textContent = String(i)
        select.addEventListener("click", event_button);
        div_selection.append(select)
    }
    
    question_system = new QuestionSystem(words)

    result_text.addEventListener("animationend", () => {result_text.classList.remove("fade");});
    result_text.addEventListener("animationcancel", () => {result_text.classList.remove("fade");});
    btn_start.addEventListener("click", start)
    btn_reset.addEventListener("click", reset)
    question_system.set_section(1, 1)
    btn_start.disabled = false
    btn_reset.disabled = false
    question_text.textContent = "Let's Start!"
}

//単語の正誤判定
function judge(text: string): boolean{
    const now_word: Word = question_system.get_question()
    return text === now_word.eng
}

//次の単語を表示
function show_word(word: Word){
    console.log(word)
    let sel:string[] = [];
    while(sel.length < num_select){
        const rand_word: Word = question_system.get_random()
        if(sel.includes(rand_word.eng))continue
        if(rand_word.eng == word.eng)continue
        sel.push(rand_word.eng)
    }
    showing_word = word
    question_text.textContent = word.jp
    
    console.log("selection", sel)
    
    let ans_num = random(num_select)
    for(let i = 0;i < num_select; ++i){
        const btn = <HTMLButtonElement>div_selection.children[i]
        btn.textContent = sel.pop();
        if(ans_num == i){
            btn.textContent = word.eng
        }
    }
}

function ans_keyboard(e: KeyboardEvent){
let num: number = Number(e.key)-1
    if(0 <= num && num < num_select){
        const btn = <HTMLButtonElement>div_selection.children[num]
        const text = btn.textContent
        const ans = question_system.get_question().eng
        if(text == ans){
            ac()
        }else{
            effect_wa()
        }
    }
}

function ac(){
    effect_ac();
    question_system.pop_question()
    if(question_system.has_next_question()){
        show_word(question_system.get_question())
    }else{
        finish()
    }
}

//正解の演出
function effect_ac(){
    result_text.textContent = "Correct (^^)"
    result_text.classList.remove("wa")
    result_text.classList.add("ac")
    result_text.classList.add("fade")
}

//誤答の演出
function effect_wa(){
    result_text.textContent = "Wrong (> <)"
    result_text.classList.remove("ac")
    result_text.classList.add("wa")
    result_text.classList.add("fade")

}

function event_button(e: PointerEvent){
    const btn = <HTMLButtonElement>e.target
    const text = btn.textContent
    const ans = question_system.get_question().eng
    if(text == ans){
        ac()
    }else{
        effect_wa()
    }
}


function finish(){
    window.alert("Finish")
    reset();
}

function showTimer(){
    const nowTime = new Date();

    var elapsedTime = Math.floor((nowTime.getTime() - startTime.getTime()) / 1000);
    var str = '経過秒数: ' + elapsedTime + '秒';

    var re = document.getElementById('timerText');
    re.innerHTML = str;
}

//リセットボタン
function reset(){
    question_text.textContent = "Let's Start"
    timer_text.textContent = ""
    for(let i = 0;i < div_selection.childElementCount; ++i){
        const elem = <HTMLButtonElement>div_selection.children[i]
        elem.removeEventListener("click", event_button);
        elem.textContent = String(i)
    }
    window.removeEventListener("keydown", ans_keyboard)
    clearInterval(timer1)
}


//スタートボタン
function start(){
    question_system.set_section(Number(from_sel_section.value), Number(to_sel_section.value))
    question_system.build_question_random(10)
    for(let i = 0;i < div_selection.childElementCount; ++i){
        const elem = <HTMLButtonElement>div_selection.children[i]
        elem.addEventListener("click", event_button);
    }
    show_word(question_system.get_question())
    window.addEventListener("keydown", ans_keyboard)
    startTime = new Date()
    timer1 = setInterval(showTimer, 10)
}

async function getWords(){
    const data =  await  fetch("./word.json")
    const json = await  data.json()
    console.log("test", json)
    words.push(...json)
}

getWords().then(
    () => init()
)