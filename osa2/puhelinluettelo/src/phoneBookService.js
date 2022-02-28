import axios from "axios";

const baseUrl = "/api/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        console.log("get all");
        console.log(response.data);
        return response.data
    })
}

const addNew = newContact => {
    const request = axios.post(baseUrl, newContact)
    return request
        .then(response => {
            console.log("add new");
            console.log(response.data);
            return response.data
        })
}

const removeContact = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updateContact = (id, contact) => {
    const request = axios.put(`${baseUrl}/${id}`, contact)
    return request.then(response => {
        console.log("update contact")
        console.log(response.data);
        return response.data
    })
}


export default {getAll, addNew, removeContact, updateContact}