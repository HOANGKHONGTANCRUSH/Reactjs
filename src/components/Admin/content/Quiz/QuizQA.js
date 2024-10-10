import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss'
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import {
    getAllQuizForAdmin, postCreateNewQuetionForQuiz,
    postCreateNewAnswerForQuizQuetion,
    getQuizWithQA
} from '../../../../services/apiSevice';
import { toast } from 'react-toastify';


const QuizQA = (props) => {
    const initQuestion = [
        {
            id: uuidv4(),
            description: ' ',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: ' ',
                    isCorrect: false
                },
            ]
        },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [questions, setQuestion] = useState(initQuestion)
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, [])

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA()
        }
    }, [selectedQuiz])

    function urltoFile(url, filename, mimeType) {
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }


    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            //convert base64 to file obj
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i]
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile =
                        await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, `image/png`)
                }
                newQA.push(q);
            }
            setQuestion(newQA)
            console.log('checkkk =>>>', res)
        }
    }

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'Add') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                ]
            };
            setQuestion([...questions, newQuestion]);
        }
        if (type === 'Remove') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestion(questionClone);
        }

    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        console.log('>>>', type, questionId, answerId)
        let questionCLone = _.cloneDeep(questions)
        if (type === 'Add') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            };

            let index = questionCLone.findIndex(item => item.id === questionId);
            questionCLone[index].answers.push(newAnswer);
            setQuestion(questionCLone);
        }
        if (type === 'Remove') {
            let index = questionCLone.findIndex(item => item.id === questionId);
            questionCLone[index].answers =
                questionCLone[index].answers.filter(item => item.id !== answerId);
            setQuestion(questionCLone);
        }

    }

    const handleOnchange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionCLone = _.cloneDeep(questions)
            let index = questionCLone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionCLone[index].description = value
                setQuestion(questionCLone);

            }
        }
    }


    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionCLone = _.cloneDeep(questions)
        let index = questionCLone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target?.files && event.target.files[0]) {
            questionCLone[index].imageFile = event.target.files[0]
            questionCLone[index].imageName = event.target.files[0].name;
            setQuestion(questionCLone);

        }
    }

    const handlAnswerQuestion = (type, answerId, questionId, value) => {
        let questionCLone = _.cloneDeep(questions)
        let index = questionCLone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionCLone[index].answers =
                questionCLone[index].answers.map((anwser) => {
                    if (anwser.id === answerId) {
                        if (type === 'CHECKBOX') {
                            anwser.isCorrect = value;
                        } if (type === 'INPUT') {
                            anwser.description = value;
                        }
                    }
                    return anwser;
                })
            setQuestion(questionCLone);
        }

    }
    const handleSubmitQuestionForQuiz = async (image) => {

        if (_.isEmpty(selectedQuiz)) {
            toast.error("Plesse choose a Quiz!")
            return
        }

        //vld anrswes
        let isValidAnswer = true;
        let indexQ = 0, indexA = 0;

        for (let i = 0; i < questions.length; i++) {

            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) break;
        }
        if (isValidAnswer === false) {
            toast.error(`not empty Answer ${indexA + 1} at Quetion ${indexQ + 1}`)
            return;
        }
        //vld question

        let isValidQuestion = true;
        let indexQ1 = 0

        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false;
                indexQ1 = i
                break;
            }
        }
        if (isValidQuestion === false) {
            toast.error(`NO emty description for Question ${indexQ1 + 1}`);
            return;
        }

        for (const question of questions) {
            const q = await postCreateNewQuetionForQuiz(
                +selectedQuiz.value,
                questions.description,
                questions.imageFile);

            for (const answer of question.answers) {
                await postCreateNewAnswerForQuizQuetion(
                    answer.description,
                    answer.correct_answer,
                    q.DT.id
                )
            }

        }
        toast.success('Create quetions and answers succced!')
        setQuestion(initQuestion);

    }

    const handlePreviewImage = (questionId) => {
        let questionCLone = _.cloneDeep(questions)
        let index = questionCLone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionCLone[index].imageFile),
                title: questionCLone[index].imageName
            })
            setIsPreviewImage(true)
        }
    }

    return (
        <div className="questions-container">
            <div className='add-new-question'>
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz :</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add Question
                </div>
                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className='questions-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="type"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) => handleOnchange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label >Question {index + 1}'s Description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='label-up' />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                            type={'file'}
                                            hidden
                                        />
                                        <span>
                                            {question.imageName ?
                                                <span
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handlePreviewImage(question.id)}
                                                >
                                                    {question.imageName} </span> :
                                                " 0 File is uploaded"

                                            }
                                        </span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion("Add", "")}>
                                            <FaPlusCircle className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion("Remove", question.id)}>
                                                <FaMinusCircle className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {
                                    question.answers && question.answers.length > 0
                                    && question.answers.map((anwser, index) => {
                                        return (
                                            <div key={anwser.id} className='answers-content'>
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={anwser.isCorrect}
                                                    onChange={(event) => handlAnswerQuestion('CHECKBOX', anwser.id, question.id, event.target.checked)}

                                                />
                                                <div className="form-floating anwser-name">
                                                    <input
                                                        type="type"
                                                        className="form-control"
                                                        id="floatingInput"
                                                        placeholder="name@example.com"
                                                        value={anwser.description}
                                                        onChange={(event) => handlAnswerQuestion('INPUT', anwser.id, question.id, event.target.value)}
                                                    />
                                                    <label >Answers {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer("Add", question.id)}>
                                                        <FaPlusCircle className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer("Remove", question.id, anwser.id)}>
                                                            <FaMinusCircle className='icon-remove' />
                                                        </span>

                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            onClick={() => handleSubmitQuestionForQuiz()}
                            className='btn btn-warning'>Save Questions</button>
                    </div>
                }
                {isPreviewImage === true &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}
                    >
                    </Lightbox>
                }
            </div>
        </div>
    )
}

export default QuizQA

