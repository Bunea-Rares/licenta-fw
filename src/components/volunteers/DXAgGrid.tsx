import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CreateUserModal from './CreateUserModal'; // Import the CreateUserModal component
import { Button } from '@mui/material';

export const DXAgGrid = (props: any) => {
  const [isCreateUserModalOpen, setCreateUserModalOpen] = useState(false);

  const colDefs = [
    { field: 'id', width: 100 },
    { field: 'name', width: 150 },
    { field: 'email', width: 200 },
    // {field: 'roles'}
  ];

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Button variant="contained" color="primary" onClick={() => setCreateUserModalOpen(true)}>
          Add
        </Button>
      </div>
      <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
        <AgGridReact rowData={props.volunteers} columnDefs={colDefs}></AgGridReact>
      </div>
      <CreateUserModal setVolunteers={props.setVolunteers} isOpen={isCreateUserModalOpen} onClose={() => setCreateUserModalOpen(false)} />
    </div>
  );
};
