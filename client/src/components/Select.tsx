import { Form } from "react-bootstrap"

function Select(props: any){
    return(
        <>
            <Form.Select aria-label="Default select example" className="mb-3">
    			<option>{props.name}</option>
                {
                    props.array &&
                    props.array.map((e: any,i: any) => <option key={i} value={e}>{e}</option>)
                }
    		</Form.Select>
        </>
    )
}
export default Select