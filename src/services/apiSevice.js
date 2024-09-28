import axios from '../utils/axioCustomize';


const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data)
}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all')
}
const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data)
}

const DeleteUsers = (id) => {
    return axios.delete('api/v1/participant', { data: { id: id } })
}

const getUSerWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, {
        email: email,
        password: password,
        delay: 5000

    })
}
const postRegister = (email, password, username) => {
    return axios.post(`api/v1/register`, { email, password, username })
}

export { postCreateNewUser, getAllUsers, putUpdateUser, DeleteUsers, getUSerWithPaginate, postLogin, postRegister }