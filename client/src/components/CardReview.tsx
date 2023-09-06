import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { removeReview } from '../api/reviews';

function CardReview(props:any) {
    const user = localStorage.getItem('user');

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
                            <small><span className='text-secondary'>0</span></small>
                            <Button variant="outline-secondary border-0">
                                <small><i className="bi bi-heart"></i></small>
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