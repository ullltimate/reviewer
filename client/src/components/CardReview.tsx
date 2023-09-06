import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { removeReview } from '../api/reviews';
import { useEffect, useState } from 'react';
import { addLikes, deleteLikes, getLikes } from '../api/likes';

function CardReview(props:any) {
    const user = localStorage.getItem('user');
    const [amountLikes, setAmountLikes] = useState(0);
    const navigate = useNavigate();
    const [userLike, setUserLike] = useState(false);
    //console.log(props.id)
    //console.log(props.autor)
    useEffect(() => {
        (user) ? getLikes(props.id, setAmountLikes, JSON.parse(user)._id, setUserLike) : getLikes(props.id, setAmountLikes)
    },[userLike])

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
            navigate('/login')
        }
    }
    //console.log(userLike)

  	return (
  	  <>
		<Card className='my-3'>
            <Row className='align-items-center'>
                <Col md={3} style={{height: 200}}>
                    <Card.Img variant="top" src={props.img} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                </Col>
                <Col>
                <Card.Body className='pb-0'>
                    <Card.Title>{props.name}</Card.Title>
      		        <Card.Text>{props.subtitle}</Card.Text>
                    <Card.Text className=''>{`${props.t('cardReview.score')} ${props.score}/10`}</Card.Text>
      		        <Button variant="link" className='px-0'><Link to={`/review/${props.id}`}>{props.t('cardReview.viewMore')}</Link></Button>
      		    </Card.Body>
                <Card.Footer>
                    <Row className='align-items-center'>
                        <Col>
                            <small className="text-muted">{props.t('cardReview.posted')} {props.postedDate}</small>
                        </Col>
                        <Col className='p-0 text-end'>
                            <small><span className='text-secondary'>{amountLikes}</span></small>
                            <Button variant="outline-secondary border-0" onClick={() => like()}>
                                <small><i className={`bi bi-heart${(userLike)?'-fill':''}`}></i></small>
                            </Button>
                            {
                                user && 
                                (JSON.parse(user)._id === props.autor) 
                                ? 
                                    <>
                                        <Button variant="outline-secondary border-0" onClick={() => props.handleShow()}>
                                            <small><i className="bi bi-pencil-square"></i></small>
                                        </Button>
                                        <Button variant="outline-secondary border-0" onClick={() => removeReview(props.id)}>
                                            <small><i className="bi bi-trash3"></i></small>
                                        </Button>
                                    </>
                                : ''
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