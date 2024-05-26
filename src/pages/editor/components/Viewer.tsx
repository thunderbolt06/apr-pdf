import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
// import pdf from '../../../assets/rentAgreement.pdf';
import { Document , pdfjs ,Page} from 'react-pdf';
import { Box , Button} from '@mui/material';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { RootState } from "../../../store";
// Ensure the PDF.js worker script is loaded
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
function ViewerPage() {

    const [numPages, setNumPages] = useState<number | null>(null);

    const { pdfPath } = useSelector((state: RootState) => state.editor);
    // Called when the document is successfully loaded
    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
        setNumPages(numPages);
    };

    // Store the file in a variable
    // const file = pdf;
    // const file = 'https://storage.googleapis.com/apr-doc-autofill-pdfs/20240526205721-a1a7d2f0.pdf';
    // useEffect(() => {
        
    //     const file = pdfPath;
    // }, [pdfPath])

    // Function to handle PDF download
    const handleDownload = () => {
        saveAs(pdfPath, 'downloaded.pdf');
    };

    return (
        <>
            <h1>PDF Viewer</h1>
            <Button variant="contained" color="primary" onClick={handleDownload}>
                Download PDF
            </Button>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Box 
                sx={{
                    height: '60vh', // Set the height to 80% of the viewport height
                    width: '50vw', // Optionally set the width to 100% of the container
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    padding: 2, // Add padding if necessary
                    overflow: 'auto', // Enable scroll if the content overflows
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 2
                }}
            >
                <Document
                    file={pdfPath}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {numPages && Array.from(
                        new Array(numPages),
                        (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                        ),
                    )}
                </Document>
            </Box>
            </Box>
        </>
    );
}

export default ViewerPage;
