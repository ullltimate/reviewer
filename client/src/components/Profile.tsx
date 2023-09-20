import { useEffect, useState } from "react";
import { getUserByToken } from "../api/auth";
import { IReview, IUser } from "../types/types";
import Header from "./Header";
import { useTranslation } from "react-i18next";
import { getAllTags, getReviewsByAutor } from "../api/reviews";
import { Container, Row, Col, Button } from "react-bootstrap";
import CardReview from "./CardReview";
import CreateReview from "./CreateReview";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import { convertDate } from "../healpers/healper";
import UserInfo from "./UserInfo";
import FiltersPanel from "./FiltersPanel";

function Profile() {
    const accessToken = localStorage.getItem('accessToken');
    const [user, setUser] = useState<IUser | null>(null);
    const { t, i18n: {language} } = useTranslation();
    const [showCreate, setShowCreate] = useState<boolean>(false);
	const [reviewsByAutor, setReviewsByAutor] = useState<IReview[]>([]);
	const [allTags, setAllTags] = useState<any[]>([]);
	const [onTags, setOnTags] = useState<any[]>([]);
	const [edit, setEdit] = useState(false);
	const [editReview, setEditReview] = useState('');
	const [isDeleted, setIsDeleted] = useState(false);
    const [warning, setWarning] = useState(false);
    const navigate = useNavigate();
    const [adminPanel, setAdminPanel] = useState(false);
    
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
		}
	},[showCreate, user])

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
                            {
                                user.isAdmin === 'true'
                                &&
                                <>
                                    <Button variant="outline-danger" className='w-100 mb-3' onClick={() => setAdminPanel(true)}>
                                        {t('adminPanel.btnAdmin')}
                                    </Button>
                                    <Button variant="outline-danger" className='w-100 mb-3' onClick={() => setAdminPanel(false)}>
                                        {t('adminPanel.btnReview')}
                                    </Button>
                                </>
                            }
							<CreateReview show={showCreate} onHide={() => setShowCreate(false)} update={(edit) ? `${editReview}` : ''} alltags={allTags}/>
							<FiltersPanel onTags={onTags} setOnTags={setOnTags} handleShow={handleShow} allTags={allTags} idUser={user._id} isDeleted={isDeleted} setReviewsByAutor={setReviewsByAutor} reviewsByAutor={reviewsByAutor}/>
						</Col>
						<Col>
							{   
                                adminPanel 
                                ?
                                <AdminPanel />
                                :
                                (reviewsByAutor.length != 0) 
								?
								reviewsByAutor.map((el) => <CardReview key={el._id} id={el._id} autor={el.idAutor} img={el.img} name={el.nameReview} subtitle={el.title} score={el.score} postedDate={convertDate(language, el.creationDate)} t={t} handleShow={() => handleShowEdit(el._id)} setIsDeleted={setIsDeleted}/>)
								: <h3 className='text-center mt-3'>{t('userPage.reviewNotFound')}</h3>
							}
						</Col>
					</Row>
					: 
                    warning 
                    ?
                    <div className="text-center mt-5">
                        <h3 className="my-3">Token has expired!</h3>
                        <Button variant='secondary' onClick={() => navigate('/login')}>
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