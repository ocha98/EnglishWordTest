export class QuestionSystem {
    /*
    単語本体のデータ
    指定の範囲から選ばれたデータ
    出題する単語
    */
    private readonly words:Word[] = []
    private select:Word[] = []
    private questions: Word[] = []

    constructor(words: Word[]){
        this.words = words
    }

    private random(max:number): number{
        //integer range [0, max)
        return Math.floor(Math.random() * max);
    }

    //出題範囲をセクションで指定
    public set_section(from: number, to:number): void{
        console.log("Question System", "set section", from, to)
        this.select = []
        for(let word of this.words){
            if(from <= word.sec && word.sec <= to){
                this.select.push(word)
            }
        }
    }

    //出題をランダムに選択
    public build_question_random(n: number): void{
        //n:出題数
        this.questions = []
        for(let i = 0;i < n; ++i){
            let num = this.random(this.select.length)
            this.questions.push(this.select[num])
        }   
    }

    //次の出題があるかどうか
    public has_next_question(): boolean{
        return this.questions.length != 0
    }

    //出題を取得
    public get_question(): Word{
        return this.questions[this.questions.length -1]
    }

    //出題問題を削除
    public pop_question(): Word{
        return this.questions.pop()
    }

    //残りの問題数
    public rem_question(): number{
        return this.questions.length;
    }

    public get_random(): Word{
        let x = this.random(this.words.length)
        return this.words[x]
    }
}