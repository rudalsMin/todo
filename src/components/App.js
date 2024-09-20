import React, { useState } from 'react';
import Todo from './Todo';

const App = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', isComplete: false },
        { id: 2, text: 'Build a todo app', isComplete: false }
    ]);

    const toggleComplete = id => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id
                    ? { ...todo, isComplete: !todo.isComplete }
                    : todo
            )
        );
    };

    const removeTodo = id => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    const updateTodo = (id, newValue) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id
                    ? { ...todo, text: newValue }
                    : todo
            )
        );
    };

    const completeTodo = id => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id
                    ? { ...todo, isComplete: true }
                    : todo
            )
        );
    };

    return (
        <Todo
            todos={todos}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            completeTodo={completeTodo}
            toggleComplete={toggleComplete} // `toggleComplete` 전달
        />
    );
};

export default App;
