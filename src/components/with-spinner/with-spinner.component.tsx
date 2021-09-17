import React from "react";
import Spinner from "../spinner/spinner.component";

interface WithLoadingProps {
    loading: boolean
}

const WithSpinner = <P extends object>(
    Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> => {
    const WrappedComponent: React.FC<P & WithLoadingProps> = ({loading, ...otherProps}: WithLoadingProps) => {
        return loading ? (<Spinner />) : (<Component {...otherProps as P} />)
    }

    return WrappedComponent
}

export default WithSpinner