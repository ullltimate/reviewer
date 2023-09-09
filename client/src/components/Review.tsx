import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import { Col, Container, Row, Image, Button, InputGroup, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useTheme } from '../hooks/useTheme';
import { getReview, removeReview } from '../api/reviews';
import { IReview } from '../types/types';
import ReactStars from 'react-rating-star-with-type';
import { addRating, getRating } from '../api/rating';
import { addLikes, deleteLikes, getLikes } from '../api/likes';
import CreateReview from './CreateReview';
import { addComment, getComments } from '../api/comments';
import { checkInputs, resetInputs } from '../healpers/healper';
import CardComment from './CardComment';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

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
    const [showCreate, setShowCreate] = useState<boolean>(false);
    const [edit, setEdit] = useState(false);
	const [editReview, setEditReview] = useState('');
    const [newComment, setNewComment] = useState('');
    const [warning, setWarning] = useState(false);
    const [comments, setComments] = useState<any[]>();

    useEffect(()=>{
        if (idReview) getReview(idReview, setReview);
    },[showCreate])

    useEffect(() => {
        idReview && setInterval(() => getComments(idReview, setComments), 2000);
    },[])

    useEffect(()=>{
        (user && idReview) ? getRating(idReview, setRating, JSON.parse(user)._id, setStar, setEditStar,) : (idReview) && getRating(idReview, setRating);
    },[star])

    useEffect(() => {
        (user && idReview) ? getLikes(idReview, setAmountLikes, JSON.parse(user)._id, setUserLike) : (idReview) && getLikes(idReview, setAmountLikes);
    },[userLike])

    const handleShowEdit = (idReview: string) => {setEditReview(idReview); setEdit(true); setShowCreate(true)};

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

    async function sendComment() {
        if(user && idReview){
            if (checkInputs([newComment])){
                await addComment(idReview, JSON.parse(user)._id, JSON.parse(user).name, newComment);
                resetInputs([setNewComment]);
                setWarning(false)
            } else {
                setWarning(true)
            }
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
                                {
                                user && 
                                (JSON.parse(user)._id === review.idAutor) 
                                ? 
                                    <>
                                        <Button variant="outline-secondary border-0" onClick={() => handleShowEdit(review._id)}>
                                            <small><i className="bi bi-pencil-square"></i></small>
                                        </Button>
                                        <Button variant="outline-secondary border-0" onClick={() => {removeReview(review._id); navigate(`/user/${JSON.parse(user)._id}`)}}>
                                            <small><i className="bi bi-trash3"></i></small>
                                        </Button>
                                    </>
                                : ''
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <ReactMarkdown children={review.description}></ReactMarkdown>
                <CreateReview show={showCreate} onHide={() => setShowCreate(false)} update={(edit) ? `${editReview}` : ''}/>
                <h4>{t('review.comments')} {comments ? comments.length : 0}</h4>
                {
                comments 
                && 
                comments.map((el:any)=><CardComment key={el._id} nameUser={el.nameUser} comment={el.comment}/>)
                }
                {warning ? <p className='text-danger'>{t('review.commentWarning')}</p> : ''}
                <InputGroup className="mb-3">
                    <Form.Control
                      placeholder={t('review.commentInput')}
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      required
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={sendComment}>
                        <i className="bi bi-send-fill"></i>
                        {t('review.commentBtn')}
                    </Button>
                </InputGroup>
            </Container>
        }
  	  </>
  	)
}

export default Review