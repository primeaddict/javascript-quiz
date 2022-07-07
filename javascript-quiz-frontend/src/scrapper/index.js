Array.prototype.customSplice = function (...args) {
    this.splice(args[0], args[1]);
    return this;
};

const START_CODE_BLOCK_RE = /```[a-z]/g;
const END_CODE_BLOCK_RE = /```\n/g;
const OPTIONS_RE = /-(\s+\w+\:.*)/g;

export function getData(q) {
    let question;
    if (typeof q === "object") {
        question = q.join("");
    } else if (typeof q === "string") {
        question = q;
    }
    const hasCodeBlock = !!question.match(START_CODE_BLOCK_RE);
    const title = question
        .split(hasCodeBlock ? START_CODE_BLOCK_RE : OPTIONS_RE)[0]
        .split("######")[1]
        .trim();
    const code = question
        .substring(
            question.search(START_CODE_BLOCK_RE),
            question.search(END_CODE_BLOCK_RE)
        )
        .trim()
        .split("\n")
        .customSplice(0, 1)
        .join("\n");

    const rawQuestions = question.match(OPTIONS_RE);
    const answer = question.split(`#### Answer: `)[1].split("\n")[0];
    const options = rawQuestions.map((question, i) => {
        let rawQuestion = question
            .substr(question.indexOf(":") + 1, question.length)
            .trim();

        return {
            correct: ["A", "B", "C", "D"].indexOf(answer) === i,
            text: rawQuestion
        };
    });

    const explanation = question
        .substr(question.indexOf(`#### Answer: ${answer}`) + 14)
        .split("</p>")[0]
        .trim();

    return {
        title,
        code,
        options,
        explanation
    };
}

export const fetchQuizData = async () => {

    try {
        const res = await fetch("https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/README.md")
        const html = await res.text();

        const questions = html?.split("---").slice(4);
        const data = questions?.map((question, i) => {
            return { id: i, ...getData(question) };
        });

        return data

    } catch (e) {
        console.log({ error: e })
        return []
    }
}


