import { currencyList } from "@/constants/currency-list";
import { Admin } from "@/types/admin.types";
import { Currency } from "@/types/global.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AccountState = {
	account: Admin;
	token: string;
	currency: Currency;
};

const initialState: AccountState = {
	account: {} as Admin,
	token: "",
	currency: currencyList[0],
};

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		changeAccount: (state, action: PayloadAction<Admin>) => {
			return {
				...state,
				account: action.payload,
			};
		},

		changeToken: (state, action: PayloadAction<string>) => {
			return {
				...state,
				token: action.payload,
			};
		},

		updateAccount: (state, action: PayloadAction<Partial<Admin>>) => {
			return {
				...state,
				account: { ...state.account, ...action.payload },
			};
		},

		changeCurrency: (state, action: PayloadAction<Currency>) => {
			return {
				...state,
				currency: action.payload,
			};
		},
	},
});

export const { changeAccount, changeToken, updateAccount, changeCurrency } = accountSlice.actions;
export default accountSlice.reducer;
