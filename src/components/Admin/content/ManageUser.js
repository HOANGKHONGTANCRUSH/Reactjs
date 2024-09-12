import React, { useEffect, useState } from 'react';
import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc";
import { getAllUsers, getUSerWithPaginate } from "../../../services/apiSevice";
import TableUser from './TableUser';
import ModalUpdataUser from './ModalUpdataUser';
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from './ModalDeleteUser';
import TableUserPaginate from './TableUserPaginate';

// export default Example;

const ManageUser = (props) => {
    const [listUsers, setListUsers] = useState([])
    const LIMIT_USER = 6;
    const [pageCount, setPageCount] = useState(0)
    const [showModelCreateUser, setShowModelCreateUser] = useState(false)
    const [showModelUpdateUser, setshowModelUpdateUser] = useState(false)
    const [showViewUserModal, setShowViewUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [dataUpdate, setDataUpdate] = useState({})
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({})


    useEffect(() => {
        // fetchListUsers();
        fetchListUsersWithPaginate(1)
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers()
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }
    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUSerWithPaginate(page, LIMIT_USER)
        if (res.EC === 0) {
            console.log("res.dt", res.DT)
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    }

    const handleClickBtnUpdate = (user) => {
        setshowModelUpdateUser(true);
        setDataUpdate(user);
    }

    const handleClickBtnView = (user) => {
        setSelectedUser(user);
        setShowViewUserModal(true);
    }

    const resetUpdateData = () => {
        setDataUpdate({});
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true)
        setDataDelete(user)
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
                    {/* <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                    />
                </div>
                <ModalCreateUser
                    show={showModelCreateUser}
                    setShow={setShowModelCreateUser}
                    fetchListUsers={fetchListUsers}
                />
                <ModalUpdataUser
                    setShow={setshowModelUpdateUser}
                    show={showModelUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                />
                <ModalViewUser
                    show={showViewUserModal}
                    setShow={setShowViewUserModal}
                    dataUpdate={selectedUser}
                    resetUpdateData={() => setSelectedUser(null)}
                />

                < ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                />
            </div>
        </div>
    )
}

export default ManageUser