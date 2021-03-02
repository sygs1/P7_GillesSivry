// ? import from react   --- httprequest?
import { useState, useCallback, useRef, useEffect } from "react";

//export const useHttpRequest = () => {

    //?
//}

export const useHttpRequest = () => {
    // useState pour définir l'état de chargement 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeRequest = useRef([]);

    // Fonction stop boucle
    const sendRequest = useCallback(async (url, method = "", body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeRequest.current.push(httpAbortCtrl);

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal,
            });

            const responseData = await response.json();

            activeRequest.current = activeRequest.current.filter((reqCtrl) => reqCtrl !== httpAbortCtrl);

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            // Si reponse ok = reponsedata
            setIsLoading(false);
            return responseData;
        } catch (err) {
            // Si ko, = useState
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, []);

    const clearError = () => {
        setError(null);
    };

    // Annule la requête
    useEffect(() => {
        return () => {
            activeRequest.current.forEach((abortCtrl) => abortCtrl.abort());
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };
};