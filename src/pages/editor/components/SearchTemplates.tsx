import { Box, Button, Container, Input, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { SetStateAction, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import { setTemplate, setTemplateFound } from "../editorSlice";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { sendFreeText } from "../../../services/Service";


let TEMPLATE_NAMES = ["COVID", "Airline bill", "Rent Agreement", "Or choose a template"];

function SearchTemplates() {

    
    const [responseMessage, setResponseMessage] = useState<string>('');
    const dispatch = useDispatch()
    const { templateFound, template } = useSelector((state: RootState) => state.editor);

    const [freeText, setFreeText] = useState("");
    const [templateType, setTemplateType] = useState("freeText");

    const onSubmitHandler = async () => {
        console.log(freeText);
        console.log(templateType);
        console.log(templateFound);
        try {
            const response = await sendFreeText("freeText", freeText);
            // const response = "res";r
            setResponseMessage(response);
            console.log(typeof response);
            console.log("typeof")
            dispatch(setTemplate(response));
            dispatch(setTemplateFound(true));


          } catch (error) {
            console.log("failed");
            console.error('Failed to send form values:', error);
          }
    }

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setTemplateType(event.target.value);
    };
    return (
        <div>
            <form onSubmit={onSubmitHandler}>
            <Stack spacing={2} sx={{marginTop: 3 , alignItems: "center", }}>
            <Box sx={{ marginTop: 3, fontWeight: "bold", fontSize: "32px" }}>Welcome To Any PDF</Box>

                <Box width="50%">

                    <TextField 
                        label="Explain the document you want to make here."
                        variant="standard"
                        value={freeText}
                        onChange={(event) => setFreeText(event.target.value)}
                        fullWidth
                        />

                </Box>
                <Box width="50%">

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={templateType}
                    label="templateChoose"
                    onChange={handleChange}
                    fullWidth
                    >
                    {TEMPLATE_NAMES.map((name) => (
                        <MenuItem value={name}>{name}</MenuItem>
                    ))}
                </Select>
                    </Box>
                
                {/* <GridLoader color="#36d7b7" /> */}
                <Button variant="contained" onClick={onSubmitHandler}>Search Templates</Button>

            </Stack>
                </form>
        </div>
    )
}

export default SearchTemplates;