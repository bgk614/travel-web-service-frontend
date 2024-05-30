import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiox from 'axios';
import '../../styles/LoginStyle/Signup.css';

function Signup() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [isCheckingUserId, setIsCheckingUserId] = useState(false);
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(null);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
  const navigate = useNavigate();

  function validateInputs() {
    const inputErrors = {};
    if (!userId) {
      inputErrors.userId = '아이디를 입력하세요.';
    }
    if (!password || password.length < 8 || password.length > 20) {
      inputErrors.password = '비밀번호는 최소 8자 이상, 최대 20자 이하여야 합니다.';
    }
    if (!nickname) {
      inputErrors.nickname = '닉네임을 입력하세요.';
    }
    if (!name) {
      inputErrors.name = '이름을 입력하세요.';
    }
    if (!birthDate) {
      inputErrors.birthDate = '생년월일을 입력하세요.';
    }
    if (!phoneNumber || !/^010-\d{4}-\d{4}$/.test(phoneNumber)) {
      inputErrors.phoneNumber = '유효한 전화번호를 입력하세요.';
    }
    return inputErrors;
  }

  const handleCheckUserId = async () => {
    const inputErrors = validateInputs();
    if (inputErrors.userId) {
      setErrors(inputErrors);
      return;
    }
    setIsCheckingUserId(true);
    try {
      const response = await axiox.post('http://localhost:8000/check-userid/', { userId });
      setIsUserIdAvailable(response.data.available);
      setErrors({ ...errors, userId: response.data.available ? null : '중복된 아이디입니다.' });
    } catch (error) {
      console.error('아이디 중복 확인에 실패했습니다.', error);
      setErrors({ ...errors, userId: '아이디 중복 확인 중 오류가 발생했습니다.' });
    }
    setIsCheckingUserId(false);
  };

  const handleCheckNickname = async () => {
    const inputErrors = validateInputs();
    if (inputErrors.nickname) {
      setErrors(inputErrors);
      return;
    }
    setIsCheckingNickname(true);
    try {
      const response = await axiox.post('http://localhost:8000/check-nickname/', { nickname });
      setIsNicknameAvailable(response.data.available);
      setErrors({ ...errors, nickname: response.data.available ? null : '중복된 닉네임입니다.' });
    } catch (error) {
      console.error('닉네임 중복 확인에 실패했습니다.', error);
      setErrors({ ...errors, nickname: '닉네임 중복 확인 중 오류가 발생했습니다.' });
    }
    setIsCheckingNickname(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputErrors = validateInputs();

    if (isUserIdAvailable === null) {
      inputErrors.userId = '아이디 중복 확인을 해주세요.';
    }
    if (isNicknameAvailable === null) {
      inputErrors.nickname = '닉네임 중복 확인을 해주세요.';
    }

    if (Object.keys(inputErrors).length > 0) {
      setErrors(inputErrors);
      return;
    }

    try {
      const signupData = {
        userId,
        password,
        nickname,
        name,
        birthDate,
        phoneNumber
      };
      const response = await axiox.post('http://localhost:8000/signup/', signupData);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('회원가입에 실패했습니다.', error);
      setErrors({
        ...errors,
        apiError: error.response ? error.response.data.message : '회원가입 중 오류가 발생했습니다.'
      });
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디"
        />
        <button type="button" onClick={handleCheckUserId} disabled={isCheckingUserId}>
          {isCheckingUserId ? '확인 중...' : '중복 확인'}
        </button>
        {errors.userId && <div className="error-message">{errors.userId}</div>}
        {isUserIdAvailable && <div className="success-message">사용 가능한 아이디입니다.</div>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        {errors.password && <div className="error-message">{errors.password}</div>}
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
        />
        <button type="button" onClick={handleCheckNickname} disabled={isCheckingNickname}>
          {isCheckingNickname ? '확인 중...' : '중복 확인'}
        </button>
        {errors.nickname && <div className="error-message">{errors.nickname}</div>}
        {isNicknameAvailable && <div className="success-message">사용 가능한 닉네임입니다.</div>}
        <input
          type="text"
          className='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
        <div className='birthday-text'>생년월일</div>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        {errors.birthDate && <div className="error-message">{errors.birthDate}</div>}
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="전화번호"
        />
        {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}

        {errors.apiError && <div className="error-message">{errors.apiError}</div>} {/* 서버로부터의 응답이 실패했을 때 사용자에게 에러 메시지를 표시*/}

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Signup;
