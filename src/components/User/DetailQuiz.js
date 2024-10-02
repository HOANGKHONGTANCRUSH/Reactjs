import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz } from "../../services/apiSevice";
import _ from "lodash";
import "./DetailQuiz.scss"
import Question from "./Question";

const DetailQuiz = (props) => {

    const params = useParams();
    const location = useLocation();

    console.log(location)
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0);

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
            setDataQuiz(data)
        }
    }

    console.log("checll", dataQuiz)
    const hanleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }
    const hanlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }
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
                    <Question
                        index={index}
                        data={dataQuiz && dataQuiz.length > 0
                            ?
                            dataQuiz[index]
                            : []
                        }
                    />
                </div>
                <div className="footer">
                    <button className="btn btn-primary"
                        onClick={() => hanlePrev()}
                    >Prev</button>
                    <button className="btn btn-secondary mr-3"
                        onClick={() => hanleNext()}
                    >Next</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>

        </div>
    )
}

export default DetailQuiz