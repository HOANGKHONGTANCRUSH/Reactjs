import React, { useState } from 'react';
import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'

// export default Example;

const ManageUser = (props) => {
    return (
        <div className="manage-user-container">
            <div classNameName="title">

            </div>
            <div className="users-content">
                <div>
                    <button>Add new user</button>
                </div>
                <div>
                    kakakaka
                </div>
                <ModalCreateUser />
            </div>
        </div>
    )
}

export default ManageUser