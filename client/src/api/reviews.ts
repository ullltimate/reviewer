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

export const getReviewsByAutor = async (idAutor: string, setReviewsByAutor: any, setAllTags: any) => {
    try {
        const  response  = await axios.post(`${urlAPI}/api/reviews/autor`, {
            idAutor,
        })
        setReviewsByAutor(response.data)
        setAllTags(Array.from(new Set(response.data.map((el:any)=>el.tags).flat())))
    } catch (error) {
        console.log(error)
    }
}

export const getReview = async (id: string, setReview: any) => {
	try {
        const  response  = await axios.get(`${urlAPI}/api/reviews/${id}`)
        setReview(response.data)
    } catch (error) {
        console.log(error)
    }
}

export const createReview = async (nameReview: string, title: string, group: string, score: number, tags: string[], description: string, idAutor: string) => {
	try {
        const response  = await axios.post(`${urlAPI}/api/reviews/newReview`, {
            nameReview,
            title,
            group,
            tags,
            description,
            score,
            idAutor
        })
        console.log(response.data.message)
    } catch (error) {
        console.log(error)
    }
}