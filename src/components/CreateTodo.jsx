import React, { useState } from "react";
import styled from "styled-components";
import instance from "../api/api";
import { Input } from "../elements/Input";
import { SendButton } from "../elements/Button";

const CreateTodo = ({ createState, setCreateState }) => {

    const [todo, setTodo] = useState("");

    const onChange = (e) => {
        setTodo(e.target.value);
    };

    const CreateTodo = async () => {
        await instance
            .post('todos', {
                todo: todo
            })
            .then((res) => {
                setCreateState(!createState);
                setTodo("")
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <CreateTodoWrap>
            <Input
                type="text"
                data-testid="new-todo-input"
                placeholder="할 일을 입력하세요"
                value={todo}
                onChange={onChange}
            />
            <SendButton
                data-testid="new-todo-add-button"
                onClick={CreateTodo}>
                추가
            </SendButton>
        </CreateTodoWrap>
    )
}

export default CreateTodo;

const CreateTodoWrap = styled.div`
    display : flex;
`;