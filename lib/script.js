var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { QuestionSystem } from "./QuestionSystem.js";
const question_text = document.getElementById("questionText");
const user_input = document.getElementById("userInputText");
const timer_text = document.getElementById("timerText");
const btn_start = document.getElementById("btnStart");
const btn_reset = document.getElementById("btnReset");
const from_sel_section = document.getElementById("fromSection");
const to_sel_section = document.getElementById("toSection");
const result_text = document.getElementById("resu_text");
const words = [];
const num_section = 19;
let question_system;
let timer1;
let startTime;
let showing_word;
//初期化
function init() {
    for (let i = 1; i <= num_section; ++i) {
        const option = document.createElement("option");
        option.text = String(i);
        option.value = String(i);
        to_sel_section.append(option);
    }
    for (let i = 1; i <= num_section; ++i) {
        const option = document.createElement("option");
        option.text = String(i);
        option.value = String(i);
        from_sel_section.append(option);
    }
    question_system = new QuestionSystem(words);
    result_text.addEventListener("animationend", () => { result_text.classList.remove("fade"); });
    result_text.addEventListener("animationcancel", () => { result_text.classList.remove("fade"); });
    btn_start.addEventListener("click", start);
    btn_reset.addEventListener("click", reset);
    question_system.set_section(1, 1);
    btn_start.disabled = false;
    btn_reset.disabled = false;
    question_text.textContent = "Let's Start!";
}
//単語の正誤判定
function judge(text) {
    const now_word = question_system.get_question();
    return text === now_word.eng;
}
//次の単語を表示
function show_word(word) {
    console.log(word);
    showing_word = word;
    user_input.value = "";
    question_text.textContent = word.jp;
}
//正解の演出
function effect_ac() {
    result_text.textContent = "Correct (^^)";
    result_text.classList.remove("wa");
    result_text.classList.add("ac");
    result_text.classList.add("fade");
}
//誤答の演出
function effect_wa() {
    result_text.textContent = "Wrong (> <)";
    result_text.classList.remove("ac");
    result_text.classList.add("wa");
    result_text.classList.add("fade");
}
//入力をリアルタイムに取得
function input() {
    const user_text = user_input.value;
    //スペースで確定とみなす
    if (user_text.slice(-1) !== " ")
        return;
    const word = user_text.slice(0, -1);
    if (judge(word)) { //正解
        effect_ac();
        question_system.pop_question();
        if (question_system.has_next_question()) {
            show_word(question_system.get_question());
            return;
        }
        finish();
        return;
    }
    //不正解
    effect_wa();
}
function finish() {
    window.alert("Finish");
    reset();
}
function showTimer() {
    const nowTime = new Date();
    var elapsedTime = Math.floor((nowTime.getTime() - startTime.getTime()) / 1000);
    var str = '経過秒数: ' + elapsedTime + '秒';
    var re = document.getElementById('timerText');
    re.innerHTML = str;
}
//リセットボタン
function reset() {
    question_text.textContent = "Let's Start";
    timer_text.textContent = "";
    user_input.value = "";
    user_input.removeEventListener("input", input);
    clearInterval(timer1);
}
//スタートボタン
function start() {
    question_system.set_section(Number(from_sel_section.value), Number(to_sel_section.value));
    question_system.build_question_random(10);
    user_input.addEventListener("input", input);
    show_word(question_system.get_question());
    startTime = new Date();
    timer1 = setInterval(showTimer, 10);
}
function getWords() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch("./word.json");
        const json = yield data.json();
        console.log("test", json);
        words.push(...json);
    });
}
getWords().then(() => init());
