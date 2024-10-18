import { configureStore } from '@reduxjs/toolkit'
import { FormFieldsReducer } from './form-fields/FormFieldsSlice'

export const store = configureStore({
    reducer: {
		formFields: FormFieldsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch