import { useEffect, useState } from 'react';
import ReactStars from 'react-rating-star-with-type';
import { useNavigate } from 'react-router-dom';
import { getRating, addRating } from '../api/rating';

function ButtonRating(props:any) {
    const user = localStorage.getItem('user');
    const [star, setStar] = useState(0);
    const [editStar, setEditStar] = useState(true);
    const navigate = useNavigate();


    useEffect(()=>{
        (user && props.idReview) ? getRating(props.idReview, props.setRating, JSON.parse(user)._id, setStar, setEditStar,) : (props.idReview) && getRating(props.idReview, props.setRating);
    },[star])
    
    async function rate(nextValue: any){
        if(user && props.idReview){
            await addRating(props.idReview, JSON.parse(user)._id, nextValue);
            setStar(nextValue);
            setEditStar(false);
        } else {
            navigate('/login');
        }
    }

  	return (
  	  <>
        <ReactStars 
            key={`stars_${star}`}
            onChange={rate} 
            value={star}
            isEdit={editStar}  
            activeColors={["#ffc107"]} 
            style={{justifyContent: 'end'}}
        />
  	  </>
  	)
}

export default ButtonRating