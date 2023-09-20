import { Modal, Form, Button, Col, Row, Spinner } from "react-bootstrap"
import Select from "./Select"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createReview, getReview, updateReview } from "../api/reviews";
import { checkInputs, resetInputs } from "../healpers/healper";
import { IReview } from "../types/types";
import { useTranslation } from "react-i18next";
import { FileUploader } from "react-drag-drop-files";
import { addImage } from "../api/cloudinary";

function CreateReview(props: any){
	const { t } = useTranslation();
    const groups: string[] = ['movies', 'books', 'games'];
	const [nameReview, setNameReview] = useState('');
	const [title, setTitle] = useState('');
	const [group, setGroup] = useState('');
	const [score, setScore] = useState(0);
	const [tags, setTags] = useState('');
	const [description, setDescription] = useState('');
	const params = useParams();
	const user = localStorage.getItem('user');
	const [warning, setWarning] = useState(false);
	const [review, setReview] = useState<IReview | null>(null)
	const idReview = props.update;
	const CLOUDINARY_UPLOAD_PRESET: string = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
	const CLOUDINARY_CLOUD_NAME: string = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
	const [urlImage, setUrlImage] = useState('');
	const [file, setFile] = useState<any|null>(null);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		(props.update != '') ? getReview(props.update, setReview) : setReview(null);
	}, [idReview])

	useEffect(() => {
		if(review){
			setNameReview(review.nameReview);
			setTitle(review.title);
			setGroup(review.group);
			setScore(review.score);
			setTags(`#${review.tags.join('#')}`);
			setDescription(review.description);
			setUrlImage(review.img);
		} else {
			resetInputs([setNameReview, setTitle, setGroup, setTags, setDescription, setUrlImage]);
			setFile(null);
			setScore(0);
		}
	},[review])

	async function save(){
		if(checkInputs([nameReview, title, group, description]) && file){
			setLoader(true);
			setWarning(false);
			if (params.idUser) {
				await createReview(nameReview, title, group, Number(score), tags.split('#').slice(1), description, params.idUser, urlImage);
			} else {
				if(user) await createReview(nameReview, title, group, Number(score), tags.split('#').slice(1), description, JSON.parse(user)._id, urlImage);
			}
			resetInputs([setNameReview, setTitle, setGroup, setTags, setDescription, setUrlImage]);
			setFile(null);
			setScore(0);
			setLoader(false);
		} else {
			setWarning(true);
		}
	}

	async function update() {
		if(checkInputs([nameReview, title, group, description])){
			setLoader(true);
			setWarning(false);
			await updateReview(props.update, nameReview, title, group, Number(score), tags.split('#').slice(1), description, urlImage);
			setLoader(false);
		} else {
			setWarning(true);
		}
	}

	const changeImage = (file: any) => {
		setFile(file);
		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
		data.append("cloud_name", CLOUDINARY_CLOUD_NAME);
		addImage(data, CLOUDINARY_CLOUD_NAME, setUrlImage);
	};
	//console.log(urlImage)

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
									onChange={(e) => Number(e.target.value)>10 ? setScore(10) : setScore(Number(e.target.value))}
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
							list="datalistOptions"
      					/>
						<datalist id="datalistOptions">
							{
							props.alltags &&
							props.alltags.filter((el: any)=> typeof el === 'string' && el !== '').map((el: any, i: number) => <option key={i} value={`#${el}`}></option>)
							}
						</datalist>	
      				</Form.Group>
					<FileUploader handleChange={changeImage} name="file" types={["jpg", "jpeg", "png"]} />
					<small><span className="text-muted">{file ? `${t('createReview.fileName')} ${file.name}` : `${t('createReview.noFiles')}`}</span></small>
					<Form.Group
      				    className="my-3"
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
				{
					loader
					?
					<Button variant="primary" disabled>
					<Spinner
					  as="span"
					  animation="border"
					  size="sm"
					  role="status"
					  aria-hidden="true"
					/>
					Loading...
				  	</Button>
					:
					<Button variant="primary" onClick={() => (props.update === '') ? save() : update()}>
					{t('createReview.btnSave')}
					</Button>
				}
      		</Modal.Footer>
      	</Modal>
    </>
    )
}

export default CreateReview