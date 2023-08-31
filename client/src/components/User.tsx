import { Button, Col, Container, Row, Image, Badge, Stack } from 'react-bootstrap';
import Header from './Header';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/auth';
import CreateReview from './CreateReview';
import Select from './Select';
import { arrayReviews } from '../healpers/reviewers';
import CardReview from './CardReview';

function User() {
	const { t, i18n: {changeLanguage, language} } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(language);
	const {theme, setTheme} = useTheme();
	const params = useParams();
	const idUser = params.idUser;
	const [user, setUser] = useState<any|null>(null);
	const [showCreate, setShowCreate] = useState(false);

	const handleShow = () => setShowCreate(true);

	useEffect(() => {
		if (idUser) getUser(idUser, setUser)
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
								<Select />
								<Select />
								<Select />
								<Stack direction="horizontal" gap={1} className='flex-wrap'>
    								<Badge pill bg="primary-subtle">
    								  Primary
    								</Badge>
    								<Badge pill bg="secondary-subtle">
    								  Secondary
    								</Badge>
    								<Badge pill bg="success-subtle">
    								  Success
    								</Badge>
    								<Badge pill bg="danger">
    								  Danger
    								</Badge>
    								<Badge pill bg="warning" text="dark">
    								  Warning
    								</Badge>
    								<Badge pill bg="info">
    								  Info
    								</Badge>
    								<Badge pill bg="light" text="dark">
    								  Light
    								</Badge>
    								<Badge pill bg="dark">
    								  Dark
    								</Badge>
    							</Stack>
							</Col>
							<Col>
								{
									arrayReviews.map((el) => <CardReview key={el.id} id={el.id} img={el.img} name={el.nameReview} subtitle={el.title} score={el.score} postedDate={Intl.DateTimeFormat(currentLanguage).format(el.creationDate)} t={t}/>)
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