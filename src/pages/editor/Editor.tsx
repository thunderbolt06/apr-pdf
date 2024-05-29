import { useSelector } from "react-redux";
import SearchTemplates from "./components/SearchTemplates";
import ValidateFields from "./components/ValidateFields";

import { RootState } from '../../store';




function Editor() {

    const { templateFound } = useSelector((state: RootState) => state.editor);

    return (
        <div>
            <SearchTemplates/>
            {templateFound && <ValidateFields/>}
        </div>
    )
}

export default Editor;