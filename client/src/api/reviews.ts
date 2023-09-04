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

export const getReviewsByAutor = async (idAutor: string, setAllTags: any, setOnTags: any) => {
    try {
        const  response  = await axios.post(`${urlAPI}/api/reviews/autor`, {
            idAutor,
        })
        setAllTags(Array.from(new Set(response.data.map((el:any)=>el.tags).flat())).concat([[]]))
        setOnTags(Array.from(new Set(response.data.map((el:any)=>el.tags).flat())).concat([[]]))
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

export const removeReview = async (id: string) => {
    try {
        const response = await axios.delete(`${urlAPI}/api/reviews/${id}`);
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

export const updateReview = async (id: string, nameReview: string, title: string, group: string, score: number, tags: string[], description: string) => {
    try {
        const response = await axios.put(`${urlAPI}/api/reviews/${id}`, {
            nameReview,
            title,
            group,
            tags,
            description,
            score,
        })
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

export const filteredReviews = async (idAutor: string, group: string, tags: any[], setReviewsByAutor:any) => {
    try {
        const response = await axios.post(`${urlAPI}/api/reviews/filters`, {
            idAutor,
            group,
            tags
        })
        setReviewsByAutor(response.data)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}