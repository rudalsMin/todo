const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// MySQL 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'todo' // 데이터베이스 이름 확인
});

// MySQL 연결 확인
db.connect(err => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
        process.exit(1); // 프로그램 종료
    }
    console.log('MySQL에 연결되었습니다.');
});

// 미들웨어
app.use(cors());
app.use(express.json()); // JSON 데이터 파싱

// 기본 경로 처리
app.get('/', (req, res) => {
    res.send('Welcome to the Memo API!');
});

// 메모 저장 API
app.post('/save-memo', (req, res) => {
    const { text } = req.body; // React에서 보낸 데이터를 받음

    if (!text) {
        return res.status(400).json({ message: 'Text is required' });
    }

    const query = 'INSERT INTO Lists (text) VALUES (?)'; // 테이블 이름 수정
    db.query(query, [text], (err, result) => {
        if (err) {
            console.error('Error saving memo:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({ message: 'Memo saved successfully', id: result.insertId });
    });
});
// 메모 삭제 API
// 서버 코드 (Node.js)
app.post('/delete-memo', (req, res) => {
    const { id } = req.body; // 요청에서 삭제할 메모의 ID 받음
    
    console.log("Request to delete memo with id:", id); // 요청 확인

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    const query = 'UPDATE Lists SET isDeleted = TRUE WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting memo:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        console.log("Memo deleted successfully with id:", id); // 업데이트 성공 확인
        res.status(200).json({ message: 'Memo marked as deleted' });
    });
});



// 서버 실행
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
