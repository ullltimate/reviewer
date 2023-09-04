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
import { getReviewsByAutor } from '../api/reviews';
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
	const [allTags, setAllTags] = useState<string[]>([]);

	const handleShow = () => setShowCreate(true);

	useEffect(() => {
		if (idUser) {
			getUser(idUser, setUser);
			getReviewsByAutor(idUser, setReviewsByAutor, setAllTags);
		}
	},[])

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
								<Button variant="outline-success" className='mb-3' onClick={() => handleShow()}>
      								Create review
      							</Button>
								<CreateReview show={showCreate} onHide={() => setShowCreate(false)}/>
								<Select name={'Sort by:'} options={['raiting', 'date']}/>
								<Select name={'Group:'} options={['movies', 'books', 'games']}/>
								<Select name={'Tags:'} options={allTags}/>
								<Tags tags={allTags}/>
							</Col>
							<Col>
								{
									reviewsByAutor.map((el) => <CardReview key={el._id} id={el._id} autor={el.idAutor} img={el.img} name={el.nameReview} subtitle={el.title} score={el.score} postedDate={Intl.DateTimeFormat(currentLanguage).format(el.creationDate)} t={t}/>)
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