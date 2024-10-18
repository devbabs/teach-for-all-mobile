import { useSelector } from "react-redux"
import { RootState } from "../store"

const useFormFields = () => {
    const {fields} = useSelector((state: RootState) => state.formFields)

    return [fields]
}

export default useFormFields