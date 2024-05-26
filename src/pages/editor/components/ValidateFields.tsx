import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setPdfFound, setTemplate } from "../editorSlice";
import { useNavigate } from "react-router-dom";
import { sendFormValues } from '../../../services/Service';

import { saveAs } from 'file-saver';

var template2 = {
    "description": "Example of a billing invoice used in an ecommerce store.",
    "fields": [
      {
        "fieldName": "company",
        "fieldType": "string",
        "fieldValue": "Winner360"
      },
      {
        "fieldName": "email",
        "fieldType": "string",
        "fieldValue": "contactus@winner360.com"
      },
      {
        "fieldName": "project",
        "fieldType": "string",
        "fieldValue": "Donkey Excavators"
      },
      {
        "fieldName": "client",
        "fieldType": "string",
        "fieldValue": "CodeWithCodium"
      }
    ],
    "inputs": [
      "company",
      "email",
      "project",
      "client",
      "address line 1",
      "state and pincode"
    ],
    "pathToCode": "/home/cheese-cracker/2024/APR_Hackathon/sample_invoices/sample_invoice1.html",
    "title": "Sample Invoice"
  }


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

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { templateFound, template } = useSelector((state: RootState) => state.editor);
    
    // const [templateObj, setTemplateObj] = useState<any>();
    // setTemplateObj(JSON.parse(template));
    // setTemplateObj(template2);
    // const initialState2 = templateObj.fields.reduce((acc: { [x: string]: any; }, field: { fieldName: string | number; fieldValue: string; }) => {
    //     acc[field.fieldName] = field.fieldValue || '';
    //     return acc;
    // }, {} as { [key: string]: string });
    
    // const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>(initialState2);

    // const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setFieldValues({
    //         ...fieldValues,
    //         [key]: event.target.value,
    //     });
    // };


    const { pdfFound } = useSelector((state: RootState) => state.editor);
    const [responseMessage, setResponseMessage] = useState<string>('');
    const handleOnSubmit = async () => {
        // console.log(fieldValues);
        try {
            // const response = await sendFormValues(fieldValues);
            const response: any ={};
            setResponseMessage(response);
            // console.log(formValues);
            console.log(responseMessage);

            if (response.data) {
                console.log(response.data);
                const blob = new Blob([response.data], { type: 'application/pdf' });
                console.log(blob);
                saveAs(blob, 'downloaded_file.pdf');
                var blobURL = URL.createObjectURL(blob);
                window.open(blobURL);
                // const link = document.createElement('a');
                // link.style.display = 'none';
                // link.href = window.URL.createObjectURL(blob);
                // link.download = 'filename.pdf';
                // document.body.appendChild(link);
                // link.click();
                // document.body.removeChild(link);
            }

          } catch (error) {
            // console.log(fieldValues);r

            console.log("failed");
            console.error('Failed to send form values:', error);
          }
        dispatch(setPdfFound(true));

        // navigate("/viewer");
    }

    return (
        <div>
            <Stack spacing={2} sx={{marginTop: 3 , alignItems: "center", }}>

            <Box sx={{ marginTop: 3, fontWeight: "bold", fontSize: "32px" }}>{template.title}</Box>
            <Box sx={{ marginTop: 3, fontSize: "20px" }}>Please fill the values below</Box>

            {
                template.fields.map((field: any) => (
                    
                <Stack key={field.fieldName} sx={{  alignItems: "center",  }} spacing={2} direction={"row"}>
                <Box>{field.fieldName}</Box>
                <Box>{field.fieldValue}</Box>
                {/* <TextField value={fieldValues[field.fieldName]} onChange={handleChange(field.fieldName)} variant="standard" /> */}
            </Stack>
                ))
            }
            {/* {res.fields.map((field) => (
                <Stack key={field.fieldName} sx={{  alignItems: "center",  }} spacing={2} direction={"row"}>
                    <Box>{field.fieldName}</Box>
                    <TextField value={fieldValues[field.fieldName]} onChange={handleChange(field.fieldName)} variant="standard" />
                </Stack>
            ))} */}

            <Button variant="contained" onClick={handleOnSubmit}>Generate PDF</Button>
            </Stack>
        </div>
    )
}   

export default ValidateFields;