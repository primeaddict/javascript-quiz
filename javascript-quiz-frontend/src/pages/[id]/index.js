import QuestionComponent from "../../components/question-component/question.component"
import { fetchQuizData } from "../../scrapper"

const Home = (props) => {
    return <QuestionComponent {...props} />
}

export async function getStaticProps(ctx) {
    try {
        let id = ctx?.params?.id || 1
        const quizData = await fetchQuizData();
        id = await (id <= 0 || id > quizData.length) ? 0 : id - 1
        const question = quizData[id]

        return {
            props: { question, id },
        };
    } catch (error) {
        return {
            props: { question: {}, id: 1 }
        }
    }
}

export async function getStaticPaths() {


    try {
        const quizData = await fetchQuizData();

        const paths = quizData.map(que => {
            return ({
                params: { id: String(que.id + 1) }
            })
        })

        return {
            paths,
            fallback: true, //false or "blocking" // See the "fallback" section below
        };

    } catch (error) {
        return {
            paths: [
                { params: { id: '1' } },
                { params: { id: '2' }, },
            ],
            fallback: true, //false or "blocking" // See the "fallback" section below
        };
    }

}

export default Home

