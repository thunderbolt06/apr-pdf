import { Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setPdfFound, setPdfPath } from "../editorSlice";
import { sendFormValues } from '../../../services/Service';

import { saveAs } from 'file-saver';
import { GridLoader } from "react-spinners";


function ValidateFields() {

    const dispatch = useDispatch();
    const { template } = useSelector((state: RootState) => state.editor);

    const [fieldValues, setFieldValues] = useState<any>({});
    const [responseMessage, setResponseMessage] = useState<string>('');
    

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const updatedFieldValues: any = {};
        template.fields.forEach((field: any) => {
            updatedFieldValues[field.fieldName] = field.fieldValue;
        });
        setFieldValues(updatedFieldValues);
    }, [template]);

    
    
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
                <TextField 
                value={fieldValues[field.fieldName]} 
                onChange={(e) => handleChange(e, field.fieldName)}
                // placeholder={fieldValues[field.fieldName]} 
                variant="standard" />
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