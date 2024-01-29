import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { contactsApi } from "@/services/contactApi";
import { categoriesApi } from "@/services/categoryApi";
import { usersApi } from "@/services/userApi";
import { productsApi } from "@/services/productApi";
import { warehouseApi } from "@/services/warehouseApi";
import { subCategoriesApi } from "@/services/subcategory";
import { customizationApi } from "@/services/customizationApi";
import { navAdvertisementApi } from "@/services/navAdvertisementApi";
import { couponsApi } from "@/services/couponApi";
import { subscribeApi } from "@/services/subscriberApi";
import { hiringApi } from "@/services/hiringApi";
import { erpApi } from "@/services/erpApi";
import { orderApi } from "@/services/orderApi";
import { salesApi } from "@/services/salesApi";
import { festivalsApi } from "@/services/festivalsApi";
import { bestSellingApi } from "@/services/bestSellingApi";
import { promotionsApi } from "@/services/promotionApi";
import productSlice from "@/store/slice/productSlice";

const rootReducer = combineReducers({
  [contactsApi.reducerPath]: contactsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [promotionsApi.reducerPath]: promotionsApi.reducer,
  [warehouseApi.reducerPath]: warehouseApi.reducer,
  [subCategoriesApi.reducerPath]: subCategoriesApi.reducer,
  [customizationApi.reducerPath]: customizationApi.reducer,
  [couponsApi.reducerPath]: couponsApi.reducer,
  [subscribeApi.reducerPath]: subscribeApi.reducer,
  [hiringApi.reducerPath]: hiringApi.reducer,
  [erpApi.reducerPath]: erpApi.reducer,
  [salesApi.reducerPath]: salesApi.reducer,
  [festivalsApi.reducerPath]: festivalsApi.reducer,
  [bestSellingApi.reducerPath]: bestSellingApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [navAdvertisementApi.reducerPath]: navAdvertisementApi.reducer,
  products: productSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware()
        .concat(subCategoriesApi.middleware)
        .concat(warehouseApi.middleware)
        .concat(promotionsApi.middleware)
        .concat(contactsApi.middleware)
        .concat(categoriesApi.middleware)
        .concat(usersApi.middleware)
        .concat(productsApi.middleware)
        .concat(customizationApi.middleware)
        .concat(subscribeApi.middleware)
        .concat(hiringApi.middleware)
        .concat(couponsApi.middleware)
        .concat(erpApi.middleware)
        .concat(salesApi.middleware)
        .concat(festivalsApi.middleware)
        .concat(bestSellingApi.middleware)
        .concat(orderApi.middleware)
        .concat(navAdvertisementApi.middleware),

    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
