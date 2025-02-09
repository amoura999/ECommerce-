import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export function CartContextProvider({ children }) {
    const [cartProducts, setCartProducts] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartId, setcartId] = useState(null)

    async function addToCart(productId) {
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                { productId },
                { headers: { token: localStorage.getItem('tkn') } }
            );
            // setNumOfCartItems(data.numOfCartItems);
            // // setCartProducts(data.data.products);
            // setTotalCartPrice(data.data.totalCartPrice);
            getUserCart()
            return data;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    }

    async function getUserCart() {
        try {
            const { data } = await axios.get(
                'https://ecommerce.routemisr.com/api/v1/cart',
                { headers: { token: localStorage.getItem('tkn') } }
            );
            setCartProducts(data.data.products);
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            setcartId(data.data._id)
            console.log("DATA IS..", data);
            return data;
        } catch (error) {
            console.error('Error getting user cart:', error);
        }
    }

    async function clearCart() {
        try {
            const { data } = await axios.delete(
                'https://ecommerce.routemisr.com/api/v1/cart',
                { headers: { token: localStorage.getItem('tkn') } }
            );
            setNumOfCartItems(0);
            setTotalCartPrice(0);
            setCartProducts([]);
            return data;
        } catch (error) {
            console.error('Error getting user cart:', error);
        }
    }


    async function deleteCart(productId) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { headers: { token: localStorage.getItem('tkn') } })
            setCartProducts(data.data.products);
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice)
            return data
        } catch (error) {
            console.error('Error deleting cart:', error);
        }
    }


    async function updateCart(productId, count) {
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    "count": count
                },
                { headers: { token: localStorage.getItem('tkn') } })
            setCartProducts(data.data.products);
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice)
            return data
        } catch (error) {
            console.log("Error updating cart:", error);
        }
    }


    useEffect(() => {
        getUserCart();
    }, []);


    return <cartContext.Provider value={{
        addToCart,
        cartProducts,
        totalCartPrice,
        numOfCartItems,
        getUserCart,
        deleteCart,
        updateCart,
        clearCart,
        cartId,
        setCartProducts,
        setTotalCartPrice,
        setNumOfCartItems,
    }}>
        {children}
    </cartContext.Provider>

}
