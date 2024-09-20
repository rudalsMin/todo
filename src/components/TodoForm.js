import React, { useState, useRef, useEffect } from 'react';
import { MdCheck } from "react-icons/md";
import { MdBrowserUpdated } from "react-icons/md";

const TodoForm = props => {
    const [input, setInput] = useState(props.edit ? props.edit.value : ''); // 수정 모드일 경우 기존 값 설정
    const inputRef = useRef(null); // useRef 훅을 사용하여 input 요소에 접근

    useEffect(() => {
        inputRef.current.focus(); // 컴포넌트가 렌더링될 때 input에 자동으로 포커스를 설정
    }, []);

    const handleChange = e => {
        setInput(e.target.value); // 입력 필드 값이 변경될 때 상태 업데이트
    };

    const handleSubmit = async e => { 
        e.preventDefault(); // 폼 제출 시 기본 동작 방지
    
        // 새로운 투두 항목
        const newTodo = {
            id: Math.floor(Math.random() * 10000), // 랜덤 ID 생성
            text: input,
        };
    
        // 서버에 메모 저장 요청
        await saveMemo(input); // saveMemo 함수 호출
    
        props.onSubmit(newTodo);
    
        setInput(''); // 제출 후 입력 필드 초기화
        inputRef.current.focus(); // 제출 후 입력 필드에 포커스 다시 설정
    }    

    const saveMemo = async (memoText) => {
        const response = await fetch('http://localhost:3001/save-memo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: memoText }),
        });

        const data = await response.json();
        console.log(data); // 서버의 응답 처리
    };

    const deleteMemo = async (id) => {
    try {
        const response = await fetch('http://localhost:3001/delete-memo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        const data = await response.json();
        console.log('Response from server:', data); // 서버 응답 확인
    } catch (error) {
        console.error('Error deleting memo:', error);
    }
};

    
    

    return (
        <div className="containerList">
            <form className="todo-form" onSubmit={handleSubmit}>
                {props.edit ? ( 
                    <>
                        <input
                            type="text"
                            placeholder="Update your item" 
                            name="text"
                            className="todo-inputEdit"
                            value={input}
                            onChange={handleChange}
                            ref={inputRef} // input 필드에 ref 설정
                        />
                        <button className="todo-buttonEdit">
                            <MdBrowserUpdated /> {/* 업데이트 아이콘 */}
                        </button>
                    </>
                ) : (
                    <>
                        <div className='to-do'>
                            todo
                        </div>
                        <input
                            type="text"
                            placeholder="Add a to-do"
                            name="text"
                            className="todo-input"
                            value={input}
                            onChange={handleChange}
                            ref={inputRef} // input 필드에 ref 설정
                        />
                        <button className="check-icon">
                            <MdCheck /> {/* 추가 아이콘 */}
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};

export default TodoForm;
