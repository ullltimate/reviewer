import { useEffect, useState } from 'react';
import {  Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../types/types';
import Logo from './Logo';

function Header(props: any) {
    const accessToken: string | null = localStorage.getItem("accessToken");
    const user: string | null = localStorage.getItem('user');
	const navigate = useNavigate();
    const [userObject, setUserObject] = useState<IUser>();
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (user) setUserObject(JSON.parse(user))
    },[accessToken, user])

    const handlerTheme = () => {
        if (props.theme === 'light'){
            props.setTheme('dark');
        } else {
            props.setTheme('light');
        }
    }

    const handleChangeLanguage = () => {
        const newLanguage = props.currentLanguage === "en" ? "ru" : "en";
        props.setCurrentLanguage(newLanguage);
        props.changeLanguage(newLanguage);
    }

    const logOut = () => {
		localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
		localStorage.removeItem("loginWith");
		navigate("/login")
	}

    const search = () => {
        navigate(`/search?searchTerm=${searchValue}`);
    }

    return (
        <>
        <Navbar bg="bg-transparent flex-wrap">
            <Container >
                <Link to={"/"} className='d-flex align-items-center text-decoration-none text-reset'>
                    <Logo theme={props.theme}/>
                    <h1 className='m-0'>reviewer</h1>
                </Link>
                <Nav className='align-items-center'>
                    {
                    !accessToken || !userObject
                    ? <Link to={"/login"} className='p-3 text-decoration-none text-reset'>{props.t('header.login')}</Link>
                    : <Button variant={props.theme} className='bg-transparent border-0' onClick={() => logOut()}>{props.t('header.logout')}</Button>
                    }
                    <Button variant={props.theme} className='bg-transparent border-0' onClick={handlerTheme}>
                        {
                            props.theme === 'light' 
                            ? <i className="bi bi-moon-stars"></i>
                            : <i className="bi bi-brightness-high"></i>
                        }
                    </Button>
                    <Button variant={props.theme} onClick={handleChangeLanguage} className="pe-0 bg-transparent border-0 text-uppercase">
                        <i className="bi bi-globe"></i> {props.currentLanguage}
                    </Button>
                </Nav>
            </Container>
            <Container className='justify-content-end'>
                {
                    userObject && 
                    <Navbar.Text className='pt-0'>
                        {props.t('header.signed')} <Link to={`/profile`}>{userObject.name}</Link>
                    </Navbar.Text>
                }
            </Container>
            <Container className='justify-content-end'>
                <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder={props.t('header.search')}
                      className="me-2"
                      aria-label="Search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button variant="outline-success" onClick={search}>
                        {props.t('header.search')}
                    </Button>
                </Form>
            </Container>
        </Navbar>
        </>
    )
}

export default Header