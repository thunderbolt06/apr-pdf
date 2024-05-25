import { createSlice } from '@reduxjs/toolkit'

export const editorSlice = createSlice({
    name: 'editor',
    initialState: {
        templateFound: false,
        pdfFound: false
    },
    reducers: {
        setTemplateFound: (state, action) => {
            state.templateFound = action.payload
        },
        setPdfFound: (state, action) => {
            state.pdfFound = action.payload
        }
    },
})

export const { setTemplateFound, setPdfFound } = editorSlice.actions

export default editorSlice.reducer