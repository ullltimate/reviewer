import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CardReview(props:any) {

  	return (
  	  <>
		<Card className='my-3'>
            <Row>
                <Col md={3} style={{height: 200}}>
                    <Card.Img variant="top" src={props.img} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                </Col>
                <Col>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
      		        <Card.Text>{props.subtitle}</Card.Text>
                    <Card.Text className=''>{`Author's assessment: ${props.score}/10`}</Card.Text>
      		        <Button variant="link" className='px-0'><Link to={`/review/${props.id}`}>view more</Link></Button>
      		    </Card.Body>
                </Col>
            </Row>
    	</Card>
  	  </>
  	)
}

export default CardReview