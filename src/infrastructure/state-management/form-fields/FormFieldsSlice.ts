import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { copyObject } from '../../../common/utils/copyObject'
import { REHYDRATE, RehydrateAction } from 'redux-persist';
import { FormFieldInterface, FormFieldsInterface, InitialFormFieldsState } from './FormFieldsState';

interface RehydrateAppAction extends RehydrateAction {
    payload?: RootState;
}

const rehydrate = (
	state: FormFieldsInterface,
	rehydrateParams: RehydrateAppAction,
) => {
	return copyObject(rehydrateParams.payload?.formFields || state, {
		fields: rehydrateParams.payload?.formFields?.fields ?? [],
	});
};

export const {
    reducer: FormFieldsReducer,
    actions
} =  createSlice({
    name: 'FormFieldsReducer',
    initialState: InitialFormFieldsState,
    reducers: {
        addFormField: (state, action: {payload: FormFieldInterface}) => {
            state.fields.push(action.payload)
        },
        resetFormFields: (state) => {
            state.fields = InitialFormFieldsState.fields
        }
    },
    extraReducers: builder => {
        builder.addCase(REHYDRATE, rehydrate);
    }
})

export const {
    addFormField,
    resetFormFields
} = actions