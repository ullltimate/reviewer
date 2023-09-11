import axios from "axios"
import { urlAPI } from "../healpers/healper";

export const getComments = async (idReview: string, setComments: any) => {
	try {
        const  response  = await axios.get(`${urlAPI}/api/comments/${idReview}`);
        if (response.data.comments){
            setComments(response.data.comments)
        } else {
            setComments([]);
        }
    } catch (error) {
        console.log(error)
    }
}

export const addComment = async (idReview: string, idUser: string, nameUser: string, comment: string) => {
	try {
        const  response  = await axios.post(`${urlAPI}/api/comments`, {
            idReview,
            idUser,
            nameUser,
            comment
        });
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}