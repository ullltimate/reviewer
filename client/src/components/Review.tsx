import { useParams } from 'react-router-dom';
import Header from './Header';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { arrayReviews } from '../healpers/reviewers';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

function Review() {
    const params = useParams();
    const [review, setReview] = useState<any>();
    const { t, i18n: {changeLanguage, language} } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(language);

    useEffect(()=>{
        setReview(arrayReviews.find((el) => String(el.id) === params.idReview))
    },[])

  	return (
  	  <>
		<Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} changeLanguage={changeLanguage} t={t}/>
        {
            review  && 
            <Container>
                <h2 className='my-5 text-center'>{review.nameReview}</h2>
                <Row className='mb-3'>
                    <Col md={4} style={{maxHeight: 400}}>
                        <Image src={review.img} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                    </Col>
                    <Col>
                        <h3>{review.title}</h3>
                        <p>{t('review.group')} {review.group}</p>
                        <p>{t('review.score')} {review.score}/10</p>
                        <p>{t('review.tags')} #{review.tags.map((e:any) => e).join('#')}</p>
                    </Col>
                </Row>
                <p className='text-justify'>{review.description}</p>
            </Container>
        }
  	  </>
  	)
}

export default Review