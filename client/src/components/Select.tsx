import { Form } from "react-bootstrap"

function Select(){
    return(
        <>
            <Form.Select aria-label="Default select example" className="mb-3">
    			<option>Sort by:</option>
    			<option value="1">Raiting</option>
    			<option value="2">Created date</option>
    		</Form.Select>
        </>
    )
}
export default Select