import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CardReview(props:any) {

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
                    <small className="text-muted">{props.t('cardReview.posted')} {props.postedDate}</small>
                </Card.Footer>
                </Col>
            </Row>
    	</Card>
  	  </>
  	)
}

export default CardReview