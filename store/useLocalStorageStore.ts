import { useLocalStorage } from "@mantine/hooks";
import { AppState, AppStore } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, setCart } from "./cartSlice";
import { useEffect, useState } from "react";

export const useLocalStorageStore = (key: string) => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [initialLoad, setInitialLoad] = useState(true);
  
  useEffect(() => {
    const store = window.localStorage.getItem(key);
    if (store) {
      const parsed: AppState = JSON.parse(store);
      dispatch(setCart(parsed.cart));
    }
  } , [dispatch]);
  
  useEffect(() => {
    if(!initialLoad) {
      const store: AppState = {
        cart,
      };
      window.localStorage.setItem(key, JSON.stringify(store));
    }
    setInitialLoad(false);
  } , [cart]);
}