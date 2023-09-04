import { Form } from "react-bootstrap"

function Select(props: any){
    return(
        <>
            <Form.Select aria-label="Default select example" className="mb-3" value={props.value} onChange={(e) => props.setValue(e.target.value)}>
    			<option value={''}>{props.name}</option>
                {
                    props.options.filter((el: any)=> typeof el === 'string' && el !== '').map((e: any,i: any) => <option key={i} value={e}>{e}</option>)
                }
    		</Form.Select>
        </>
    )
}
export default Select