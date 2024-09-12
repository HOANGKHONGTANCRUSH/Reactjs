import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import _ from 'lodash'

const ModalViewUser = (props) => {
    const { show, setShow, dataUpdate, resetUpdateData } = props;

    const handleClose = () => {
        setShow(false);
        resetForm();
        if (resetUpdateData) {
            resetUpdateData();
        }
    };

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (dataUpdate && !_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate]);

    const resetForm = () => {
        setEmail("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
    };

    return (
        <Modal show={show} onHide={handleClose} size='xl' backdrop="static"
            className='modal-add-user'>
            <Modal.Header closeButton>
                <Modal.Title>View User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            disabled
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" value={username} disabled />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Role</label>
                        <select className="form-select" value={role} disabled>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div className=''>
                        <label className="form-label lable-upload" htmlFor='lableUpload'><FcPlus />Upload image</label>
                        <input
                            type='file'
                            id='lableUpload'
                            hidden
                        />
                    </div>
                    <div className='col-md12 img-preview'>
                        {previewImage ? <img src={previewImage} />
                            : <span>Hello Image</span>}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalViewUser;
