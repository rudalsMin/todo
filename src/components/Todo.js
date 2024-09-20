import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { GoTrash } from 'react-icons/go';
import { CiEdit } from "react-icons/ci";

const Todo = ({ todos, removeTodo, updateTodo, completeTodo }) => {
    const [edit, setEdit] = useState({
        id: null,
        value: '',
    });

    const submitUpdate = newValue => {
        updateTodo(edit.id, newValue);
        setEdit({
            id: null,
            value: '',
        });
    };

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }

    return (
        <div className="todo-container">
            {todos.map((todo, index) => (
                <div
                    className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
                    key={index}
                >
                    <input
                        type="checkbox"
                        checked={todo.isComplete}
                        className="checkbox"
                        onChange={() => completeTodo(todo.id)} // 체크박스 클릭 시 completeTodo 호출
                    />
                    <div
                        className='list'
                        onClick={() => completeTodo(todo.id)} // 클릭 시 completeTodo 호출
                        style={{ textDecoration: todo.isComplete ? 'line-through' : 'none' }}
                    >
                        {todo.text}
                    </div>
                    <GoTrash
                        className="delete-icon"
                        onClick={() => removeTodo(todo.id)}
                    />
                    <CiEdit
                        className="edit-icon"
                        onClick={() => setEdit({ id: todo.id, value: todo.text })}
                    />
                </div>
            ))}
        </div>
    );
};

export default Todo;
