import { useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { addLikes, deleteLikes, getLikes } from "../api/likes";

function ButtonLike(props:any) {
    const navigate = useNavigate();
    const [userLike, setUserLike] = useState(false);
    const user = localStorage.getItem('user');

    useEffect(() => {
        (user) ? getLikes(props.idReview, props.setAmountLikes, JSON.parse(user)._id, setUserLike) : getLikes(props.idReview, props.setAmountLikes);
    },[userLike])

    function like(){
        if(user){
            if(userLike){
                deleteLikes(props.idReview, JSON.parse(user)._id);
                setUserLike(false);
            }else{
                addLikes(props.idReview, props.idAutor, JSON.parse(user)._id);
                setUserLike(true);
            }
        } else{
            navigate('/login');
        }
    }

  	return (
  	  <>
        <Button variant="outline-secondary border-0" onClick={() => like()}>
            <small><i className={`bi bi-heart${(userLike)?'-fill':''}`}></i></small>
        </Button>
  	  </>
  	)
}

export default ButtonLike