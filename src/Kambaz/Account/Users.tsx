import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as client from "./client";
import PeopleTable from "../Courses/People/Table";


export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const { uid } = useParams();

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, [uid]);

  return (
    <div>
      <h3>Users</h3>
      <PeopleTable users={users} />
    </div>
  );
}