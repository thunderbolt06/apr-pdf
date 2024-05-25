// import React from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import { useState } from 'react';

interface DynamicFormProps {
  map: { [key: string]: string | number };
}

const DynamicForm: React.FC<DynamicFormProps> = ({ map }) => {
  const initialState = Object.keys(map).reduce((acc, key) => {
    acc[key] = '';
    return acc;
  }, {} as { [key: string]: string });

  const [formValues, setFormValues] = useState<{ [key: string]: string }>(initialState);

  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [key]: event.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(formValues);
  };

  return (
    <Box sx={{ p: 3 }}>
      {Object.keys(map).map((key) => (
        <TextField
          key={key}
          label={`${key}`}
          value={formValues[key]}
          onChange={handleChange(key)}
          margin="normal"
          fullWidth
        />
      ))}

      {/* <Button variant="contained" onClick={() => console.log(formValues)} >Generate PDF</Button> */}
    </Box>
  );
};

export default DynamicForm;
