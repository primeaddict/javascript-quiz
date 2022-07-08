import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, memo } from "react";
import { getLocalStorage } from "../../utils";
import s from "./home.module.scss"

const areEqual = (pOld, pNew) => {
    return (pOld.noOfQuestions !== pNew.noOfQuestions)
}


const Buttons = ({ noOfQuestions, doneQuestions, push }) => {
    const buttons = [];
    for (let i = 1; i <= noOfQuestions; i++) {
        let isCorrectAnswer = doneQuestions[i - 1]?.correct;
        let className = ""
        if (typeof isCorrectAnswer !== "undefined") {
            if (isCorrectAnswer === true) className = s.true;
            if (isCorrectAnswer === false) className = s.false;
        }
        buttons.push(<button key={i} className={className} id={i} > {i}</button >)
    }

    return (
        <div className={s.container}>

            <div onClick={(e) => { push(`/${e.target.id}`) }} className={s.buttonContainer}>
                {buttons.map(button => button)}
            </div>
        </div>

    )
}

const MemoButtons = memo(Buttons, areEqual);

const HomeComponent = ({ noOfQuestions }) => {

    const { push } = useRouter();

    const [doneQuestions, setDoneQuestions] = useState({});

    useEffect(() => {
        setDoneQuestions(getLocalStorage() || {})
    }, [])


    return (
        <><Head>
            <title>Javascript Quiz</title>
        </Head>

            <div className={s.title}>
                <header>
                    <div>
                        <h1>JavaScript Quiz</h1>
                        <h3>A <span>fun</span> quiz to refresh js concepts.</h3>
                    </div>
                </header>
            </div>
            <MemoButtons push={push} noOfQuestions={noOfQuestions} doneQuestions={doneQuestions} />
        </ >
    )

}



export default HomeComponent