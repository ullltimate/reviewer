import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useTheme } from '../hooks/useTheme';
import { getReview } from '../api/reviews';
import { IReview } from '../types/types';
import ReactStars from 'react-rating-star-with-type';
import { addRating, getRating } from '../api/rating';
import { addLikes, deleteLikes, getLikes } from '../api/likes';

function Review() {
    const params = useParams();
    const idReview: string | undefined = params.idReview;
    const [review, setReview] = useState<IReview>();
    const { t, i18n: {changeLanguage, language} } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(language);
    const {theme, setTheme} = useTheme();
    const user = localStorage.getItem('user');
    const [star, setStar] = useState(0);
    const [editStar, setEditStar] = useState(true);
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();
    const [userLike, setUserLike] = useState(false);
    const [amountLikes, setAmountLikes] = useState(0);

    useEffect(()=>{
        if (idReview) getReview(idReview, setReview);
    },[])

    useEffect(()=>{
        (user && idReview) ? getRating(idReview, setRating, JSON.parse(user)._id, setStar, setEditStar,) : (idReview) && getRating(idReview, setRating);
    },[star])

    useEffect(() => {
        (user && idReview) ? getLikes(idReview, setAmountLikes, JSON.parse(user)._id, setUserLike) : (idReview) && getLikes(idReview, setAmountLikes);
    },[userLike])

    function like(){
        if(user && idReview){
            if(userLike){
                deleteLikes(idReview, JSON.parse(user)._id);
                setUserLike(false);
            }else{
                (review) && addLikes(idReview, review.idAutor, JSON.parse(user)._id);
                setUserLike(true);
            }
        } else{
            navigate('/login');
        }
    }

    async function rate(nextValue: any){
        if(user && idReview){
            await addRating(idReview, JSON.parse(user)._id, nextValue);
            setStar(nextValue);
            setEditStar(false);
        } else {
            navigate('/login');
        }
    }

  	return (
  	  <>
		<Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} changeLanguage={changeLanguage} t={t} theme={theme} setTheme={setTheme}/>
        {
            review  && 
            <Container>
                <h2 className='my-5 text-center'>{review.nameReview}</h2>
                <Row className='mb-3'>
                    <Col md={4} style={{maxHeight: 400}}>
                        <Image src={review.img} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h3>{review.title}</h3>
                            </Col>
                            <Col className='text-end'>
                                <span>{rating}</span>
                                <i className="bi bi-star-fill text-warning"></i>
                                <ReactStars 
                                    key={`stars_${star}`}
                                    onChange={rate} 
                                    value={star}
                                    isEdit={editStar}  
                                    activeColors={["#ffc107"]} 
                                    style={{justifyContent: 'end'}}
                                    classNames='mt-2'
                                />
                            </Col>
                        </Row>
                        <p>{t('review.group')} {review.group}</p>
                        <p>{t('review.score')} {review.score}/10</p>
                        <p>{t('review.tags')} #{review.tags.map((e:any) => e).join('#')}</p>
                        <Row className='align-items-center'>
                            <Col>
                                <p className='mb-0'>{t('review.posted')} {Intl.DateTimeFormat(currentLanguage).format(review.creationDate)}</p>
                            </Col>
                            <Col className='text-end'>
                                <small><span className='text-secondary'>{amountLikes}</span></small>
                                <Button variant="outline-secondary border-0" onClick={() => like()}>
                                    <small><i className={`bi bi-heart${(userLike)?'-fill':''}`}></i></small>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <p className='text-justify'>{review.description}</p>
            </Container>
        }
  	  </>
  	)
}

export default Review