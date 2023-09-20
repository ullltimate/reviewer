import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { removeReview } from '../api/reviews';
import { useState } from 'react';
import ButtonLike from './ButtonLike';
import ButtonRating from './ButtonRating';

function CardReview(props:any) {
    const user = localStorage.getItem('user');
    const [amountLikes, setAmountLikes] = useState(0);
    const [rating, setRating] = useState(0);

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
                            <span>{`${rating.toFixed(1)} `}</span>
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
                            <ButtonRating idReview={props.id} setRating={setRating}/>
                        </Col>
                    </Row>
      		    </Card.Body>
                <Card.Footer>
                    <Row className='align-items-center'>
                        <Col>
                            <small className="text-muted">{props.t('cardReview.posted')} {props.postedDate}</small>
                        </Col>
                        <Col className='p-0 text-end'>
                            <ButtonLike idReview={props.id} setAmountLikes={setAmountLikes} idAutor={props.autor}/>
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