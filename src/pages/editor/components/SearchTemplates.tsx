import { Box, Input, TextField } from "@mui/material";
import { useState } from "react";



function SearchTemplates() {

    const [freeText, setFreeText] = useState("");
    return (
        <div>
            <Box>Welcome To Any PDF</Box>
            <TextField 
                label="Explain the document you want to make here."
                variant="standard"
                value={freeText}
                onChange={(event) => setFreeText(event.target.value)}
                />
        </div>
    )
}

export default SearchTemplates;