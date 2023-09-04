import { Modal, Form, Button, Col, Row } from "react-bootstrap"
import Select from "./Select"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createReview, getReview, updateReview } from "../api/reviews";
import { checkInputs, resetInputs } from "../healpers/healper";
import { IReview } from "../types/types";

function CreateReview(props: any){
    const groups: string[] = ['movies', 'books', 'games'];
	const [nameReview, setNameReview] = useState('');
	const [title, setTitle] = useState('');
	const [group, setGroup] = useState('');
	const [score, setScore] = useState('');
	const [tags, setTags] = useState('');
	const [description, setDescription] = useState('');
	const params = useParams();
	const [warning, setWarning] = useState(false);
	const [review, setReview] = useState<IReview | null>(null)
	const idReview = props.update;
	//console.log(props.update)
	//console.log(review)
	//console.log(Number(score))
	//console.log(params.idUser)
	//console.log(tags.split('#').slice(1))
	//console.log(description)
	//console.log(title)

	useEffect(() => {
		(props.update != '') ? getReview(props.update, setReview) : setReview(null);
	}, [idReview])

	useEffect(() => {
		if(review){
			setNameReview(review.nameReview);
			setTitle(review.title);
			setGroup(review.group);
			setScore(String(review.score));
			setTags(`#${review.tags.join('#')}`);
			setDescription(review.description);
		} else {
			resetInputs([setNameReview, setTitle, setGroup, setTags, setDescription, setScore]);
		}
	},[review])

	async function save(){
		if(checkInputs([nameReview, title, group, tags, description, score])){
			if (params.idUser) await createReview(nameReview, title, group, Number(score), tags.split('#').slice(1), description, params.idUser);
			resetInputs([setNameReview, setTitle, setGroup, setTags, setDescription, setScore]);
			setWarning(false);
		} else {
			setWarning(true);
		}
	}

	async function update() {
		if(checkInputs([nameReview, title, group, tags, description, score])){
			await updateReview(props.update, nameReview, title, group, Number(score), tags.split('#').slice(1), description);
			setWarning(false);
		} else {
			setWarning(true);
		}
	}

    return (
    <>
        <Modal {...props}>
      		<Modal.Header closeButton>
      			<Modal.Title>Create new review </Modal.Title>
      		</Modal.Header>
      		<Modal.Body>
      			<Form>
      				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      					<Form.Label>Review title</Form.Label>
      					<Form.Control
      						type="text"
							value={nameReview}
							onChange={(e) => setNameReview(e.target.value)}
      						placeholder="Enter review title"
							required
      						autoFocus
      					/>
      				</Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      					<Form.Label>Title of the work</Form.Label>
      					<Form.Control
      						type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
      						placeholder="Enter review title"
      					/>
      				</Form.Group>
                    <Row>
                        <Col>
                            <Select name={'Group:'} options={groups} value={group} setValue={setGroup}/>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      					        <Form.Control
      					        	type="number"
                                    min={0}
                                    max={10}
                                    step={1}
									value={score}
									onChange={(e) => Number(e.target.value)>10 ? setScore('10') : setScore(e.target.value)}
									required
									placeholder="Enter author`s assessment"
      					        />
      				        </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      					<Form.Label>Tags</Form.Label>
      					<Form.Control
      						type="text"
							value={tags}
							onChange={(e) => setTags(e.target.value)}
							required
      						placeholder="Enter your tags with #"
      					/>
      				</Form.Group>
      				<Form.Group
      				    className="mb-3"
      				    controlId="exampleForm.ControlTextarea1"
      				>
      				    <Form.Label>Example textarea</Form.Label>
      				    <Form.Control 
						as="textarea" 
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
						rows={3} />
      				</Form.Group>
      			</Form>
				{warning ? <p className="text-center text-danger">Please fill in all field!</p> : <p></p>}
      		</Modal.Body>
      		<Modal.Footer>
      			<Button variant="secondary" onClick={props.onHide}>
      			  Close
      			</Button>
      			<Button variant="primary" onClick={() => (props.update === '') ? save() : update()}>
      			  Save Changes
      			</Button>
      		</Modal.Footer>
      	</Modal>
    </>
    )
}

export default CreateReview