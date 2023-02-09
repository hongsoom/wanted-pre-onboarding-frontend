import React, { useState } from "react";
import styled from "styled-components";
import instance from "../../api/api";
import { CheckInput, InputS, Label } from "../../elements/Input";
import { TfiPencil, TfiTrash, TfiClose } from "react-icons/tfi";

const TodoList = ({ Todos, createState, setCreateState }) => {

    const [editState, setEditState] = useState(false);
    const [checked, setChecked] = useState(false);
    const [editText, setEditText] = useState('');

    const handleChecked = () => {
        setChecked(!checked);
    };

    const onChange = (e) => {
        setEditText(e.target.value);
    };

    const EditTodo = async (id, isCompleted) => {
        await instance
            .put(`todos/${id}`, {
                todo: editText,
                isCompleted: isCompleted
            })
            .then((res) => {
                setCreateState(!createState)
                setEditState(false)
            })
            .catch((err) => { });
    }

    const DeleteTodo = async (id) => {
        await instance
            .delete(`todos/${id}`)
            .then((res) => {
                setCreateState(!createState)
            })
            .catch((err) => { });
    }

    return (
        <TodoListWrap>
            {Todos && Todos.map((list, index) =>
                <ListWrap key={index}>
                    <Label htmlFor={list.id} checked={checked}></Label>
                    <CheckInput
                        id={list.id}
                        type="checkbox"
                        checked={checked}
                        onChange={handleChecked}
                    />
                    {editState ?
                        <>
                            <InputS
                                type="text"
                                data-testid="modify-input"
                                onChange={onChange}
                                value={editText}
                            />
                            <Edit
                                className="edit"
                                data-testid="submit-button"
                                onClick={() => EditTodo(list.id, list.isCompleted)} />
                            <Cancel
                                data-testid="cancel-button"
                                onClick={() => setEditState(false)} />
                        </>
                        :
                        <>
                            <Todo checked={checked}>{list.todo}</Todo>
                            <Edit
                                data-testid="modify-button"
                                onClick={() => setEditState(true)} />
                            <Delete
                                data-testid="delete-button"
                                onClick={() => DeleteTodo(list.id)} />
                        </>}
                </ListWrap>
            )}
        </TodoListWrap>
    )
}

export default TodoList;

const TodoListWrap = styled.div`
    width : 100%;
    height: 500px;
`;

const ListWrap = styled.li`
    list-style-type : none;
    display : flex;
    margin-bottom : 15px;
    padding: 10px;
`;

const Todo = styled.div`
    width : 80%;
    font-family: NotoSansR;
    font-size: ${({ theme }) => theme.fontSizes.l};
    color: ${({ checked, theme }) => checked ? theme.colors.gray : theme.colors.black};
`;

const Edit = styled(TfiPencil)`
    font-size: 23px;
    margin-right: 15px;
    cursor: pointer;

    &.edit {
        margin-left : 10px;
    }
`

const Cancel = styled(TfiClose)`
    font-size: 23px;
    cursor: pointer;
`

const Delete = styled(TfiTrash)`
    font-size: 23px;
    cursor: pointer;
`