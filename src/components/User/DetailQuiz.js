import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz } from "../../services/apiSevice";
import _ from "lodash";
import "./DetailQuiz.scss"

const DetailQuiz = (props) => {

    const params = useParams();
    const location = useLocation();

    console.log(location)
    const quizId = params.id;

    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        console.log('>>> check :', res)
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        answers.push(item.answers);
                    })
                    console.log('value: ', value, 'key :', key)
                    return { questionId: key, answers, questionDescription, image }
                }
                )
                .value()
            console.log("data : ", data)
        }
    }
    console.log('check params', params)
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId} :  {location?.state?.quiTitle}
                </div>
                <hr></hr>
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <div className="question"> question 1: how are you doing</div>
                    <div className="answer">
                        <div className="a-child">A. abc</div>
                        <div className="a-child">B. abc</div>
                        <div className="a-child">C. abc</div>
                    </div>
                </div>
                <div className="footer">
                    <button className="btn btn-primary">Prev</button>
                    <button className="btn btn-secondary mr-3">Next</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>

        </div>
    )
}

export default DetailQuiz