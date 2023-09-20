import { Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useResize } from "../hooks/useResize";


function UserString(props:any) {
    const windowWidth = useResize();

  	return (
  	  <>
        <tr>
            <td>              
                <Form>
                    <Form.Check type={'checkbox'} id={props.id} onChange={props.onchange} checked={props.checked}/>
                </Form>
            </td>
            <td><Link to={`/user/${props.id}`}>{props.login}</Link></td>
            <td style={{display: `${(windowWidth.windowSize>995) ? 'block' : 'none'}`}}>{props.email}</td>
            <td>{props.loginWith}</td>
            <td>{props.isAdmin === "true" ? 'Yes' : 'No'}</td>
        </tr>
  	  </>
  	)
}

export default UserString