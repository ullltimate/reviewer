import { Modal, Form, Button, Col, Row } from "react-bootstrap"
import Select from "./Select"

function CreateReview(props: any){
    const group: string[] = ['movies', 'books', 'games'];

    return (
    <>
        <Modal {...props}>
      		<Modal.Header closeButton>
      			<Modal.Title>Create new review</Modal.Title>
      		</Modal.Header>
      		<Modal.Body>
      			<Form>
      				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      					<Form.Label>Review title</Form.Label>
      					<Form.Control
      						type="text"
      						placeholder="Enter review title"
      						autoFocus
      					/>
      				</Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      					<Form.Label>Title of the work</Form.Label>
      					<Form.Control
      						type="text"
      						placeholder="Enter review title"
      					/>
      				</Form.Group>
                    <Row>
                        <Col>
                            <Select name={'Group:'} options={group}/>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      					        <Form.Control
      					        	type="number"
                                    min={0}
                                    max={10}
                                    step={1}
      					        	placeholder="Enter author`s assessment"
      					        />
      				        </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      					<Form.Label>Tags</Form.Label>
      					<Form.Control
      						type="text"
      						placeholder="Enter your tags"
      					/>
      				</Form.Group>
      				<Form.Group
      				    className="mb-3"
      				    controlId="exampleForm.ControlTextarea1"
      				>
      				    <Form.Label>Example textarea</Form.Label>
      				    <Form.Control as="textarea" rows={3} />
      				</Form.Group>
      			</Form>
      		</Modal.Body>
      		<Modal.Footer>
      			<Button variant="secondary" onClick={props.onHide}>
      			  Close
      			</Button>
      			<Button variant="primary" onClick={props.onHide}>
      			  Save Changes
      			</Button>
      		</Modal.Footer>
      	</Modal>
    </>
    )
}

export default CreateReview