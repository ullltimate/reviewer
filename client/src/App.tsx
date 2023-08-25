import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { arrayReviews } from './healpers/reviewers';
import CardReview from './components/CardReview';

function App() {
	const [reviews, setReviews] = useState<any[]>([]);

	useEffect(() => {
		setReviews(arrayReviews);
	},[])

  	return (
  	  <>
		<Header />
		<Container>
			{reviews.map((el) => <CardReview key={el.id} img={el.img} name={el.nameReview} subtitle={el.title} score={el.score}/>)}
		</Container>
  	  </>
  	)
}

export default App
