import React, { useEffect, useState } from 'react';
import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc";
import { getAllUsers } from "../../../services/apiSevice";
import TableUser from './TableUser';

// export default Example;

const ManageUser = (props) => {
    const [listUsers, setListUsers] = useState([])

    const [showModelCreateUser, setShowModelCreateUser] = useState(false)

    useEffect(() => {
        fetchListUsers();
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers()
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

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
                    <TableUser listUsers={listUsers} />
                </div>
                <ModalCreateUser
                    show={showModelCreateUser}
                    setShow={setShowModelCreateUser}
                    fetchListUsers={fetchListUsers}
                />
            </div>
        </div>
    )
}

export default ManageUser