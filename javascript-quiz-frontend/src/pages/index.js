import HomeComponent from "../components/home-component/home.component"
import { fetchQuizData } from "../scrapper";

const Home = (props) => {
    return (
        <HomeComponent {...props} />
    )
}


export async function getStaticProps(ctx) {
    try {
        const quizData = await fetchQuizData();

        return {
            props: { noOfQuestions: quizData.length },
        };
    } catch (error) {
        return {
            props: { noOfQuestions: 0 }
        }
    }
}

export default Home

