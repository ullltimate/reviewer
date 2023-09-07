import axios from "axios"
import { urlAPI } from "../healpers/healper";

export const getRating = async (idReview: string, setRating: any, idUser?: string, setStar?: any, setEditStar?: any,) => {
	try {
        const  response  = await axios.get(`${urlAPI}/api/ratings/${idReview}`);
        if (response.data != 'not fount raiting this review'){
            if(idUser){
                if(response.data.rating.filter((el: any) => el.idUser === idUser)[0]){
                    setStar(response.data.rating.filter((el: any) => el.idUser === idUser)[0].score);
                    setEditStar(false)
                }
            }
            setRating(response.data.rating.map((el:any) => el.score).reduce((acc: any, number: any) => acc + number, 0)/response.data.rating.length)
        } else {
            setRating(0)
        }
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

export const addRating = async (idReview: string, idUser: string, score: string) => {
	try {
        const  response  = await axios.post(`${urlAPI}/api/ratings`, {
            idReview,
            idUser,
            score
        });
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}