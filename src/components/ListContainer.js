import React from 'react';
import TodoForm from './TodoForm'; // TodoForm 컴포넌트 불러오기

const ListContainer = () => {
    const handleSubmit = todo => {
        console.log(todo); // 폼이 제출될 때 콘솔에 출력하거나, 상태를 업데이트하는 등의 작업 수행
    };

    return (
        // <div className="todo-container">
            <div className="containerList">
                <TodoForm onSubmit={handleSubmit} />
            </div>
        // </div>
    );
};

export default ListContainer;
