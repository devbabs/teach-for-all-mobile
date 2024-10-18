export interface FormFieldsInterface {
    fields: FormFieldInterface[]
}

export const InitialFormFieldsState: FormFieldsInterface = {
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Enter your name',
            numberOfLines: 1,
            isRequired: true
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email',
            numberOfLines: 1,
            isRequired: true
        },
        {
            name: 'phone',
            label: 'Phone Number',
            type: 'phone',
            placeholder: 'Enter your phone number',
            numberOfLines: 1,
            isRequired: true
        },
        {
            name: 'message',
            label: 'Message',
            type: 'text',
            placeholder: 'Enter your message',
            numberOfLines: 4,
            isRequired: true
        }
    ]
}

export interface FormFieldInterface {
    name?: string
    label: string
    type: 'text' | 'number' | 'phone' | 'email' | 'password'
    placeholder?: string
    numberOfLines?: number
    isRequired?: boolean
}