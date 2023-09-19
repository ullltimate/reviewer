import axios from "axios";
import { urlAPI } from "../healpers/healper";

export const getUser = async (_id: string, setUser: any) => {
	try {
        const  response  = await axios.post(`${urlAPI}/api/auth/login`, {
            _id,
        })
        setUser(response.data.user)
    } catch (error) {
        console.log(error)
    }
}

export const getUserGoogle = async (accessToken: string, navigate:any, setLoading: any) => {
    try {
        setLoading(true);
        const response = await axios.get(`${urlAPI}/api/auth/google/userData?accessToken=${accessToken}`, {
		    headers: {
		    	"Content-Type": "application/json",
		    },
	    })
        await getToken(response.data);
        setLoading(false);
        navigate('/profile');
    } catch(error){
        console.log(error)
    }
}

export const getToken = async (_id: string) => {
	try {
        const  response  = await axios.post(`${urlAPI}/api/auth/login`, {
            _id,
        })
        localStorage.setItem('accessToken', response.data.token);
    } catch (error) {
        console.log(error)
    }
}

export const getUserByToken = async (token: string, setUser: any, setWarning: any) => {
	try {
        const  response  = await axios.post(`${urlAPI}/api/auth/auth`, {
            token,
        })
        localStorage.setItem('user', JSON.stringify(response.data))
        setUser(response.data)
    } catch (error: any) {
        console.log(error.response.data.message)
        setWarning(true);
    }
}

export const getAllUsers = async (setUsers: any) => {
	try {
        const  response  = await axios.get(`${urlAPI}/api/auth/users`)
        setUsers(response.data)
    } catch (error: any) {
        console.log(error.response.data.message)
    }
}