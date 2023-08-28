import { Container } from 'react-bootstrap';
import Header from './Header';
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

function User() {
	const { t, i18n: {changeLanguage, language} } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(language);
	const {theme, setTheme} = useTheme();

  	return (
  	  	<>
  	  		<Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} changeLanguage={changeLanguage} t={t} theme={theme} setTheme={setTheme}/>
  	  	    <Container>
                <h1>User page</h1>
  	  	    </Container>
  	  	</>
  	)
}

export default User