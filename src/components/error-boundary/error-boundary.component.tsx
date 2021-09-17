import React, { ErrorInfo, ReactNode } from "react";
import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText } from "./error-boundary.styles";

interface ErrorBoundaryProps {
    children: ReactNode
}
interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState, any> {
    constructor(props: ErrorBoundaryProps) {
        super(props)

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(_: Error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true}
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error: ", error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png' />
                    <ErrorImageText>Sorry this page is broken</ErrorImageText>
                </ErrorImageOverlay>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary