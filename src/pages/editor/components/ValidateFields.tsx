import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setPdfFound } from "../editorSlice";
import { useNavigate } from "react-router-dom";


const res: {
    Title: string;
    templateType: string;
    fields: {
        fieldName: string;
        fieldType: string;
        suggestedValue?: string;
    }[];
} = {
    Title: "Generating a Rent Agreement",
    templateType: "rent123",
    fields: [
        {
            fieldName: "OwnerName",
            fieldType: "String",
            suggestedValue: "Ramesh"
        },
        {
            fieldName: "TenantName",
            fieldType: "String",
            suggestedValue: "Chinmay"
        }
    ]
};

function ValidateFields() {
    const initialState = res.fields.reduce((acc, field) => {
        acc[field.fieldName] = field.suggestedValue || '';
        return acc;
    }, {} as { [key: string]: string });

    const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>(initialState);

    const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValues({
            ...fieldValues,
            [key]: event.target.value,
        });
    };


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pdfFound } = useSelector((state: RootState) => state.editor);
    
    const handleOnSubmit = () => {
        console.log(fieldValues);
        dispatch(setPdfFound(true));
        navigate("/viewer");
        
    }

    return (
        <div>
            <Stack spacing={2} sx={{marginTop: 3 , alignItems: "center", }}>

            <Box sx={{ marginTop: 3, fontWeight: "bold", fontSize: "32px" }}>{res.Title}</Box>
            <Box sx={{ marginTop: 3, fontSize: "20px" }}>Please fill the values below</Box>

            {res.fields.map((field) => (
                <Stack key={field.fieldName} sx={{  alignItems: "center",  }} spacing={2} direction={"row"}>
                    <Box>{field.fieldName}</Box>
                    <TextField value={fieldValues[field.fieldName]} onChange={handleChange(field.fieldName)} variant="standard" />
                </Stack>
            ))}

            <Button variant="contained" onClick={handleOnSubmit}>Generate PDF</Button>
            </Stack>
        </div>
    )
}   

export default ValidateFields;