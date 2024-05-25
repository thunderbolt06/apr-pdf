import SearchTemplates from "./components/SearchTemplates";
import ValidateFields from "./components/ValidateFields";
import Viewer from "./components/Viewer";


function Editor() {
    return (
        <div>
            <SearchTemplates/>
            <ValidateFields/>
            <Viewer/>
        </div>
    )
}

export default Editor;