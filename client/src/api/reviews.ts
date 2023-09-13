import axios from "axios"
import { urlAPI } from "../healpers/healper";
import { removeLikes } from "./likes";
import { removeComments } from "./comments";

export const getAllTags = async (setAllTags: any, setOnTags: any) => {
	try {
        const  response  = await axios.get(`${urlAPI}/api/reviews`)
        setAllTags(Array.from(new Set(response.data.map((el:any)=>el.tags).flat())).concat([[]]))
        setOnTags(Array.from(new Set(response.data.map((el:any)=>el.tags).flat())).concat([[]]))
    } catch (error) {
        console.log(error)
    }
}

export const filteredByTags = async (tags: any[], key: string, setAllReviews:any, setAmountAllReviews: any) => {
    try {
        const response = await axios.post(`${urlAPI}/api/reviews/filterTags`, {
            tags
        })
        if (key === 'recent'){
            setAllReviews(() => [...response.data.sort((a: any, b: any) => b.creationDate - a.creationDate)]);
        } else {
            setAllReviews(() => [...response.data.sort((a: any, b: any) => b.averageRating - a.averageRating)]);
        }
        setAllReviews(response.data);
        setAmountAllReviews(response.data.length);
    } catch (error) {
        console.log(error)
    }
}

export const getReviewsByAutor = async (idAutor: string, setReviewsByAutor: any) => {
    try {
        const  response  = await axios.post(`${urlAPI}/api/reviews/autor`, {
            idAutor,
        })
        setReviewsByAutor(response.data)
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

export const createReview = async (nameReview: string, title: string, group: string, score: number, tags: string[], description: string, idAutor: string, img: string) => {
	try {
        const response  = await axios.post(`${urlAPI}/api/reviews/newReview`, {
            nameReview,
            title,
            group,
            tags,
            description,
            img,
            score,
            idAutor
        })
        console.log(response.data.message)
    } catch (error) {
        console.log(error)
    }
}

export const removeReview = async (id: string, setIsDeleted?: any) => {
    try {
        const response = await axios.delete(`${urlAPI}/api/reviews/${id}`);
        console.log(response.data)
        await removeLikes(id);
        await removeComments(id);
        if (setIsDeleted) setIsDeleted(true);
    } catch (error) {
        console.log(error)
    }
}

export const updateReview = async (id: string, nameReview: string, title: string, group: string, score: number, tags: string[], description: string, img: string) => {
    try {
        const response = await axios.put(`${urlAPI}/api/reviews/${id}`, {
            nameReview,
            title,
            group,
            tags,
            description,
            img,
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
    } catch (error) {
        console.log(error)
    }
}

export const updateRatingReview = async (id: string, averageRating: number) => {
    try {
        const response = await axios.put(`${urlAPI}/api/reviews/rating/${id}`, {
            averageRating
        })
        response.data
    } catch (error) {
        console.log(error)
    }
}

export const getSearchReview = async (searchString: string, setSearchResults: any) => {
    try {
        const  response  = await axios.post(`${urlAPI}/api/reviews/search`, {
            searchString,
        })
        const responseComments = await axios.post(`${urlAPI}/api/comments/search`, {
            searchString,
        })
        setSearchResults(Array.from(new Set(response.data.concat(responseComments.data).map((el:any) => JSON.stringify(el)))).map((el: any) => JSON.parse(el)))
    } catch (error) {
        console.log(error)
    }
}