import {  Button, Card, Col, Container, Row } from 'react-bootstrap';
import Header from './Header';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { useGoogleLogin } from "@react-oauth/google"
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserGoogle } from '../api/auth';
import Loader from './Loader';

function Login() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const searchParams = new URLSearchParams(useLocation().search);
    const searchString = searchParams.get('token');

	const GITHUB_CLIENT_ID: string = import.meta.env.VITE_GITHUB_CLIENT_ID;

	const loginToGithub = () => {
		localStorage.setItem("loginWith", "GitHub")
		window.location.assign(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`)
	}

	const loginToGoogle = useGoogleLogin({
		onSuccess: tokenResponse => {
		 localStorage.setItem("loginWith", "Google")
		 getUserGoogle(tokenResponse.access_token, navigate, setLoading)
		},
	})

	useEffect(() => {
		if(searchString){
			localStorage.setItem("accessToken", searchString);
			navigate('/profile');
		}
	},[])

  	return (
  	  	<>
		  	<Header />
			{
				loading 
				?
				<Loader />
				:
				<Container>
					<Row style={{ height: '70vh' }} className='align-items-center'>
						<Col>
							<Card style={{ width: '22rem' }} className='mx-auto text-center'>
    				  			<Card.Body>
								  	<Card.Title className='mb-3'>{t('loginPage.title')}</Card.Title>
									<div className="d-grid gap-2">
      									<Button variant='secondary' onClick={() => loginToGithub()}>
										  <i className="bi bi-github"></i> {t('loginPage.btnGithub')}
										</Button>
										<Button variant='secondary' onClick={() => loginToGoogle()}>
											<i className="bi bi-google"></i>{t('loginPage.btnGoogle')}
										</Button>
									</div>
								</Card.Body>
    						</Card>
						</Col>
					</Row>
  	  	    	</Container>
			}
  	  	</>
  	)
}

export default Login