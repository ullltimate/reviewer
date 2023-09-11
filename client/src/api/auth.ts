import axios from "axios";
import { urlAPI } from "../healpers/healper";

export const getUser = async (_id: string, setUser: any) => {
	try {
        const  response  = await axios.post(`${urlAPI}/api/auth/login`, {
            _id,
        })
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user))
        setUser(response.data.user)
    } catch (error) {
        console.log(error)
    }
}

export const getUserGoogle = async (accessToken: string, navigate: any, setLoading: any) => {
    try {
        setLoading(true);
        const response = await axios.get(`${urlAPI}/api/auth/google/userData?accessToken=${accessToken}`, {
		    headers: {
		    	"Content-Type": "application/json",
		    },
	    })
        setLoading(false);
        navigate(`/user/${response.data}`)
    } catch(error){
        console.log(error)
    }
}
