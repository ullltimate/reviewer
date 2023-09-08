import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Header';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import CardReview from './components/CardReview';
import { useTranslation } from "react-i18next";
import { useTheme } from './hooks/useTheme';
import { getAllReviews } from './api/reviews';
import { IReview } from './types/types';
import CreateReview from './components/CreateReview';

function App() {
	const [key, setKey] = useState('recent');
	const { t, i18n: {changeLanguage, language} } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(language);
	const {theme, setTheme} = useTheme();
	const [allReviews, setAllReviews] = useState<IReview[]>([]);
	const [showCreate, setShowCreate] = useState<boolean>(false);
	const [edit, setEdit] = useState(false);
	const [editReview, setEditReview] = useState('');
	const [isDeleted, setIsDeleted] = useState(false);

	const handleShowEdit = (idReview: string) => {setEditReview(idReview); setEdit(true); setShowCreate(true)};

	useEffect(() => {
		getAllReviews(setAllReviews);
	},[isDeleted])

  	return (
  	  <>
		<Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} changeLanguage={changeLanguage} t={t} theme={theme} setTheme={setTheme}/>
		<Container>
			<Tabs
    		  id="controlled-tab-example"
    		  activeKey={key}
    		  onSelect={(k: any) => setKey(k)}
    		  className="mb-3"
    		>
    		  	<Tab eventKey="recent" title={t('app.tabLatest')}>
				  {allReviews.slice().sort((a,b) => b.creationDate - a.creationDate).map((el) => <CardReview key={el._id} id={el._id} autor={el.idAutor} img={el.img} name={el.nameReview} subtitle={el.title} score={el.score} postedDate={Intl.DateTimeFormat(currentLanguage).format(el.creationDate)} t={t} handleShow={() => handleShowEdit(el._id)} setIsDeleted={setIsDeleted}/>)}
    		  	</Tab>
    		  	<Tab eventKey="rating" title={t('app.tabRating')}>
				  {allReviews.slice().sort((a,b) => b.score - a.score).map((el) => <CardReview key={el._id} id={el._id} autor={el.idAutor} img={el.img} name={el.nameReview} subtitle={el.title} score={el.score} postedDate={Intl.DateTimeFormat(currentLanguage).format(el.creationDate)} t={t}  handleShow={() => handleShowEdit(el._id)} setIsDeleted={setIsDeleted}/>)}
    		  	</Tab>
    		</Tabs>
			<CreateReview show={showCreate} onHide={() => setShowCreate(false)} update={(edit) ? `${editReview}` : ''}/>
		</Container>
  	  </>
  	)
}

export default App
