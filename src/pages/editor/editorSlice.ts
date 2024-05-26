import { createSlice } from '@reduxjs/toolkit'

export const editorSlice = createSlice({
    name: 'editor',
    initialState: {
        templateFound: false,
        pdfFound: false,
        template: ""
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
        }
    },
})

export const { setTemplateFound, setPdfFound, setTemplate } = editorSlice.actions

export default editorSlice.reducer