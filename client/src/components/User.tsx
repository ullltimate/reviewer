import { Container } from 'react-bootstrap';
import Header from './Header';
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { getUserDataGithub } from '../api/auth';

function User() {
	const { t, i18n: {changeLanguage, language} } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(language);
	const {theme, setTheme} = useTheme();


	const [userDataGithub, setUserDataGithub] = useState<null | any>(null);
	const loginWith:any = useRef(localStorage.getItem("loginWith"))

	useEffect(() => {
		const queryString = window.location.search
		const urlParams = new URLSearchParams(queryString)
		const codeParam = urlParams.get("access_token")

		const accessToken = localStorage.getItem("accessToken")

		if (codeParam && !accessToken && loginWith.current === "GitHub") {
			localStorage.setItem('accessToken', codeParam);
		} else if (codeParam && accessToken && loginWith.current === "GitHub") {
			getUserDataGithub(codeParam,setUserDataGithub)
		}

	}, [loginWith])


  	return (
  	  	<>
  	  		<Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} changeLanguage={changeLanguage} t={t} theme={theme} setTheme={setTheme}/>
  	  	    <Container>
                <h1>User page</h1>
				<img src={userDataGithub?.avatar_url} alt="" />
				<h2>name {userDataGithub?.login}</h2>
				<h2>bio {userDataGithub?.bio}</h2>
				<h2>email {userDataGithub?.email}</h2>
  	  	    </Container>
  	  	</>
  	)
}

export default User