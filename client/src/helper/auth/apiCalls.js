import axios from 'axios';
import {API} from '../../backend'
import { axiosInstance } from '../core/axiosInstance';

axios.defaults.baseURL = `${API}`;


/** signin function */
export async function signinUser(credentials){
    try {
        return await axiosInstance.post(`/login`, credentials)
    } catch (error) {
        return { error : "Invalid credentials!"}
    }
}

/** get User details */
export async function getUser({ username }){
    try {
        const { data } = await axios.get(`/api/v1/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}

/** register user function */
export async function registerUser(credentials){
    try {
        // console.log(API);
        const { data : { msg }, status } = await axios.post(`/signup`, credentials);

        let { username, email } = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/registerMail', { username, userEmail : email, text : msg})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}


/** get User details */
export async function logoutUser(){
    try {
        const { data } = await axios.get(`logout`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}


/** add task function */
export async function addTask(task){
    try {
        return await axiosInstance.post(`/task/add`, task)
    } catch (error) {
        return { error : "Invalid credentials!"}
    }
}

export async function listTask(task){
    try {
        return await axiosInstance.post(`/task/list`, task)
    } catch (error) {
        return { error : "Invalid credentials!"}
    }
}

export async function delTask(taskId){
    try {
        return await axiosInstance.post(`/task/delete/${taskId}`, )
    } catch (error) {
        return { error : "Invalid credentials!"}
    }
}

editTask
export async function editTask(task){
    try {
        return await axiosInstance.post(`/task/edit`, task)
    } catch (error) {
        return { error : "Invalid credentials!"}
    }
}