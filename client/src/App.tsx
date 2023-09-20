import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Header';
import { Accordion, Button, Col, Container, Pagination, Row, Tab, Tabs } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import CardReview from './components/CardReview';
import { useTranslation } from "react-i18next";
import { filteredByTags, getAllTags } from './api/reviews';
import { IReview, ITagCloud } from './types/types';
import CreateReview from './components/CreateReview';
import Loader from './components/Loader';
import { TagCloud } from 'react-tagcloud'
import { convertDate } from './healpers/healper';

function App() {
	const [key, setKey] = useState('recent');
	const { t, i18n: {language} } = useTranslation();
	const [allReviews, setAllReviews] = useState<IReview[] | null>(null);
	const [pageReview, setPageReview] = useState<IReview[] | null>(null);
	const [showCreate, setShowCreate] = useState<boolean>(false);
	const [edit, setEdit] = useState(false);
	const [editReview, setEditReview] = useState('');
	const [isDeleted, setIsDeleted] = useState(false);
	const [activePage, setActivePage] = useState(1);
	const [amountAllReviews, setAmountAllReviews] = useState(0);
	const [allTags, setAllTags] = useState<any[]>([]);
	const [onTags, setOnTags] = useState<any[]>([]);
	const [dataTags, setDataTags] = useState<ITagCloud[] | null>(null);
	const limit = 5;
	let items = [];
	for (let number = 1; number <= Math.ceil(amountAllReviews/limit); number++) {
	  items.push(
	    <Pagination.Item key={number} active={number === activePage} onClick={()=>setActivePage(number)}>
	      {number}
	    </Pagination.Item>,
	  );
	}

	useEffect(() => {
		if(allReviews){
		const startIndex = (activePage-1)*limit;
		const endIndex = startIndex + limit
		setPageReview(allReviews.slice(startIndex, endIndex));
		}
	},[activePage, allReviews])

	const handleShowEdit = (idReview: string) => {setEditReview(idReview); setEdit(true); setShowCreate(true)};

	useEffect(() => {
		getAllTags(setAllTags, setOnTags, setDataTags);
	},[])

	useEffect(() => {
		filteredByTags(onTags, key, setAllReviews, setAmountAllReviews)
	},[isDeleted, key, onTags, showCreate])

  	return (
  	  <>
		<Header />
		<Container>
			<Accordion>
      			<Accordion.Item eventKey="0" className='border-0 mt-5'>
      			  	<Accordion.Header className='border' style={{maxWidth: '200px', marginRight: 0, marginLeft: 'auto'}}>{t('app.tagsCloud')}</Accordion.Header>
      			  	<Accordion.Body className='p-0 mb-3'>
						<Row className='align-items-center'>
							<Col md={2}>
								<Button variant="outline-success" className='w-100 my-3' onClick={() => setOnTags(allTags)}>
									{t('app.reset')}
								</Button>
							</Col>
							<Col>
							{
								dataTags &&
								<TagCloud
									className='text-center'
  								  	minSize={12}
  								  	maxSize={35}
  								  	tags={dataTags}
  								  	onClick={(tag:any) => {setOnTags([tag.value]), setActivePage(1)}}
  								/>
							}
							</Col>
						</Row>
      			  	</Accordion.Body>
      			</Accordion.Item>
    		</Accordion>
			<Tabs
    		  id="controlled-tab-example"
    		  activeKey={key}
    		  onSelect={(k: any) => setKey(k)}
    		  className="mb-3"
    		>
    		  	<Tab eventKey="recent" title={t('app.tabLatest')}>
				  	{
						pageReview
						?
						pageReview.map((el) => <CardReview key={el._id} id={el._id} autor={el.idAutor} img={el.img} name={el.nameReview} subtitle={el.title} score={el.score} postedDate={convertDate(language, el.creationDate)} t={t} handleShow={() => handleShowEdit(el._id)} setIsDeleted={setIsDeleted}/>)
						:
						<Loader />
					}
				  	<Pagination className='justify-content-center'>{items}</Pagination>
				</Tab>
    		  	<Tab eventKey="rating" title={t('app.tabRating')}>
				  	{
						pageReview 
						?
						pageReview.map((el) => <CardReview key={el._id} id={el._id} autor={el.idAutor} img={el.img} name={el.nameReview} subtitle={el.title} score={el.score} postedDate={convertDate(language, el.creationDate)} t={t}  handleShow={() => handleShowEdit(el._id)} setIsDeleted={setIsDeleted}/>)
						:
						<Loader />
					}
				  	<Pagination className='justify-content-center'>{items}</Pagination>
				</Tab>
    		</Tabs>
			<CreateReview show={showCreate} onHide={() => setShowCreate(false)} update={(edit) ? `${editReview}` : ''}/>
		</Container>
  	  </>
  	)
}

export default App
