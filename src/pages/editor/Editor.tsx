import { useState } from "react";
import SearchTemplates from "./components/SearchTemplates";
import ValidateFields from "./components/ValidateFields";
import Viewer from "./components/Viewer";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from '../../store'




function Editor() {

    const dispatch = useDispatch()
    const { templateFound } = useSelector((state: RootState) => state.editor);

    return (
        <div>
            <SearchTemplates/>
            {templateFound && <ValidateFields/>}
        </div>
    )
}

export default Editor;