import { useState } from 'react';
import './MangageQuiz.scss'
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../../services/apiSevice';
import { toast } from 'react-toastify';
import { FcPlus } from "react-icons/fc";
import QuizTable from './QuizTable';
import Accordion from 'react-bootstrap/Accordion';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';



const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const MangageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    // const [showModelUpdateUser, setshowModelUpdateUser] = useState(false)
    // const [dataUpdate, setDataUpdate] = useState({})

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    }
    const handleSumitQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required');
            return;
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('');
            setDescription('');
            setImage(null)
            setPreviewImage("");
        } else {
            toast.error(res.EM)
        }
    }

    // const handleClickBtnUpdate = (quiz) => {
    //     setshowModelUpdateUser(true);
    //     setDataUpdate(quiz);
    // }

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>mangage quizes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add new Quiz:</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='your quiz name'
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label >Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='description ...'
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label >Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        value={type}
                                        options={options}
                                        placeholder={'Quiz type ...'}
                                        defaultValue={type}
                                        onChange={setType}
                                    />
                                </div>
                                <div className="more-actions form-group">
                                    <label className='mb-1 ' htmlFor='lableUpload'><FcPlus /> Upload Image</label>
                                    <input
                                        type='file'
                                        className='form-control'
                                        onChange={(event) => handleChangeFile(event)}
                                        hidden
                                        id='lableUpload'
                                    />

                                </div>
                                <div className='mt-3'>
                                    <button
                                        onClick={() => handleSumitQuiz()}
                                        className='btn btn-warning'>Save</button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <QuizTable />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Asign to User</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default MangageQuiz