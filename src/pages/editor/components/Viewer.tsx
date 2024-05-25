
import { Worker } from '@react-pdf-viewer/core';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

import { pdfjs, Document, Page } from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const fileName = "/Users/rahil/projects/APR/APR-React/apr-pdf/assets/somepaper.pdf";
function ViewerPage() {
    return (
        <div>

            {/* <Document
                file={fileName}>
                <Page pageNumber={1} />
                </Document> */}

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
<Viewer fileUrl={fileName} />; 
</Worker>

        </div>
    )
}   

export default ViewerPage;