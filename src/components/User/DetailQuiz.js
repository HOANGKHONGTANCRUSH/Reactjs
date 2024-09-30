import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getDataQuiz } from "../../services/apiSevice";

const DetailQuiz = (props) => {

    const params = useParams();
    const quizId = params.id;

    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        console.log('>>> check :', res)
    }
    console.log('check params', params)
    return (
        <div className="detail-quiz-container">
            DetailQuiz
        </div>
    )
}

export default DetailQuiz