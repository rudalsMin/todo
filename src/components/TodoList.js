import React, { useState } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import TodoDate from './TodoDate'; // TodoDate 컴포넌트 임포트

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        const newTodos = [todo, ...todos];
        console.log(newTodos);
        setTodos(newTodos);
    };

    const removeTodo = id => {
        const removedArr = todos.filter(todo => todo.id !== id);
        setTodos(removedArr);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    };

    const completeTodo = id => {
        let updateTodo = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        console.log('complete');
        setTodos(updateTodo);
    };

    return (
        <div className='todo-list'>
            <h1>Todo List</h1>
            <TodoDate /> {/* TodoDate 컴포넌트 사용 추가 */}
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                completeTodo={completeTodo}
            />
        </div>
    );
}

export default TodoList;
