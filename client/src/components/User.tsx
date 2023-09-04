import { Button, Col, Container, Row, Image, Badge } from 'react-bootstrap';
import Header from './Header';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/auth';
import CreateReview from './CreateReview';
import Select from './Select';
import CardReview from './CardReview';
import Tags from './Tags';
import { filteredReviews, getReviewsByAutor } from '../api/reviews';
import { IReview, IUser } from '../types/types';

function User() {
	const { t, i18n: {changeLanguage, language} } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(language);
	const {theme, setTheme} = useTheme();
	const params = useParams();
	const idUser = params.idUser;
	const [user, setUser] = useState<IUser|null>(null);
	const [showCreate, setShowCreate] = useState<boolean>(false);
	const [reviewsByAutor, setReviewsByAutor] = useState<IReview[]>([]);
	const [allTags, setAllTags] = useState<any[]>([]);
	const [onTags, setOnTags] = useState<any[]>([]);
	const [edit, setEdit] = useState(false);
	const [editReview, setEditReview] = useState('');
	const [group, setGroup] = useState('');
	const [tag, setTag] = useState('');

	const handleShow = () => {setEdit(false); setShowCreate(true)};
	const handleShowEdit = (idReview: string) => {setEditReview(idReview); setEdit(true); setShowCreate(true)};

	useEffect(() => {
		if (idUser) {
			getUser(idUser, setUser);
			getReviewsByAutor(idUser, setAllTags, setOnTags);
		}
	},[])

	useEffect(() => {
		if(tag != '') setOnTags(Array.from(new Set(onTags.concat(tag))))
	}, [tag])
	console.log(reviewsByAutor)

	useEffect(() => {
		if(idUser) filteredReviews(idUser, group, onTags, setReviewsByAutor)
	},[group, onTags])

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
					user &&
					<>
						<Row>
							<Col md={3} className='text-center'>
								<Image src={user.img} className='mt-3' style={{ maxWidth: '8rem' }} roundedCircle />
								<h5 className='mb-1'>{user.name}</h5>
								<Badge bg="danger" className='mb-1'><i className="bi bi-suit-heart"></i>{'300'}</Badge>
								<p className='mb-3'>{user.email}</p>
								<Button variant="outline-success" className='w-100 mb-3' onClick={() => handleShow()}>
      								Create review
      							</Button>
								<Button variant="outline-success" className='w-100 mb-3' onClick={() => {setGroup(''); setTag(''); setOnTags(allTags)}}>
									Reset filters
								</Button>
								<CreateReview show={showCreate} onHide={() => setShowCreate(false)} update={(edit) ? `${editReview}` : ''}/>
								<Select name={'Sort by:'} options={['raiting', 'date']}/>
								<Select name={'Group:'} options={['movies', 'books', 'games']} value={group} setValue={setGroup}/>
								<Select name={'Tags:'} options={allTags} value={tag} setValue={setTag}/>
								<Tags tags={onTags} setOnTags={setOnTags}/>
							</Col>
							<Col>
								{   (reviewsByAutor.length != 0) 
									?
									reviewsByAutor.map((el) => <CardReview key={el._id} id={el._id} autor={el.idAutor} img={el.img} name={el.nameReview} subtitle={el.title} score={el.score} postedDate={Intl.DateTimeFormat(currentLanguage).format(el.creationDate)} t={t} handleShow={() => handleShowEdit(el._id)}/>)
									: <h3 className='text-center mt-3'>Reviews with this filters not found</h3>
								}
							</Col>
						</Row>
					</>
				}
  	  	    </Container>
  	  	</>
  	)
}

export default User