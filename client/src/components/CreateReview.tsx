import { Modal, Form, Button, Col, Row } from "react-bootstrap"
import Select from "./Select"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createReview, getReview, updateReview } from "../api/reviews";
import { checkInputs, resetInputs } from "../healpers/healper";
import { IReview } from "../types/types";
import { useTranslation } from "react-i18next";

function CreateReview(props: any){
	const { t } = useTranslation();
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
		if(checkInputs([nameReview, title, group, description, score])){
			if (params.idUser) await createReview(nameReview, title, group, Number(score), tags.split('#').slice(1), description, params.idUser);
			resetInputs([setNameReview, setTitle, setGroup, setTags, setDescription, setScore]);
			setWarning(false);
		} else {
			setWarning(true);
		}
	}

	async function update() {
		if(checkInputs([nameReview, title, group, description, score])){
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
				{review 
				? <Modal.Title>{t('createReview.editTitle')}</Modal.Title>
				:<Modal.Title>{t('createReview.createTitle')}</Modal.Title>
				}
      		</Modal.Header>
      		<Modal.Body>
      			<Form>
      				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      					<Form.Label>{t('createReview.reviewTitle')}</Form.Label>
      					<Form.Control
      						type="text"
							value={nameReview}
							onChange={(e) => setNameReview(e.target.value)}
      						placeholder={t('createReview.reviewTitlePlaceholder')}
							required
      						autoFocus
      					/>
      				</Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      					<Form.Label>{t('createReview.workTitle')}</Form.Label>
      					<Form.Control
      						type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
      						placeholder={t('createReview.workTitlePlaceholder')}
      					/>
      				</Form.Group>
                    <Row>
                        <Col>
                            <Select name={t('userPage.groups')} options={groups} value={group} setValue={setGroup}/>
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
									placeholder={t('createReview.score')}
      					        />
      				        </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      					<Form.Label>{t('createReview.tags')}</Form.Label>
      					<Form.Control
      						type="text"
							value={tags}
							onChange={(e) => setTags(e.target.value)}
      						placeholder={t('createReview.tagsPlaceholder')}
      					/>
      				</Form.Group>
      				<Form.Group
      				    className="mb-3"
      				    controlId="exampleForm.ControlTextarea1"
      				>
      				    <Form.Label>{t('createReview.description')}</Form.Label>
      				    <Form.Control 
						as="textarea" 
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
						rows={3} />
      				</Form.Group>
      			</Form>
				{warning ? <p className="text-center text-danger">{t('createReview.checkInputs')}<br/> {t('createReview.checkInputsOptional')}</p> : <p></p>}
      		</Modal.Body>
      		<Modal.Footer>
      			<Button variant="secondary" onClick={props.onHide}>
				  {t('createReview.btnClose')}
      			</Button>
      			<Button variant="primary" onClick={() => (props.update === '') ? save() : update()}>
				  {t('createReview.btnSave')}
      			</Button>
      		</Modal.Footer>
      	</Modal>
    </>
    )
}

export default CreateReview