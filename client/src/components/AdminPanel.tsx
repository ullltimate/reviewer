import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { getAllUsers } from "../api/auth";
import { IUser } from "../types/types";
import { Link } from "react-router-dom";

function AdminPanel() {

    const [users, setUsers] = useState<IUser[]>();

    useEffect(() => {
        getAllUsers(setUsers);
    }, [])

  	return (
  	  <>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Login</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    users
                    && users.map((e, i) => <tr key={e._id}><td>{i+1}</td><td><Link to={`/user/${e._id}`}>{e.name}</Link></td></tr>)
                    }
                </tbody>
            </Table>
  	  </>
  	)
}

export default AdminPanel