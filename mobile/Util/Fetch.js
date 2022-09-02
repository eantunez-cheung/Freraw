import axios from "axios";
import RNFetchBlob from "rn-fetch-blob";

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
    async uploadProduct(productName, imageFile, price, orientation) {
        let formData = new FormData()
        formData.append('title', productName)
        /*formData.append('file', {
            "uri": imageFile.uri,
            "name": imageFile.fileName,
            "type": imageFile.type,
        })*/
        formData.append('file', imageFile)
        formData.append('price', price)
        formData.append('orientation', orientation)
        RNFetchBlob.fetch(
            'POST',
            `${URI}/products`,
            {
                'Content-Type': 'application/json'
            },
            [
                {
                    name: 'file',
                    filename: imageFile.fileName,
                    type: imageFile.type,
                    data: RNFetchBlob.wrap(imageFile.uri)
                },
                {
                    name: "title",
                    data: productName
                },
                {
                    name: "orientation",
                    data: orientation
                },
                {
                    name: "price",
                    data: price
                }
            ]
        )
            .then(res => {
                console.log("res:", res.text());
            })
            .catch(err => {
                console.log('Upload err!!', err);
            });

        // let imgData = {
        //     "uri": imageFile.uri,
        //     "name": imageFile.fileName,
        //     "type": imageFile.type,
        // }

        // let formData = new FormData()
        // formData.append('title', productName)
        // formData.append('file', {
        //     "uri": imageFile.uri,
        //     "name": imageFile.fileName,
        //     "type": imageFile.type,
        // })
        // // formData.append('file', imageFile)
        // formData.append('price', price)
        // formData.append('orientation', orientation)
        // // console.log(formData._parts)

        // // var config = {
        // //     headers: {
        // //       'Accept': 'application/json',
        // //       'Content-Type': 'multipart/form-data',
        // //     },
        // // }
        // // axios.post(`${URI}/products`, formData, config)
        // // .then(response => console.log(response.data))
        // // .catch(error => console.log(error))
        // try {
        //     let response = await fetch(`${URI}/products`, {
        //         headers: {
        //             'Accept': 'application/json',
        //             "Content-Type": "multipart/form-data"
        //         },
        //         method: 'POST',
        //         body: formData
        //     })
        //     let responseJsonData = await response.json()
        //     return responseJsonData
        // } catch (e) {
        //     console.log(e)
        // }
    },
    async getProducts() {
        try {
            let response = await fetch(`${URI}/products`)
            let responseJsonData = await response.json()
            return responseJsonData
        } catch (error) {
            console.log(error)
        }
    },
    async deleteProduct(id) {
        try {
            let response = await fetch(`${URI}/products/${id}`, {
                method: 'DELETE'
            })
            let responseJsonData = await response.json()
            return responseJsonData
        } catch (error) {
            console.log(error)
        }
    },
    async getBasket(basketId){
        try {
            let response = await fetch(`${URI}/basket/${basketId}`)
            let responseJsonData = await response.json()
            return responseJsonData
        } catch (error) {
            console.log(error)
        }
    },
    async getNumberCommandLine(basketId){
        try {
            let response = await fetch(`${URI}/number_command_line/${basketId}`) 
            let responseJsonData =  await response.json()
            return responseJsonData
        } catch (error) {
            console.log(error)
        }
    },
    async addBasket(productId, basketId){
        try {
            let response = await fetch(`${URI}/command_line`, {
                method: 'POST',
                body: JSON.stringify({
                    "productId": productId,
                    "basketId": basketId
                })
            })
            let responseJsonData = await response.json()
            return responseJsonData
        } catch (error) {
            console.log(error)
        }
    },
    async deleteProductInBasket(id) {
        try {
            let response = await fetch(`${URI}/command_line/${id}`, {
                method: 'DELETE'
            })
            let responseJsonData = await response.json()
            return responseJsonData
        } catch (error) {
            console.log(error)
        }
    },
    async getStripePK() {
        try {
            const response = await fetch('http://10.0.2.2:4242/config')
            const responseJsonData = await response.json()
            return responseJsonData
        } catch (error) {
            console.log(error)
        }
    }
}