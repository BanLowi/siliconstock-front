import axios from "axios";
import { createContext, useContext, useState } from "react";

const ProductsContext = createContext()

function ProductsProvider({ children }) {


    //Set loader
    function showLoader() {
        setLoading(false)
    }






    return (
        <MoviesContext.Provider
            value={{

            }}>
            {children}
        </MoviesContext.Provider>
    )
}

function useProducts() {
    const context = useContext(ProductsContext);
    return context
}

export { ProductsProvider, useProducts }