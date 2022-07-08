import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { getLocalStorage } from "../../utils";
import s from "./home.module.scss"

const HomeComponent = ({ noOfQuestions }) => {

    const { push } = useRouter();


    const Buttons = () => {
        const buttons = [];
        const doneQuestions = getLocalStorage() || {};
        for (let i = 1; i <= noOfQuestions; i++) {
            let isCorrectAnswer = doneQuestions[i - 1]?.correct;
            let className = ""
            if (typeof isCorrectAnswer !== "undefined") {
                if (isCorrectAnswer === true) className = s.true;
                if (isCorrectAnswer === false) className = s.false;
            }
            buttons.push(<button className={className} id={i} > {i}</button >)
        }

        return (
            <div className={s.container}>

                <div onClick={(e) => { push(`/${e.target.id}`) }} className={s.buttonContainer}>
                    {buttons.map(button => button)}
                </div>
            </div>

        )
    }

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
            {Buttons()}
        </ >
    )

}



export default HomeComponent