import { useEffect, useState } from 'react';
import {  Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../types/types';

function Header(props: any) {
    const accessToken: string | null = localStorage.getItem("accessToken");
    const user: string | null = localStorage.getItem('user');
	const navigate = useNavigate();
    const [userObject, setUserObject] = useState<IUser>();
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (user) setUserObject(JSON.parse(user))
    },[accessToken])

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
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="50pt" height="50pt" viewBox="0 0 94.000000 101.000000"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <g transform="translate(0.000000,101.000000) scale(0.100000,-0.100000)"
                        fill={(props.theme === 'light') ? '#000000' : '#dee2e6'} stroke="none">
                        <path d="M262 862 l-202 -117 0 -240 0 -240 198 -114 c108 -63 202 -114 207
                        -114 6 0 100 51 208 114 l197 114 0 240 0 241 -162 94 c-90 52 -181 104 -203
                        117 l-41 22 -202 -117z m205 -202 c58 0 67 -3 94 -29 38 -38 39 -87 4 -130
                        l-26 -30 46 -71 46 -71 -53 3 c-51 3 -52 4 -85 58 -18 30 -37 56 -43 58 -6 2
                        -10 -21 -10 -57 l0 -61 -50 0 -50 0 0 164 c0 148 2 165 18 169 9 3 23 3 30 1
                        8 -2 43 -4 79 -4z"/>
                        <path d="M440 561 c0 -34 3 -41 20 -41 12 0 25 10 32 25 13 28 6 39 -29 50
                        -21 6 -23 3 -23 -34z"/>
                        </g>
                    </svg>
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
                        {props.t('header.signed')} <Link to={`/user/${userObject._id}`}>{userObject.name}</Link>
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