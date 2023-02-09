import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../api/api";
import TodoList from "../components/Todo/TodoList";
import TodoCreate from "../components/Todo/CreateTodo";
import { ButtonS } from "../elements/Button";

const Todo = () => {

    const navigate = useNavigate();

    const [todos, setTodos] = useState();
    const [createState, setCreateState] = useState(false);

    const Todos = async () => {
        await instance
            .get('todos')
            .then((res) => {
                setTodos(res.data);
            })
            .catch((err) => { });
    }

    const LogOut = () => {
        localStorage.removeItem("token")
        navigate('/signin')
    }

    useEffect(() => {
        setTodos([]);
        Todos();
    }, [createState])

    return (
        <TodoWrap>
            <FirstChild>
                <ButtonS onClick={LogOut}>로그아웃</ButtonS>
            </FirstChild>
            <TodoList
                Todos={todos}
                createState={createState}
                setCreateState={setCreateState} />
            <TodoCreate
                createState={createState}
                setCreateState={setCreateState} />
        </TodoWrap>
    )
}

export default Todo;

const TodoWrap = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 30px;
    margin: 50px;
    background: #ffffff;
    border: 1px solid #dcdcdc;
`;

const FirstChild = styled.div`
    display : flex;
    justify-content: flex-end;
    margin-bottom: 15px;
`;