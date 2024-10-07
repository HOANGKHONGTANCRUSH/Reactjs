import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { putUpdateQuizForAdmin } from '../../../../services/apiSevice';
import _ from 'lodash'


const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [Type, setType] = useState("");
    const [quizImage, setquizImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setDescription(dataUpdate.description);
            setName(dataUpdate.name);
            setType(dataUpdate.difficulty);// Đảm bảo giá trị không undefined
            setquizImage("");
            if (dataUpdate.quizImage) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.quizImage}`);
            }
        }
    }, [props.dataUpdate]);

    const handleClose = () => {
        setShow(false);
        setName("");  // Reset giá trị khi đóng modal
        setDescription("");  // Reset giá trị khi đóng modal
        setType("EASY");  // Reset giá trị khi đóng modal
        setquizImage("");
        setPreviewImage("");
        setDataUpdate({});
    };

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            quizImage(event.target.files[0])
        }
    };

    const handleSubmitUpdateQuiz = async () => {
        if (!name) {
            toast.error('Name and Description are required.');
            return;
        }
        if (!description) {
            toast.error('Invalid description')
            return;
        }

        let data = await putUpdateQuizForAdmin(dataUpdate.id, name, description, Type, quizImage);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            await props.fetchQuiz();
            handleClose();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl' backdrop="static" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Update the Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}  // Luôn kiểm soát giá trị input
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}  // Luôn kiểm soát giá trị input
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Difficulty</label>
                            <select
                                className="form-select"
                                onChange={(event) => setType(event.target.value)}
                                value={Type}  // Luôn kiểm soát giá trị select
                            >
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label lable-upload" htmlFor='labelUpload'>
                                <FcPlus /> Upload Image
                            </label>
                            <input
                                type='file'
                                id='labelUpload'
                                hidden
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>

                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitUpdateQuiz}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};


export default ModalUpdateQuiz