import { Button, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import post from '../../api/post';
import get from '../../api/get';


const CreateUserModal = ({ isOpen, onClose, setVolunteers} : {isOpen: boolean, onClose: Function, setVolunteers: Function}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setPassword(generateRandomPassword());
  }, [])
  const generateRandomPassword = () => {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomPassword =
      Array.from({ length: 10 }, () => randomChars[Math.floor(Math.random() * randomChars.length)]).join('') +
      Math.floor(10 + Math.random() * 90);
    return randomPassword;
  };

  const handleCreateUser = async() => {
    await post('/User/CreateUser', {
        name,
        email,
        password
    })

    const response = await get("/User/GetAllUsers");
    setVolunteers(await response.json());

    setName('');
    setEmail('');

    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create User
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          disabled
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleCreateUser}>
          Create User
        </Button>
      </div>
    </Modal>
  );
};

export default CreateUserModal;
