import { Col, Container, Row } from 'react-bootstrap';
import Header from './Header';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/auth';
import CreateReview from './CreateReview';
import CardReview from './CardReview';
import { getAllTags, getReviewsByAutor } from '../api/reviews';
import { IReview, IUser } from '../types/types';
import Loader from './Loader';
import { convertDate } from '../healpers/healper';
import UserInfo from './UserInfo';
import FiltersPanel from './FiltersPanel';

function User() {
	const { t, i18n: {language} } = useTranslation();
	const params = useParams();
	const idUser = params.idUser;
	const [user, setUser] = useState<IUser|null>(null);
	const [showCreate, setShowCreate] = useState<boolean>(false);
	const [reviewsByAutor, setReviewsByAutor] = useState<IReview[]>([]);
	const [allTags, setAllTags] = useState<any[]>([]);
	const [onTags, setOnTags] = useState<any[]>([]);
	const [edit, setEdit] = useState(false);
	const [editReview, setEditReview] = useState('');
	const [isDeleted, setIsDeleted] = useState(false);

	const handleShow = () => {setEdit(false); setShowCreate(true)};
	const handleShowEdit = (idReview: string) => {setEditReview(idReview); setEdit(true); setShowCreate(true)};

	useEffect(() => {
		if (idUser) {
			getUser(idUser, setUser);
			getAllTags(setAllTags, setOnTags)
			getReviewsByAutor(idUser, setReviewsByAutor);
		}
	},[showCreate])

  	return (
  	  	<>
  	  		<Header />
  	  	    <Container>
				{
					user 
					? 
					<Row>
						<Col md={3} className='text-center'>
							<UserInfo user={user}/>
							<CreateReview show={showCreate} onHide={() => setShowCreate(false)} update={(edit) ? `${editReview}` : ''} alltags={allTags} />
							<FiltersPanel onTags={onTags} setOnTags={setOnTags} handleShow={handleShow} allTags={allTags} idUser={idUser} isDeleted={isDeleted} setReviewsByAutor={setReviewsByAutor} reviewsByAutor={reviewsByAutor}/>
						</Col>
						<Col>
							{   
								(reviewsByAutor.length != 0) 
								?
								reviewsByAutor.map((el) => <CardReview key={el._id} id={el._id} autor={el.idAutor} img={el.img} name={el.nameReview} subtitle={el.title} score={el.score} postedDate={convertDate(language, el.creationDate)} t={t} handleShow={() => handleShowEdit(el._id)} setIsDeleted={setIsDeleted}/>)
								: <h3 className='text-center mt-3'>{t('userPage.reviewNotFound')}</h3>
							}
						</Col>
					</Row>
					: 
					<Loader />
				}
  	  	    </Container>
  	  	</>
  	)
}

export default User