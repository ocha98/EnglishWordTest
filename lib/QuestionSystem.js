export class QuestionSystem {
    constructor(words) {
        /*
        単語本体のデータ
        指定の範囲から選ばれたデータ
        出題する単語
        */
        this.words = [];
        this.select = [];
        this.questions = [];
        this.words = words;
    }
    random(max) {
        //integer range [0, max)
        return Math.floor(Math.random() * max);
    }
    //出題範囲をセクションで指定
    set_section(from, to) {
        console.log("Question System", "set section", from, to);
        this.select = [];
        for (let word of this.words) {
            if (from <= word.sec && word.sec <= to) {
                this.select.push(word);
            }
        }
    }
    //出題をランダムに選択
    build_question_random(n) {
        //n:出題数
        this.questions = [];
        for (let i = 0; i < n; ++i) {
            let num = this.random(this.select.length);
            this.questions.push(this.select[num]);
        }
    }
    //次の出題があるかどうか
    has_next_question() {
        return this.questions.length != 0;
    }
    //出題を取得
    get_question() {
        return this.questions[this.questions.length - 1];
    }
    //出題問題を削除
    pop_question() {
        return this.questions.pop();
    }
    //残りの問題数
    rem_question() {
        return this.questions.length;
    }
    get_random() {
        let x = this.random(this.words.length);
        return this.words[x];
    }
}
