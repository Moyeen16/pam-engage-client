import { Input, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamName, setTeamName } from '../../store/globalStore';

function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [teamNameLocal, setTeamNameLocal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onFinish(values) {
    sessionStorage.setItem('teamName', teamNameLocal);
    console.log(teamNameLocal);
    dispatch(setTeamName(teamNameLocal));
    setIsLoading(true);
    navigate('/home');
  }

  const onBlurTeamNameLocal = (e) => {
    if (e) {
      setTeamNameLocal(e);
      console.log(e);
    }
  };
  return (
    <div>
      {isLoading ? (
        ''
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            paddingInline: '5rem',
          }}
        >
          <div>
            <Input
              placeholder="Enter Team Name"
              defaultValue={teamNameLocal}
              onBlur={(e) => {
                onBlurTeamNameLocal(e.target.value);
              }}
              style={{ marginTop: '1rem' }}
            />
            <Button
              type="primary"
              onClick={onFinish}
              style={{
                marginTop: '1rem',
                backgroundColor: '#27a6a4',
              }}
            >
              Start
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
