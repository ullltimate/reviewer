import { useParams } from 'react-router-dom';
import Header from './Header';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { arrayReviews } from '../healpers/reviewers';
import { useEffect, useState } from 'react';

function Review() {
    const params = useParams();
    const [review, setReview] = useState<any>();

    useEffect(()=>{
        setReview(arrayReviews.find((el) => String(el.id) === params.idReview))
    },[])

  	return (
  	  <>
		<Header />
        {
            review  && 
            <Container>
                <h2 className='my-5 text-center'>{review.nameReview}</h2>
                <Row>
                    <Col md={4} style={{maxHeight: 300}}>
                        <Image src={review.img} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                    </Col>
                    <Col>
                        <h3>{review.title}</h3>
                        <p>Group: {review.group}</p>
                        <p>Author's assessment: {review.score}/10</p>
                        <p>Tags: #{review.tags.map((e:any) => e).join('#')}</p>
                    </Col>
                </Row>
                <p>{review.description}</p>
            </Container>
        }
  	  </>
  	)
}

export default Review