import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { removeReview } from '../api/reviews';
import { useEffect, useState } from 'react';
import { addLikes, deleteLikes, getLikes } from '../api/likes';
import ReactStars from 'react-rating-star-with-type';
import { addRating, getRating } from '../api/rating';

function CardReview(props:any) {
    const user = localStorage.getItem('user');
    const [amountLikes, setAmountLikes] = useState(0);
    const navigate = useNavigate();
    const [userLike, setUserLike] = useState(false);
    const [star, setStar] = useState(0);
    const [editStar, setEditStar] = useState(true);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        (user) ? getLikes(props.id, setAmountLikes, JSON.parse(user)._id, setUserLike) : getLikes(props.id, setAmountLikes);
    },[userLike])

    useEffect(()=>{
        (user) ? getRating(props.id, setRating, JSON.parse(user)._id, setStar, setEditStar,) : getRating(props.id, setRating);
    },[star])

    function like(){
        if(user){
            if(userLike){
                deleteLikes(props.id, JSON.parse(user)._id);
                setUserLike(false);
            }else{
                addLikes(props.id, props.autor, JSON.parse(user)._id);
                setUserLike(true);
            }
        } else{
            navigate('/login');
        }
    }

    async function rate(nextValue: any){
        if(user){
            await addRating(props.id, JSON.parse(user)._id, nextValue);
            setStar(nextValue);
            setEditStar(false);
        } else {
            navigate('/login');
        }
    }

  	return (
  	  <>
		<Card className='my-3'>
            <Row className='align-items-center'>
                <Col md={3} style={{height: 200}}>
                    <Card.Img variant="top" src={props.img} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                </Col>
                <Col>
                <Card.Body className='pb-0'>
                    <Row>
                        <Col>
                            <Card.Title>{props.name}</Card.Title>
                        </Col>
                        <Col className='text-end' md={2}>
                            <span>{rating.toFixed(1)}</span>
                            <i className="bi bi-star-fill text-warning"></i>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card.Text>{props.subtitle}</Card.Text>
                        </Col>
                        <Col className='text-end'>
                            <small><span className='text-secondary'>{props.t('cardReview.like')} {amountLikes}</span></small>
                        </Col>
                    </Row>
                    <Card.Text className='mt-3'>{`${props.t('cardReview.score')} ${props.score}/10`}</Card.Text>
                    <Row className='align-items-center justify-content-between'>
                        <Col>
                            <Button variant="link" className='px-0'><Link to={`/review/${props.id}`}>{props.t('cardReview.viewMore')}</Link></Button>
                        </Col>
                        <Col>
                            <ReactStars 
                                key={`stars_${star}`}
                                onChange={rate} 
                                value={star}
                                isEdit={editStar}  
                                activeColors={["#ffc107"]} 
                                style={{justifyContent: 'end'}}
                            />
                        </Col>
                    </Row>
      		    </Card.Body>
                <Card.Footer>
                    <Row className='align-items-center'>
                        <Col>
                            <small className="text-muted">{props.t('cardReview.posted')} {props.postedDate}</small>
                        </Col>
                        <Col className='p-0 text-end'>
                            <Button variant="outline-secondary border-0" onClick={() => like()}>
                                <small><i className={`bi bi-heart${(userLike)?'-fill':''}`}></i></small>
                            </Button>
                            {
                                user
                                &&
                                ((JSON.parse(user)._id === props.autor) || (JSON.parse(user).isAdmin === 'true'))
                                ? 
                                    <>
                                        <Button variant="outline-secondary border-0" onClick={() => props.handleShow()}>
                                            <small><i className="bi bi-pencil-square"></i></small>
                                        </Button>
                                        <Button variant="outline-secondary border-0" onClick={() => removeReview(props.id, props.setIsDeleted)}>
                                            <small><i className="bi bi-trash3"></i></small>
                                        </Button>
                                    </>
                                : ""
                            }
                        </Col>
                    </Row>
                </Card.Footer>
                </Col>
            </Row>
    	</Card>
  	  </>
  	)
}

export default CardReview