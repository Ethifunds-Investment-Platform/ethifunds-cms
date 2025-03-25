import { variables } from "@/constants";
import { configureStore, Tuple } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {},
	devTools: variables.NODE_ENV === "development",
	middleware: () => new Tuple(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
