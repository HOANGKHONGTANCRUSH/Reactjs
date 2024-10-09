import { useEffect, useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreateNewQuetionForQuiz, postCreateNewAnswerForQuizQuetion } from '../../../../../services/apiSevice';


const Question = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [questions, setQuestion] = useState(
        [
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
        ]
    )
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, [])

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
        await Promise.all(questions.map(async (questions) => {
            const q = await postCreateNewQuetionForQuiz(
                +selectedQuiz.value,
                questions.description,
                questions.imageFile);

            await Promise.all(questions.answers.map(async (answer) =>
                await postCreateNewAnswerForQuizQuetion(
                    answer.description,
                    answer.correct_answer,
                    q.DT.id
                )
            ))
        }));

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
            <div className='title'>
                Manage Questions
            </div>
            <hr></hr>
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

export default Question

