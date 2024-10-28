'use client';

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorState {
    error: Error;
}

const Error = ({ error }: ErrorState) => {

    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <EmptyState title="Uh oh" subtitle="Something went wrong!" />
    )
}

export default Error;