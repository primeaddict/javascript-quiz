import { CopyBlock, dracula } from "react-code-blocks";
import s from "./question.module.scss"
import { MarkdownPreview } from 'react-marked-markdown';
import { useState } from "react";
import { getQuestionData, setLocalStorage } from "../../utils"
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const language = "jsx";
const lineNumbers = true;
const defaultStatus = { index: -1, correct: "" }

const QuestionComponent = ({ question }) => {

    const { push } = useRouter()

    const { id, title, code, options, explanation } = question || {};
    const [status, setStatus] = useState(defaultStatus);

    useEffect(() => {
        let statusTemp = getQuestionData(id)
        setStatus(statusTemp ? statusTemp : defaultStatus)
    }, [id])

    const onOptionClick = (option, index) => {
        const statusLocal = { index, correct: option.correct }
        setStatus(statusLocal)
        setLocalStorage(id, statusLocal)
    }

    if (!Object.keys(question || {}).length) return "Loading..."

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <div className={s.topButton}>
                    <button onClick={() => push("/")}>
                        ⥢ Go Back
                    </button>
                    <button onClick={() => push("/" + (id + 2))}>
                        Next Question ⥤
                    </button>

                </div>
                <div key={id} className={s.codeBlock} >
                    <h4>{title}</h4>
                    <div className={s.code}>
                        {code && <CopyBlock

                            language={language}
                            text={code}
                            showLineNumbers={lineNumbers}
                            theme={dracula}
                            wrapLines={true}
                            codeBlock
                        />}
                    </div>
                    <div className={s.options}>
                        {options.map((option, index) => {
                            return <div
                                onClick={() => onOptionClick(option, index + 1)}
                                key={index + 1}
                                className={`${s.option} ${status?.index === index + 1 && s[status?.correct]}`}
                            >
                                <span className={s.number}>{(index + 1)}</span>
                                <div>
                                    <MarkdownPreview value={option.text} />
                                </div>
                            </div>
                        })}
                    </div>
                    {status?.index !== -1 &&
                        <div div className={s.explanation}>
                            <div className={s.title}>Explanation</div>
                            <MarkdownPreview value={explanation} />
                        </div>
                    }
                </div >
            </div >
        </>
    )
}



export default QuestionComponent