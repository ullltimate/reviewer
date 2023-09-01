import axios from "axios"
import { urlAPI } from "../healpers/healper";

export const getAllReviews = async (setAllReviews: any) => {
	try {
        const  response  = await axios.get(`${urlAPI}/api/reviews`)
        setAllReviews(response.data)
    } catch (error) {
        console.log(error)
    }
}