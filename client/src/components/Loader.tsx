import { Container, Spinner } from "react-bootstrap"

function Loader() {

  	return (
  	  <>
        <Container className='text-center my-5'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
  	  </>
  	)
}

export default Loader