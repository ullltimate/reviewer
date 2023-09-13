import axios from "axios"

export const addImage = async (data: any, cloudName: string, setUrlImage: any) => {
	try {
        const  response  = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data);
        setUrlImage(response.data.url);
    } catch (error) {
        console.log(error)
    }
}