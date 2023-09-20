import { useEffect, useState } from "react";
import {Badge, Image } from "react-bootstrap";
import { getLikesByAutor } from "../api/likes";

function UserInfo(props:any) {
	const [amoutLikes, setAmountLikes] = useState(0);

    useEffect(() => {
		getLikesByAutor(props.user._id, setAmountLikes)
	},[])

  	return (
  	  <>
		<Image src={props.user.img} className='mt-3' style={{ maxWidth: '8rem' }} roundedCircle />
		<h5 className='mb-1'>{props.user.name}</h5>
		<Badge bg="danger" className='mb-1'><i className="bi bi-suit-heart-fill"></i> {amoutLikes}</Badge>
		<p className='mb-3'>{props.user.email}</p>
  	  </>
  	)
}

export default UserInfo