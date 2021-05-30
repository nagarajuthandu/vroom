import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import socket from '../../socket';

const Main = (props) => {
  const roomRef = useRef();
  const userRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {

    socket.on('FE-error-user-exist', ({ error }) => {
      if (!error) {
        const roomName = roomRef.current.value;
        const userName = userRef.current.value;

        sessionStorage.setItem('user', userName);
        props.history.push(`/room/${roomName}`);
      } else {
        setErr(error);
        setErrMsg('User name already exist');
      }
    });
  }, [props.history]);

  function clickJoin() {
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;

    if (!roomName || !userName) {
      setErr(true);
      setErrMsg('Enter Room Name or User Name');
    } else {
      socket.emit('BE-check-user', { roomId: roomName, userName });
    }
  }

  return (
    <MainContainer>
      <h1>CMRIT Online Teaching Rooms</h1>
      <Row>
        <Label htmlFor="userName">Enetr User Name</Label>
        <Input type="text" id="userName" ref={userRef} />
      </Row>
      <Row>
        <Label htmlFor="roomName">Select CLASS Room Name</Label>
        </Row>
        <Row>
        I-CSE-A<Input type="radio" value="ICSEA" name="roomName" id="roomName" ref={roomRef} />
        I-CSE-B<Input type="radio" value="ICSEB" name="roomName" id="roomName" ref={roomRef} />
        I-CSE-C<Input type="radio" value="ICSEC" name="roomName" id="roomName" ref={roomRef} />
        I-CSE-D<Input type="radio" value="ICSED" name="roomName" id="roomName" ref={roomRef} />

        
      </Row>
      <Row>
        II-CSE-A<Input type="radio" value="IICSEA" name="roomName" id="roomName" ref={roomRef} />
        II-CSE-B<Input type="radio" value="IICSEB" name="roomName" id="roomName" ref={roomRef} />
        II-CSE-C<Input type="radio" value="IICSEC" name="roomName" id="roomName" ref={roomRef} />
        II-CSE-D<Input type="radio" value="IICSED" name="roomName" id="roomName" ref={roomRef} />

        
      </Row>
      <Row>
        III-CSE-A<Input type="radio" value="IIICSEA" name="roomName" id="roomName" ref={roomRef} />
        III-CSE-B<Input type="radio" value="IIICSEB" name="roomName" id="roomName" ref={roomRef} />
        III-CSE-C<Input type="radio" value="IIICSEC" name="roomName" id="roomName" ref={roomRef} />
        III-CSE-D<Input type="radio" value="IIICSED" name="roomName" id="roomName" ref={roomRef} />

        
      </Row>
      
      <JoinButton onClick={clickJoin}> Join </JoinButton>
      {err ? <Error>{errMsg}</Error> : null}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-middle;
  margin-top: 15px;
  line-height: 35px;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 200px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #e85a71;
`;

const JoinButton = styled.button`
  height: 40px;
  width: 200px;
  margin-top: 35px;
  outline: none;
  border: none;
  border-radius: 15px;
  color: #d8e9ef;
  background-color: #4ea1d3;
  font-size: 25px;
  font-weight: 500;
  justify-content: flex-center;
  :hover {
    background-color: #7bb1d1;
    cursor: pointer;
  }
`;

export default Main;
