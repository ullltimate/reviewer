import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Header';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { arrayReviews } from './healpers/reviewers';
import CardReview from './components/CardReview';
import { useTranslation } from "react-i18next";
import { useTheme } from './hooks/useTheme';

function App() {
	const [reviews, setReviews] = useState<any[]>([]);
	const [key, setKey] = useState('recent');
	const { t, i18n: {changeLanguage, language} } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(language);
	const {theme, setTheme} = useTheme();


	useEffect(() => {
		setReviews(arrayReviews);
	},[])

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
				  {reviews.slice().sort((a,b) => b.creationDate - a.creationDate).map((el) => <CardReview key={el.id} id={el.id} img={el.img} name={el.nameReview} subtitle={el.title} score={el.score} postedDate={Intl.DateTimeFormat(currentLanguage).format(el.creationDate)} t={t}/>)}
    		  	</Tab>
    		  	<Tab eventKey="rating" title={t('app.tabRating')}>
				  {reviews.slice().sort((a,b) => b.score - a.score).map((el) => <CardReview key={el.id} id={el.id} img={el.img} name={el.nameReview} subtitle={el.title} score={el.score} postedDate={Intl.DateTimeFormat(currentLanguage).format(el.creationDate)} t={t}/>)}
    		  	</Tab>
    		</Tabs>
		</Container>
  	  </>
  	)
}

export default App
