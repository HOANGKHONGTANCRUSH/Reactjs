import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { FcPlus } from "react-icons/fc";
import { FaMinusCircle } from "react-icons/fa";


const Question = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({})
    return (
        <div className="questions-container">
            <div className='title'>
                Manage Questions
            </div>

            <div className='add-new-question'>
                <div className='col-6 form-group'>
                    <label>Select Quiz :</label>
                    <Select
                        selectedQuiz={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className='mt-3'>
                    Add Question
                </div>
                <div className=''>
                    <div className='questions-content'>
                        <div className="form-floating description">
                            <input type="type" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label >Description</label>
                        </div>
                        <div className='group-upload'>
                            <label className='label-up'>Upload Image</label>
                            <input type={'file'} hidden />
                            <span>0 file is uploaded</span>
                        </div>
                        <div className='btn-add'>
                            <span >
                                <FcPlus className='icon-add' />
                            </span>
                            <span >
                                <FaMinusCircle className='icon-remove' />
                            </span>
                        </div>
                    </div>
                    <div className='answers-content'>
                        <input
                            className="form-check-input iscorrect"
                            type="checkbox"
                        />
                        <div className="form-floating anwser-name">
                            <input type="type" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label >Answers 1</label>
                        </div>
                        <div className='btn-group'>
                            <span >
                                <FcPlus className='icon-add' />
                            </span>
                            <span >
                                <FaMinusCircle className='icon-remove' />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question

