import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

interface WithLoadingProps {
    loading: boolean
}

const WithSpinner = <P extends object>(
    Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> => {
    const WrappedComponent: React.FC<P & WithLoadingProps> = ({loading, ...otherProps}: WithLoadingProps) => {
        return loading ? (<SpinnerOverlay> <SpinnerContainer /> </SpinnerOverlay>) : (<Component {...otherProps as P} />)
    }

    return WrappedComponent
}

export default WithSpinner