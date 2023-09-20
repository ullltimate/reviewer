import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { getAllUsers } from "../api/auth";
import { IUser } from "../types/types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loader from "./Loader";
import { useResize } from "../hooks/useResize";

function AdminPanel() {
    const { t } = useTranslation();
    const [users, setUsers] = useState<IUser[]>();
    const windowWidth = useResize();

    useEffect(() => {
        getAllUsers(setUsers);
    }, [])

  	return (
  	  <>
        {
            users 
            ?
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{t('adminPanel.login')}</th>
                        <th style={{display: `${(windowWidth.windowSize>530) ? 'block' : 'none'}`}}>{t('adminPanel.email')}</th>
                        <th>{t('adminPanel.loginWith')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((e, i) => <tr key={e._id}><td>{i+1}</td><td><Link to={`/user/${e._id}`}>{e.login}</Link></td><td style={{display: `${(windowWidth.windowSize>530) ? 'block' : 'none'}`}}>{e.email}</td><td>{e.loginWith}</td></tr>)
                    }
                </tbody>
            </Table>
            : <Loader />
        }
  	  </>
  	)
}

export default AdminPanel