import {  Button, Card, Col, Container, Row } from 'react-bootstrap';
import Header from './Header';
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

function Login() {
	const { t, i18n: {changeLanguage, language} } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(language);
	const {theme, setTheme} = useTheme();

  	return (
  	  	<>
  	  		<Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} changeLanguage={changeLanguage} t={t} theme={theme} setTheme={setTheme}/>
  	  	    <Container>
				<Row style={{ height: '70vh' }} className='align-items-center'>
					<Col>
						<Card style={{ width: '22rem' }} className='mx-auto text-center'>
    			  			<Card.Body>
							  	<Card.Title className='mb-3'>Welcome to reviewer</Card.Title>
								<Card.Subtitle className="mb-5 text-muted">
									Enter your Untitled account details
								</Card.Subtitle>
								<div className="d-grid gap-2">
      								<Button variant={theme === 'light' ? 'dark' : 'light'}>
									  <i className="bi bi-github"></i> Login with GitHub
									</Button>
									<Button variant={theme === 'light' ? 'dark' : 'light'}>other</Button>
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