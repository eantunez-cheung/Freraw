import axios from "axios"

const URI = "http://10.0.2.2:8000/api"

export default {
    async login(userName, password) {
        try {
            let response = await fetch(`${URI}/login`, {
                method: 'POST',
                body: JSON.stringify({
                    "userName": userName,
                    "password": password
                })
            })
            let responseJsonData = await response.json()
            return responseJsonData
        } catch (e) {
            console.log(e)
        }
    },
    async register(userName, password, email) {
        try {
            let response = await fetch(`${URI}/users`, {
                method: 'POST',
                body: JSON.stringify({
                    "userName": userName,
                    "password": password,
                    "email": email
                })
            })
            let responseJsonData = await response.json()
            return responseJsonData
        } catch (e) {
            console.log(e)
        }
    },
    // uploadProduct(productName, imageFile, price, orientation) {
    //     const config = {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     }
    //     let data = new FormData()
    //     data.append('file', {
    //         uri: imageFile.uri,
    //         name: imageFile.fileName,
    //         type: imageFile.type
    //     })
    //     // console.log(data._parts)
    //     const data2 = {file: {
    //         uri: imageFile.uri,
    //         name: imageFile.fileName,
    //         type: imageFile.type
    //     }}
    //     axios.post(`${URI}/products`, data, config)
    //         .then(response => {
    //             console.log(response.data)
    //         })
    //         .catch(error => console.log(error))
    // },
    async uploadProduct(productName, imageFile, price, orientation) {
        let formData = new FormData()
        formData.append('title', productName)
        formData.append('file', {
            uri: imageFile.uri,
            name: imageFile.fileName,
            type: imageFile.type
        })
        formData.append('price', price)
        formData.append('orientation', orientation)
        try {
            let response = await fetch(`${URI}/products`, {
                method: 'POST',
                body: formData
            })
            let responseJsonData = await response.json()
            return responseJsonData
        } catch (e) {
            console.log(e)
        }
    }
}