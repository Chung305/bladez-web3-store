import { useEffect, useState } from "react";
import { getAllUsers } from "../../../../lib/controller/user";
import { Card, CardBody, CardTitle, CardGroup, Badge, Table } from "reactstrap";
import styles from "../../../../styles/dashboard-styles/ViewUser.module.css";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = () => {
      fetch("../api/user")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
        });
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <Table className={styles.userTable} size="sm">
        <thead>
          <tr>
            <th>Public Key</th>
            <th>Username</th>
            <th>Holder</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr>
                <td>{user.publicKey}</td>
                <td>{user.username}</td>
                <td>
                  {user.isHolder ? (
                    <Badge color="success">{user.isHolder.toString()}</Badge>
                  ) : (
                    <Badge color="danger">{user.isHolder.toString()}</Badge>
                  )}
                </td>
                <td>{user.createAt}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewUsers;
