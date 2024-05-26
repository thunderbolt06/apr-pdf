import { createSlice } from '@reduxjs/toolkit'

export const editorSlice = createSlice({
    name: 'editor',
    initialState: {
        templateFound: false,
        pdfFound: false,
        template: {
            fields: [{
                fieldName: "",
                fieldValue: ""}],
            title: "",
            pathToCode: ""
        },
        pdfPath: ""
    },
    reducers: {
        setTemplateFound: (state, action) => {
            state.templateFound = action.payload
        },
        setPdfFound: (state, action) => {
            state.pdfFound = action.payload
        },
        setTemplate: (state, action) => {
            state.template = action.payload
        },
        setPdfPath: (state, action) => {
            state.pdfPath = action.payload
        }
    },
})

export const { setTemplateFound, setPdfFound, setTemplate, setPdfPath } = editorSlice.actions

export default editorSlice.reducer