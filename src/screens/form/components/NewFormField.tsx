import { Platform, StyleSheet, Switch, View } from 'react-native'
import React, { forwardRef, useEffect, useRef } from 'react'
import CustomBottomSheet from '../../../common/components/CustomBottomSheet'
import Text, { TextType } from '../../../common/components/Text'
import TextInput from '../../../common/components/TextInput'
import { Formik, FormikHelpers } from 'formik'
import { FormFieldInterface } from '../../../infrastructure/state-management/form-fields/FormFieldsState'
import { RadioButton } from 'react-native-paper'
import { Colors } from '../../../common/utils/colors'
import Button from '../../../common/components/Button'
import { ScrollView } from 'react-native-gesture-handler'
import * as yup from 'yup';
import { useDispatch } from 'react-redux'
import { addFormField } from '../../../infrastructure/state-management/form-fields/FormFieldsSlice'
import { createSlugFromString } from '../../../common/utils/helpers'

const validationSchema = yup.object().shape({
    // name: yup.string().required('name is required'),
    label: yup.string().required('label is required'),
    placeholder: yup.string().required('placeholder is required'),
    numberOfLines: yup.number().required('number of lines is required'),
    type: yup.string().oneOf(['text', 'number', 'email', 'password']).required('type is required'),
});

const NewFormField = forwardRef((props, ref) => {
    const form = useRef<FormikHelpers<FormFieldInterface> | null>(null)
    const dispatch = useDispatch()
    const fieldTypes: string[] = [
        'Text',
        'Number',
        'Email',
        'Password'
    ]    

    const submitForm = (values: FormFieldInterface, formikHelpers: FormikHelpers<FormFieldInterface>) => {
        dispatch(addFormField({
            name: createSlugFromString(values.label),
            label: values.label,
            placeholder: values.placeholder,
            type: values.type,
            numberOfLines: values.numberOfLines,
            isRequired: values.isRequired,
        }))
        formikHelpers.resetForm()
        ref?.current?.dismiss()
    }

    return (
        <Formik
            initialValues={{
                label: '',
                type: 'text',
                placeholder: '',
                numberOfLines: 1,
                isRequired: false,
            }}
            onSubmit={submitForm}
            innerRef={form}
            validationSchema={validationSchema}
        >
            {
                ({handleSubmit, handleChange, values, handleBlur, setFieldValue, isSubmitting, errors}) => (
                    <CustomBottomSheet
                        ref={ref}
                        snapPoints={[720, '95%']}
                        sheetTitle={'Use this form to add a new field'}
                    >
                        <ScrollView>
                            <View style={styles.container}>
                                <View
                                    style={{ marginBottom: 15 }}
                                >
                                    <Text type={TextType.body} style={styles.label}>
                                        Custom Field Name
                                    </Text>
                                    <TextInput
                                        placeholder={''}
                                        onChangeText={handleChange('label')}
                                        value={values.label}
                                    />
                                    {
                                        errors && errors.label && (
                                            <Text type={TextType.small} style={styles.error}>
                                                {errors.label}
                                            </Text>
                                        )
                                    }
                                </View>
                                <View
                                    style={{ marginBottom: 15 }}
                                >
                                    <Text type={TextType.body} style={styles.label}>
                                        Placeholder
                                    </Text>
                                    <TextInput
                                        placeholder={''}
                                        onChangeText={handleChange('placeholder')}
                                        value={values.placeholder ?? ""}
                                    />
                                    {
                                        errors && errors.placeholder && (
                                            <Text type={TextType.small} style={styles.error}>
                                                {errors.placeholder}
                                            </Text>
                                        )
                                    }
                                </View>
                                <View
                                    style={{ marginBottom: 15, flexDirection: 'row', gap: 10 }}
                                >
                                    <View style={{flex: 1}}>
                                        <Text type={TextType.body} style={styles.label}>
                                            Number of lines
                                        </Text>
                                        <TextInput
                                            placeholder={''}
                                            onChangeText={handleChange('numberOfLines')}
                                            value={String(values.numberOfLines ?? "")}
                                            keyboardType={'number-pad'}
                                        />
                                        {
                                            errors && errors.numberOfLines && (
                                                <Text type={TextType.small} style={styles.error}>
                                                    {errors.numberOfLines}
                                                </Text>
                                            )
                                        }
                                    </View>

                                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
                                        <Text type={TextType.body} style={styles.label}>
                                            Required Field?
                                        </Text>
                                        <Switch
                                            value={values.isRequired}
                                            onValueChange={() => {
                                                setFieldValue('isRequired', !values.isRequired);
                                            }}
                                            trackColor={{
                                                false: Colors.gray300,
                                                true: Colors.primaryLight,
                                            }}
                                            thumbColor={values.isRequired ? Colors.primary : Colors.gray900}
                                        />
                                    </View>
                                </View>
                                
                                <View>
                                    <Text type={TextType.body} style={styles.label}>
                                        Field Type
                                    </Text>
                                    
                                    <View style={{flexDirection: 'row'}}>
                                        <RadioButton.Group
                                            onValueChange={handleChange('type')}
                                            value={values.type}
                                        >
                                            {
                                                fieldTypes.map((eachFieldType, fieldTypeIndex) => (
                                                    <View style={styles.radioButtonContainer} key={fieldTypeIndex}>
                                                        <RadioButton.Android
                                                            value={String(eachFieldType).toLowerCase()}
                                                        />
                                                        <Text>{eachFieldType}</Text>
                                                    </View>
                                                ))
                                            }
                                        </RadioButton.Group>
                                    </View>
                                </View>

                                <Button
                                    label={'Submit'}
                                    disabled={isSubmitting || Object.values(errors).length > 0}
                                    onPress={handleSubmit}
                                    style={{marginTop: 20}}
                                />
                            </View>
                        </ScrollView>
                    </CustomBottomSheet>
                )
            }
        </Formik>
    )
})

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 30
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold'
    },
    error: {
        color: 'red'
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    radioButton: {
        borderWidth: Platform.OS === 'ios' ? 1 : 0,
        marginRight: 10
    }
})

export default NewFormField