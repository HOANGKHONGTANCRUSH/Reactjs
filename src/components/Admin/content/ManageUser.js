import React, { useState } from 'react';
import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc";

// export default Example;

const ManageUser = (props) => {

    const [showModelCreateUser, setShowModelCreateUser] = useState(false)


    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className='btn-add-new'>
                    <button className='btn btn-primary' onClick={() => setShowModelCreateUser(true)}> <FcPlus /> Add new user</button>
                </div>
                <div className='table-users-container'>
                    kakakaka
                </div>
                <ModalCreateUser show={showModelCreateUser}
                    setShow={setShowModelCreateUser}
                />
            </div>
        </div>
    )
}

export default ManageUser