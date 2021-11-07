/* eslint-disable multiline-ternary */
import React from "react";
import { useParams } from "react-router";
import UsersList from "../components/usersList";
import UsersPage from "../components/layouts/userPage";
const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UsersPage id={userId} /> : <UsersList />}</>;
};

export default Users;
