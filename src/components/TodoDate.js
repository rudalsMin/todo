import React from 'react';

const TodoDate = () => {
    const today = new Date();

    // 템플릿 리터럴 문법 수정
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    return (
        <div className='containerInfo'>
            <div className='date'>{formattedDate}</div>
            <div className='cir1'></div>
            <div className='cir2'></div>
        </div>
        
    );
}

export default TodoDate;
