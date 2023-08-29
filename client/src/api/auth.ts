import axios from "axios"

export const getUser = async (_id: string, setUser: any) => {
	try {
        const  response  = await axios.post(`http://localhost:7000/api/auth/login`, {
            _id,
        })
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user))
        setUser(response.data.user)
    } catch (error) {
        console.log(error)
    }
}