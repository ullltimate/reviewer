import { useEffect, useState } from "react";
import { getUserByToken } from "../api/auth";
import { IReview, IUser } from "../types/types";
import Header from "./Header";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import { filteredReviews, getAllTags, getReviewsByAutor } from "../api/reviews";
import { getLikesByAutor } from "../api/likes";
import { Container, Row, Col, Badge, Button, Image } from "react-bootstrap";
import CardReview from "./CardReview";
import CreateReview from "./CreateReview";
import Loader from "./Loader";
import Select from "./Select";
import Tags from "./Tags";
import { useNavigate } from "react-router-dom";

function Profile() {
    const accessToken = localStorage.getItem('accessToken');
    const [user, setUser] = useState<IUser | null>(null);
    const { t, i18n: {changeLanguage, language} } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(language);
	const {theme, setTheme} = useTheme();
    const [showCreate, setShowCreate] = useState<boolean>(false);
	const [reviewsByAutor, setReviewsByAutor] = useState<IReview[]>([]);
	const [allTags, setAllTags] = useState<any[]>([]);
	const [onTags, setOnTags] = useState<any[]>([]);
	const [edit, setEdit] = useState(false);
	const [editReview, setEditReview] = useState('');
	const [group, setGroup] = useState('');
	const [tag, setTag] = useState('');
	const [amoutLikes, setAmountLikes] = useState(0);
	const [isDeleted, setIsDeleted] = useState(false);
	const [sort, setSort] = useState('');
    const [warning, setWarning] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(accessToken) getUserByToken(accessToken, setUser, setWarning);
    }, [])

    useEffect(() => {
        if(warning){
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            localStorage.removeItem("loginWith");
        }
    },[warning])

	const handleShow = () => {setEdit(false); setShowCreate(true)};
	const handleShowEdit = (idReview: string) => {setEditReview(idReview); setEdit(true); setShowCreate(true)};

	useEffect(() => {
		if (user) {
			getAllTags(setAllTags, setOnTags)
			getReviewsByAutor(user._id, setReviewsByAutor);
			getLikesByAutor(user._id, setAmountLikes)
		}
	},[showCreate, user])

	useEffect(() => {
		if(tag != '') setOnTags(Array.from(new Set(onTags.concat(tag))))
	}, [tag])

	useEffect(() => {
		if(user) filteredReviews(user._id, group, onTags, setReviewsByAutor)
	},[group, onTags, isDeleted])

	useEffect(() => {
		if(sort === 'date') setReviewsByAutor(() => [...reviewsByAutor.sort((a,b) => b.creationDate - a.creationDate)]);
		if(sort === 'rating') setReviewsByAutor(() => [...reviewsByAutor.sort((a,b) => b.averageRating - a.averageRating)]);
	},[sort])

  	return (
  	  	<>
            <Header 
				currentLanguage={currentLanguage} 
				setCurrentLanguage={setCurrentLanguage} 
				changeLanguage={changeLanguage} 
				t={t} 
				theme={theme} 
				setTheme={setTheme}
			/>
  	  	    <Container>
				{
					user 
					? 
					<>
						<Row>
							<Col md={3} className='text-center'>
								<Image src={user.img} className='mt-3' style={{ maxWidth: '8rem' }} roundedCircle />
								<h5 className='mb-1'>{user.name}</h5>
								<Badge bg="danger" className='mb-1'><i className="bi bi-suit-heart-fill"></i> {amoutLikes}</Badge>
								<p className='mb-3'>{user.email}</p>
								<Button variant="outline-success" className='w-100 mb-3' onClick={() => handleShow()}>
      								{t('userPage.btnCreate')}
      							</Button>
								<Button variant="outline-success" className='w-100 mb-3' onClick={() => {setGroup(''); setTag(''); setOnTags(allTags); setSort('')}}>
									{t('userPage.btnReset')}
								</Button>
								<CreateReview show={showCreate} onHide={() => setShowCreate(false)} update={(edit) ? `${editReview}` : ''}/>
								<Select name={t('userPage.sort')} options={['rating', 'date']} value={sort} setValue={setSort}/>
								<Select name={t('userPage.groups')} options={['movies', 'books', 'games']} value={group} setValue={setGroup}/>
								<Select name={t('userPage.tags')} options={allTags} value={tag} setValue={setTag}/>
								<Tags tags={onTags} setOnTags={setOnTags}/>
							</Col>
							<Col>
								{   (reviewsByAutor.length != 0) 
									?
									reviewsByAutor.map((el) => <CardReview key={el._id} id={el._id} autor={el.idAutor} img={el.img} name={el.nameReview} subtitle={el.title} score={el.score} postedDate={Intl.DateTimeFormat(currentLanguage).format(el.creationDate)} t={t} handleShow={() => handleShowEdit(el._id)} setIsDeleted={setIsDeleted}/>)
									: <h3 className='text-center mt-3'>{t('userPage.reviewNotFound')}</h3>
								}
							</Col>
						</Row>
					</>
					: 
                    warning 
                    ?
                    <div className="text-center mt-5">
                        <h3 className="my-3">Token has expired!</h3>
                        <Button variant={theme === 'light' ? 'dark' : 'light'} onClick={() => navigate('/login')}>
                            Login again!
						</Button>
                    </div>
                    :
					<Loader />
				}
  	  	    </Container>
  	  	</>
  	)
}

export default Profile