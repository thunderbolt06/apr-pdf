import { Box, Button, MenuItem, Modal, Select, Stack, TextField, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendFreeText } from "../../../services/Service";
import { RootState } from "../../../store";
import { setTemplate, setTemplateFound } from "../editorSlice";
import { GridLoader } from "react-spinners";

let TEMPLATE_NAMES = ["COVID", "Airline bill", "Rent Agreement", "Or choose a template"];

function SearchTemplates() {

    
    const dispatch = useDispatch()
    const { templateFound } = useSelector((state: RootState) => state.editor);

    const [freeText, setFreeText] = useState("");
    const [templateType, setTemplateType] = useState("freeText");
    const [isLoading, setIsLoading] = useState(false);
    const [templateFailed, setTemplateFailed] = useState(false);

    const selectTemplate = false;
    const onSubmitHandler = async () => {
        console.log(freeText);
        console.log(templateType);
        console.log(templateFound);
        setIsLoading(true);
        try {
            const response = await sendFreeText("freeText", freeText);
            // const response = "res";r
            
            console.log(typeof response);
            console.log("typeof")
            if (response && response.hasOwnProperty("error")) {
                console.log("template not found");
                setTemplateFailed(true);
            }
            else {
                dispatch(setTemplate(response));
                dispatch(setTemplateFound(true));
            }
          } catch (error) {
            console.log("failed");
            console.error('Failed to send form values:', error);
          }
          finally{
            setIsLoading(false);
          }
    }

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setTemplateType(event.target.value);
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            // Run your function here
            event.preventDefault();
            console.log('Enter key pressed');
            onSubmitHandler();
        }
    };
    const isMobile = window.innerWidth < 600;
    return (
        <div>
            <form onSubmit={onSubmitHandler}>
            <Stack spacing={2} sx={{marginTop: 3 , alignItems: "center", }}>
            <Box sx={{ marginTop: 3, fontWeight: "bold", fontSize: "32px" }}>Welcome To Any PDF</Box>

                <Box width= {isMobile ? "100%" : "50%"}>

                    <TextField 
                        label="Explain the document you want to make here."
                        variant="standard"
                        value={freeText}
                        onChange={(event) => setFreeText(event.target.value)}
                        multiline
                        fullWidth
                        onKeyDown={handleKeyDown}
                        />

                </Box>
                { selectTemplate &&
                <Box width="50%" >
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={templateType}
                        label="templateChoose"
                        onChange={handleChange}
                        fullWidth
                        >
                        {TEMPLATE_NAMES.map((name) => (
                            <MenuItem sx={{color:"#000000"}} value={name}>{name}</MenuItem>
                        ))}
                    </Select>
                    </Box>
                }
                {/* <GridLoader color="#36d7b7" /> */}
                <Button variant="contained" onClick={onSubmitHandler} sx={{color:"#000000"}}>Search Templates</Button>

            </Stack>
            <br></br>
            { isLoading && <GridLoader color="#36d7b7" /> }
                </form>

            {/* add modal if template not found */}
                <Modal open={templateFailed} onClose={() => {setTemplateFailed(false)}}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: isMobile ? '90%' : 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography variant="h6" component="h2">
                            Template not found
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            We are sorry, but we could not find a template that matches the description you provided. 
                            Please try again or select a template from the dropdown menu.
                        </Typography>
                    </Box>
                </Modal >
        </div>
    )
}

export default SearchTemplates;