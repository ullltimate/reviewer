import { useEffect, useState } from 'react';
import {  Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../types/types';
import Logo from './Logo';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

function Header() {
    const { t, i18n: {changeLanguage, language} } = useTranslation();
	const {theme, setTheme} = useTheme();
    const accessToken: string | null = localStorage.getItem("accessToken");
    const user: string | null = localStorage.getItem('user');
	const navigate = useNavigate();
    const [userObject, setUserObject] = useState<IUser>();
    const [searchValue, setSearchValue] = useState('');
    const [emptySearch, setEmptySearch] = useState(false);

    useEffect(() => {
        if (user) setUserObject(JSON.parse(user))
    },[accessToken, user])

    const handlerTheme = () => {
        if (theme === 'light'){
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    const handleChangeLanguage = () => {
        const newLanguage = language === "en" ? "ru" : "en";
        changeLanguage(newLanguage);
    }

    const logOut = () => {
		localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
		localStorage.removeItem("loginWith");
		navigate("/login")
	}

    const search = (e: any) => {
        e.preventDefault();
        if(searchValue.trim() != ''){
            setEmptySearch(false);
            navigate(`/search?searchTerm=${searchValue}`);
        } else {
            setEmptySearch(true);
        }
    }

    return (
        <>
        <Navbar bg="bg-transparent flex-wrap">
            <Container >
                <Link to={"/"} className='d-flex align-items-center text-decoration-none text-reset'>
                    <Logo theme={theme}/>
                    <h1 className='m-0'>reviewer</h1>
                </Link>
                <Nav className='align-items-center'>
                    {
                    !accessToken || !userObject
                    ? <Link to={"/login"} className='p-3 text-decoration-none text-reset'>{t('header.login')}</Link>
                    : <Button variant={theme} className='bg-transparent border-0' onClick={() => logOut()}>{t('header.logout')}</Button>
                    }
                    <Button variant={theme} className='bg-transparent border-0' onClick={handlerTheme}>
                        {
                            theme === 'light' 
                            ? <i className="bi bi-moon-stars"></i>
                            : <i className="bi bi-brightness-high"></i>
                        }
                    </Button>
                    <Button variant={theme} onClick={handleChangeLanguage} className="pe-0 bg-transparent border-0 text-uppercase">
                        <i className="bi bi-globe"></i> {language}
                    </Button>
                </Nav>
            </Container>
            <Container className='justify-content-end'>
                {
                    userObject && 
                    <Navbar.Text className='pt-0'>
                        {t('header.signed')} <Link to={`/profile`}>{userObject.name}</Link>
                    </Navbar.Text>
                }
            </Container>
            <Container className='justify-content-end'>
                <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder={t('header.search')}
                      className={`me-2 ${emptySearch ? 'border border-danger' : ''}`}
                      aria-label="Search"
                      value={searchValue}
                      required
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button variant="outline-success" type='submit' onClick={search}>
                        {t('header.search')}
                    </Button>
                </Form>
            </Container>
        </Navbar>
        </>
    )
}

export default Header