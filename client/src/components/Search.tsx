import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import Header from "./Header";
import { Container } from "react-bootstrap";
import { IReview } from "../types/types";
import { useLocation } from "react-router-dom";
import { getSearchReview } from "../api/reviews";
import Loader from "./Loader";
import CardReview from "./CardReview";
import CreateReview from "./CreateReview";

function Search() {
    const { t, i18n: {changeLanguage, language} } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(language);
    const {theme, setTheme} = useTheme();
    const searchParams = new URLSearchParams(useLocation().search);
    const searchString = searchParams.get('searchTerm');
    const [searchResults, setSearchResults] = useState<IReview[]|null>(null);
    const [edit, setEdit] = useState(false);
	const [editReview, setEditReview] = useState('');
	const [isDeleted, setIsDeleted] = useState(false);
    const [showCreate, setShowCreate] = useState<boolean>(false);

    const handleShowEdit = (idReview: string) => {setEditReview(idReview); setEdit(true); setShowCreate(true)};

    useEffect(() => {
        if(searchString){
            getSearchReview(searchString, setSearchResults);
        }
    },[searchString, isDeleted])

  	return (
  	    <>
            <Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} changeLanguage={changeLanguage} t={t} theme={theme} setTheme={setTheme}/>
            <Container>
                <h3>{t('search.result')}</h3>
                {
                    !searchString && <h3 className="text-uppercase my-5 text-danger text-center">{t('search.waitQuery')}</h3>

                }
                {
                    searchResults
                    ?
                    searchResults.length === 0
                    ?
                    <h4 className="text-center mt-5">
                        {t('search.notFound')}
                    </h4>
                    :
                    searchResults.map((el) => <CardReview key={el._id} id={el._id} autor={el.idAutor} img={el.img} name={el.nameReview} subtitle={el.title} score={el.score} postedDate={Intl.DateTimeFormat(currentLanguage).format(el.creationDate)} t={t} handleShow={() => handleShowEdit(el._id)} setIsDeleted={setIsDeleted}/>)
                    :
                    <Loader />
                }
                <CreateReview show={showCreate} onHide={() => setShowCreate(false)} update={(edit) ? `${editReview}` : ''}/>
            </Container>
  	    </>
  	)
}

export default Search