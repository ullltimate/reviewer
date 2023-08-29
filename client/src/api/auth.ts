import axios from "axios"

export const getUserDataGithub = async (accessToken: string, setUserDataGithub:any) => {
	try {
        const  data  = await axios.get(`http://localhost:7000/api/auth/github/userData?accessToken=${accessToken}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        console.log(data.data)
        setUserDataGithub(data.data)
    } catch (error) {
        console.log(error)
    }
}