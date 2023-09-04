import {  Button, Card, Col, Container, Row } from 'react-bootstrap';
import Header from './Header';
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useGoogleLogin } from "@react-oauth/google"
import { useNavigate } from 'react-router-dom';
import { getUserGoogle } from '../api/auth';

function Login() {
	const { t, i18n: {changeLanguage, language} } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(language);
	const {theme, setTheme} = useTheme();
	const navigate = useNavigate();
	//const loginWith = useRef(localStorage.getItem("loginWith"))

	const GITHUB_CLIENT_ID: string = import.meta.env.VITE_GITHUB_CLIENT_ID;

	const loginToGithub = () => {
		localStorage.setItem("loginWith", "GitHub")
		window.location.assign(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`)
	}

	const loginToGoogle = useGoogleLogin({
		onSuccess: tokenResponse => {
		 localStorage.setItem("loginWith", "Google")
		 getUserGoogle(tokenResponse.access_token, navigate)
		},
	})

  	return (
  	  	<>
  	  		<Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} changeLanguage={changeLanguage} t={t} theme={theme} setTheme={setTheme}/>
  	  	    <Container>
				<Row style={{ height: '70vh' }} className='align-items-center'>
					<Col>
						<Card style={{ width: '22rem' }} className='mx-auto text-center'>
    			  			<Card.Body>
							  	<Card.Title className='mb-3'>{t('loginPage.title')}</Card.Title>
								<div className="d-grid gap-2">
      								<Button variant={theme === 'light' ? 'dark' : 'light'} onClick={() => loginToGithub()}>
									  <i className="bi bi-github"></i> {t('loginPage.btnGithub')}
									</Button>
									<Button variant={theme === 'light' ? 'dark' : 'light'} onClick={() => loginToGoogle()}>
										<i className="bi bi-google"></i>{t('loginPage.btnOther')}
									</Button>
								</div>
							</Card.Body>
    					</Card>
					</Col>
				</Row>
  	  	    </Container>
  	  	</>
  	)
}

export default Login