import { Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendFormValues } from '../../../services/Service';
import { RootState } from "../../../store";
import { setPdfFound, setPdfPath } from "../editorSlice";

import { saveAs } from 'file-saver';
import { GridLoader } from "react-spinners";

function ValidateFields() {

    const dispatch = useDispatch();
    const { template } = useSelector((state: RootState) => state.editor);



    const [fieldValues, setFieldValues] = useState<any>({});
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
            <Box sx={{ marginTop: 3, fontSize: "20px" }}>Please fill the values below</Box>

            {
                template.fields.map((field: any) => (
                <Stack key={field.fieldName} sx={{  alignItems: "center",  }} spacing={2} direction={"row"}>
                <Box>{field.fieldName}</Box>
                {/* <Box>{field.fieldValue}</Box> */}
                <TextField value={fieldValues[field.FieldName]} onChange={(e) => handleChange(e, field.fieldName)} variant="standard" />
            </Stack>
                ))
            }

            <Button variant="contained" onClick={handleOnSubmit}>Generate PDF</Button>
            {/* { pdfFound && <a href={responseMessage}>Download PDF</a> } */}

            { isLoading && <GridLoader color="#36d7b7" /> }

            </Stack>
        </div>
    )
}   

export default ValidateFields;