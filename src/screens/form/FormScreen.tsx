import { StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Text, { TextType } from '../../common/components/Text'
import { Formik, FormikHelpers } from 'formik'
import TextInput from '../../common/components/TextInput'
import Button from '../../common/components/Button'
import * as yup from 'yup';
import { FAB } from 'react-native-paper'
import NewFormField from './components/NewFormField'
import { ArrowPathIcon, CheckIcon, PlusIcon } from 'react-native-heroicons/outline'
import { Colors } from '../../common/utils/colors'
import useFormFields from '../../infrastructure/state-management/custom-hooks/useFormFields'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { resetFormFields } from '../../infrastructure/state-management/form-fields/FormFieldsSlice'

const FormScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const [fields] = useFormFields()
    const form = useRef<FormikHelpers<any> | null>(null)
    let [formFields, setFormFields] = useState({})
    let [validationSchema, setValidationSchema] = useState({})
    const newFormFieldBottomSheet = useRef(null)

    useEffect(() => {
        setFormFields(Object.fromEntries(fields.map(field => [field.name, ''])))
        setValidationSchema(yup.object().shape(Object.fromEntries(fields.map(field => {
            let fieldName = field.name
            let fieldValidation = yup.string()

            if (field.type === 'email') {
                fieldValidation = fieldValidation.email(`${field.name} is not a valid email`)
            }

            if (field.isRequired) {
                fieldValidation = fieldValidation.required(`${field.name} is required`)                    
            }

            return [fieldName, fieldValidation]
        }))))
    }, [fields.length])
    
    const submitForm = (values: any, formikHelpers: FormikHelpers<any>) => {
        formikHelpers.setSubmitting(false)
        formikHelpers.resetForm()
        setTimeout(() => {
            formikHelpers.setErrors({})
        }, 500);
        dispatch(resetFormFields())
        navigation.navigate("FormSuccessScreen", {
            formValues: values,
        })
    }
    
    const showFieldBottomTab = () => {
        newFormFieldBottomSheet?.current?.present()
    }

    return (
        <Formik
            initialValues={formFields}
            onSubmit={submitForm}
            innerRef={form}
            validationSchema={validationSchema}
            validateOnBlur={false}
        >
            {
                ({handleSubmit, handleChange, values, resetForm, isSubmitting, errors}) => (
                    <View style={styles.container}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 400}}>
                            <NewFormField
                                ref={newFormFieldBottomSheet}
                            />

                            {
                                fields.map((eachFormField, formFieldIndex) => {
                                    let keyboardType = 'default'

                                    switch (eachFormField.type) {
                                        case 'email':
                                            keyboardType = 'email-address'
                                            break;
                                        case 'number':
                                            keyboardType = 'number-pad'
                                            break;
                                        case 'phone':
                                            keyboardType = 'phone-pad'
                                            break;
                                        default:
                                            keyboardType = 'default'
                                            break;
                                    }

                                    return (
                                        <View
                                            style={{ marginBottom: 15 }}
                                            key={formFieldIndex}
                                        >
                                            <Text type={TextType.body} style={styles.label}>
                                                {eachFormField.label}
                                            </Text>
                                            <TextInput
                                                placeholder={eachFormField.placeholder}
                                                onChangeText={handleChange(eachFormField.name)}
                                                value={values[eachFormField.name]}
                                                numberOfLines={eachFormField.numberOfLines}
                                                multiline={(eachFormField.numberOfLines ?? 1) > 1}
                                                keyboardType={eachFormField.type === 'email' ? 'email-address' : (eachFormField.type == 'phone' ? 'phone-pad' : 'default')}
                                                secureTextEntry={eachFormField.type === 'password'}
                                                autoCapitalize={eachFormField.type === 'email' ? 'none' : undefined}
                                            />
                                            {
                                                errors && errors[eachFormField.name] && (
                                                    <Text type={TextType.small} style={styles.error}>
                                                        {errors[eachFormField.name]}
                                                    </Text>
                                                )
                                            }
                                        </View>
                                    )
                                })
                            }

                            <Button
                                label={'Submit'}
                                onPress={handleSubmit}
                                disabled={isSubmitting || Object.values(errors).length > 0}
                                style={{marginTop: 20}}
                                icon={<CheckIcon color={Colors.white} size={18} />}
                            />

                            <Button
                                label={'Reset Form'}
                                mode={'outlined'}
                                onPress={() => {
                                    dispatch(resetFormFields())
                                    resetForm()
                                }}
                                style={{marginTop: 20}}
                                icon={<ArrowPathIcon color={Colors.primary} size={18} />}
                            />
                        </ScrollView>

                        <FAB
                            style={styles.fab}
                            icon={() => <PlusIcon color={Colors.white} />}
                            onPress={showFieldBottomTab}
                        />
                    </View>
                )
            }
        </Formik>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 20
    },
    label: {
        marginBottom: 5
    },
    error: {
        color: 'red',
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: Colors.primary,
        borderRadius: 50,
    }
})

export default FormScreen