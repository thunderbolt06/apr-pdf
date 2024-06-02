import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setPdfFound, setTemplate, setPdfPath } from "../editorSlice";
import { useNavigate } from "react-router-dom";
import { sendFormValues } from '../../../services/Service';

import { saveAs } from 'file-saver';
import { GridLoader } from "react-spinners";

let template2 = {
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



    const [fieldValues, setFieldValues] = useState<any>({});
    const { pdfFound } = useSelector((state: RootState) => state.editor);
    const [responseMessage, setResponseMessage] = useState<string>('');
    

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        console.log(template);
        console.log("use effect called");
        if (template) {
            const updatedFieldValues: any = {};
            template.fields.forEach((field: any) => {
                updatedFieldValues[field.fieldName] = field.fieldValue;
            });
            setFieldValues(updatedFieldValues);
            console.log(fieldValues);
            console.log(updatedFieldValues);
        }
    }, [template]);
    // const handleFieldChange = (event: { target: { name: SetStateAction<string>; value: SetStateAction<string>; }; }) => {
    //     const { name, value } = event.target;
    //     setFieldValues({ ...fieldValues, [name]: value });
    // }

    
    
    const handleOnSubmit = async () => {
        try {
          setIsLoading(true);

          var fielddict: any = {};
          fielddict["fields"] = [];
          for (const [key, value] of Object.entries(fieldValues)) {
            fielddict["fields"].push({fieldName: key, fieldValue: value});
            
            // console.log(`${key}: ${value}`);
          }
          fielddict["title"] = "Rent Agreement";
          fielddict["pathToCode"] = template.pathToCode;
          console.log(fielddict);
          console.log("feeling dict");
            const response = await sendFormValues(fielddict);
            // const response: any ={};
            setResponseMessage(response);
            dispatch(setPdfPath(response));
            // console.log(formValues);
            console.log(responseMessage);
            dispatch(setPdfFound(true));

            setIsLoading(false);

            saveAs(response, 'downloaded.pdf');
            // navigate("/viewer");

          } catch (error) {
            console.log("failed");
            console.error('Failed to send form values:', error);
          }
    }

    function handleChange(e:any, name:any  ): any {
        setFieldValues({ ...fieldValues, [name]: e.target.value });
        console.log(fieldValues);

    }

    return (
        <div>
            <Stack spacing={2} sx={{marginTop: 3 , alignItems: "center", }}>

            <Box sx={{ marginTop: 3, fontWeight: "bold", fontSize: "32px" }}>{template.title}</Box>
            <Box sx={{ marginTop: 3, fontSize: "20px" , display: "flex", justifyContent: "center", alignItems: "center"}}>Please fill the values below</Box>

            {
                template.fields.map((field: any) => (
                <Stack key={field.fieldName} sx={{ alignItems: "end"  }} spacing={2} direction={"row"}>
                <Box sx={{width: "200px" , textAlign:"center"}}>{field.fieldName} : </Box>
                {/* <Box>{field.fieldValue}</Box> */}
                <TextField value={fieldValues[field.FieldName]} onChange={(e) => handleChange(e, field.fieldName)} variant="standard" />
            </Stack>
                ))
            }
            <br></br>
            <Button variant="contained" onClick={handleOnSubmit} sx={{color:"#000000"}}>Generate PDF</Button>
            {/* { pdfFound && <a href={responseMessage}>Download PDF</a> } */}

            { isLoading && <GridLoader color="#36d7b7" /> }

            </Stack>
        </div>
    )
}   

export default ValidateFields;