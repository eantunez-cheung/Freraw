const URI = "http://10.0.2.2:8000"

export default {
    async login(userName, password) {
        try {
            let response = await fetch(`${URI}/api/login`, {
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
    }
}