import { ReactNode } from "react"

const RenderCondition = ({children, condition, falseNode}: {
    children: ReactNode
    condition: boolean,
    falseNode?: ReactNode
}) => {
    if (condition) {
        return children
    }

    return falseNode
}

export default RenderCondition