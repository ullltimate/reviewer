import { t } from "i18next";
import { Button } from "react-bootstrap";
import Select from "./Select";
import Tags from "./Tags";
import { useEffect, useState } from "react";
import { filteredReviews } from "../api/reviews";


function FiltersPanel(props:any) {
    const [tag, setTag] = useState('');
    const [group, setGroup] = useState('');	
    const [sort, setSort] = useState('');

    useEffect(() => {
		if(tag != '') props.setOnTags(Array.from(new Set(props.onTags.concat(tag))))
	}, [tag])

    useEffect(() => {
	    filteredReviews(props.idUser, group, props.onTags, props.setReviewsByAutor)
	},[group, props.onTags, props.isDeleted])

	useEffect(() => {
		if(sort === 'date') props.setReviewsByAutor(() => [...props.reviewsByAutor.sort((a: any,b: any) => b.creationDate - a.creationDate)]);
		if(sort === 'rating') props.setReviewsByAutor(() => [...props.reviewsByAutor.sort((a: any,b: any) => b.averageRating - a.averageRating)]);
	},[sort])


  	return (
  	  <>
		<Button variant="outline-success" className='w-100 mb-3' onClick={() => props.handleShow()}>
      		{t('userPage.btnCreate')}
      	</Button>
		<Button variant="outline-success" className='w-100 mb-3' onClick={() => {setGroup(''); setTag(''); props.setOnTags(props.allTags); setSort('')}}>
			{t('userPage.btnReset')}
		</Button>
		<Select name={t('userPage.sort')} options={['rating', 'date']} value={sort} setValue={setSort}/>
		<Select name={t('userPage.groups')} options={['movies', 'books', 'games']} value={group} setValue={setGroup}/>
		<Select name={t('userPage.tags')} options={props.allTags} value={tag} setValue={setTag}/>
		<Tags tags={props.onTags} setOnTags={props.setOnTags}/>
  	  </>
  	)
}

export default FiltersPanel