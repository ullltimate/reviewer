import axios from "axios"
import { urlAPI } from "../healpers/healper";

export const getLikes = async (idReview: string, setAmountLikes: any, userId?:string ,setUserLike?: any) => {
	try {
        const  response  = await axios.get(`${urlAPI}/api/likes/${idReview}`);
        if (response.data === 0){
            setAmountLikes(response.data)
        } else {
            setAmountLikes(response.data.likes.length)
            if(userId){
                setUserLike(response.data.likes.includes(userId))
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteLikes = async (idReview: string, likes: string) => {
	try {
        const  response  = await axios.put(`${urlAPI}/api/likes/`, {
            idReview,
            likes
        });
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

export const addLikes = async (idReview: string, idAutor: string, likes: string) => {
	try {
        const  response  = await axios.post(`${urlAPI}/api/likes/`, {
            idReview,
            idAutor,
            likes
        });
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

export const getLikesByAutor = async (idAutor: string, setAmountLikes: any) => {
	try {
        const  response  = await axios.get(`${urlAPI}/api/likes/autor/${idAutor}`);
        setAmountLikes(response.data.map((el: any) => el.likes).flat().length)
    } catch (error) {
        console.log(error)
    }
}

export const removeLikes = async (idReview: string) => {
    try {
        const response = await axios.delete(`${urlAPI}/api/likes/${idReview}`);
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}