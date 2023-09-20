import { useEffect, useState } from "react"
import { Button, ButtonGroup, Table } from "react-bootstrap"
import { getAllUsers, updateUserAdmin } from "../api/auth";
import { IUser } from "../types/types";
import { useTranslation } from "react-i18next";
import Loader from "./Loader";
import { useResize } from "../hooks/useResize";
import UserString from "./UserString";

function AdminPanel() {
    const { t } = useTranslation();
    const [users, setUsers] = useState<IUser[]>();
    const windowWidth = useResize();
    const [checkboxes, setCheckboxes] = useState<any>([]);
    const [update, setUpdate] = useState(false);
    console.log(checkboxes);

    const changeCheckboxes = (id: any) => {
      setCheckboxes(
        checkboxes.includes(id)
          ? checkboxes.filter((el: any) => el !== id)
          : [...checkboxes, id]
      );
    };

    const makeAdmin = () => {
        checkboxes.map((el: any) => updateUserAdmin(el, 'true', setUpdate))
    }

    const removeAdmin = () => {
        checkboxes.map((el: any) => updateUserAdmin(el, 'false', setUpdate))
    }

    useEffect(() => {
        getAllUsers(setUsers);
    }, [update])

  	return (
  	  <>
        {
            users 
            ?
            <>
                <div className="mt-3 btn-toolbar justify-content-end">
                    <ButtonGroup>
                        <Button variant="outline-danger" onClick={makeAdmin}>Make admin</Button>
                        <Button variant="outline-danger" onClick={removeAdmin}>Remove admin</Button>
                    </ButtonGroup>
                </div>
                <Table className="mt-3" bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{t('adminPanel.login')}</th>
                            <th style={{display: `${(windowWidth.windowSize>995) ? 'block' : 'none'}`}}>{t('adminPanel.email')}</th>
                            <th>{t('adminPanel.loginWith')}</th>
                            <th>{t('adminPanel.isAdmin')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((e) => <UserString key={e._id} id={e._id} login={e.login} email={e.email} loginWith={e.loginWith} isAdmin={e.isAdmin} onchange={(event:any) => changeCheckboxes(event.target.id)} checked={checkboxes.includes(e._id)}/>)
                        }
                    </tbody>
                </Table>
            </>
            : <Loader />
        }
  	  </>
  	)
}

export default AdminPanel