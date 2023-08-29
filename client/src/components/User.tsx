import { Container } from 'react-bootstrap';
import Header from './Header';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/auth';

function User() {
	const { t, i18n: {changeLanguage, language} } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(language);
	const {theme, setTheme} = useTheme();
	const params = useParams();
	const idUser = params.idUser;
	const [user, setUser] = useState<any|null>(null);

	useEffect(() => {
		if (idUser) getUser(idUser, setUser)
	},[])

  	return (
  	  	<>
  	  		<Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} changeLanguage={changeLanguage} t={t} theme={theme} setTheme={setTheme}/>
  	  	    <Container>
				{
					user &&
					<>
					    <h2>UserLogin {user.login}</h2>
						<h2>UserName {user.name}</h2>
						<h2>UserEmail {user.email}</h2>
						<h2>UserImg</h2>
						<img src={user.img} alt="" />
					</>
				}
  	  	    </Container>
  	  	</>
  	)
}

export default User