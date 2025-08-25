import AppButton from "@/components/app-button";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import { Input } from "@/components/ui/form-input";
import SelectBox from "@/components/select-box";
import { useAppSelector } from "@/store/hooks";
import useActions from "@/store/actions";
import { z } from "zod";
import ensureError from "@/lib/ensure-error";
import { toast } from "sonner";
import initiateTransaction from "@/services/transactions/initiate-transaction";
import { User } from "@/types/user.types";
import findUser from "@/services/users/find-user";
import Spinner from "@/components/spinner";

const validation = z.object({
	user_id: z.string().min(1, "User is required"),
	amount: z.number().positive("Amount is required"),
	type: z.enum(["deposit", "withdrawal"], {
		message: "Type is required",
	}),
	transaction_source: z.enum(["wallet", "vault"], {
		message: "Transaction type is required",
	}),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
	user_id: "" as any,
	amount: "" as any,
	type: "" as any,
	transaction_source: "" as any,
};

export default React.memo(function InitiateTransactionDialog() {
	const { dialog } = useAppSelector((state) => state.ui);
	const [isLoading, setIsLoading] = React.useState(false);
	const [formData, setFormData] = React.useState(init);
	const [user, setUser] = React.useState<User | null>(null);
	const [gettingUser, setGettingUser] = React.useState(false);
	const [search, setSearch] = React.useState("");

	const { ui } = useActions();
	const open = React.useMemo(
		() => dialog.show && dialog.type === "initiate_transaction",
		[dialog.show, dialog.type]
	);

	const updateForm = (
		name: keyof typeof formData,
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
	) => {
		setFormData((prev) => ({
			...prev,
			[name]: typeof e === "string" ? e : e.target.value,
		}));
	};

	const getUser = async () => {
		if (!search.trim()) return;
		if (gettingUser) return;
		setGettingUser(true);
		try {
			const users = await findUser({ user: search });
			if (users.length > 0) {
				setUser(users[0]);
			}
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast.error(errMsg);
		} finally {
			setGettingUser(false);
		}
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		if (user) {
			setUser(null);
			setFormData(init);
		}
	};

	const submit = async () => {
		if (!user) return;
		setIsLoading(true);
		try {
			const formValues = validation.parse({
				...formData,
				user_id: user?.id.toString(),
				amount: Number(formData.amount),
			});
			await initiateTransaction(formValues);
			showSuccessDialog();
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast.error(errMsg);
		} finally {
			setIsLoading(false);
		}
	};

	const toggleShow = () => {
		if (isLoading) return;
		ui.resetDialog();
	};

	const reset = () => {
		if (isLoading) return;
		setFormData(init);
		setUser(null);
		setSearch("");
	};

	const showSuccessDialog = () => {
		const data = {
			title: "Transaction Initiated!",
			subtitle:
				"Transaction has been initiated successfully, transaction will be processed shortly",
		};

		const dismiss = () => {
			ui.resetDialog();
			reset();
		};

		ui.changeDialog({
			show: true,
			type: "success_dialog",
			data,
			dismiss: dismiss,
		});
	};

	const optionsType = [
		{
			title: "Deposit",
			value: "deposit",
		},
		{
			title: "Withdrawal",
			value: "withdrawal",
		},
	];

	const transactionSources = [
		{
			title: "Wallet",
			value: "wallet",
		},
		{
			title: "Vault",
			value: "vault",
		},
	];

	return (
		<AppDrawer
			title="Initiate Transaction"
			direction="right"
			open={open}
			handleChange={toggleShow}
			footer={
				<div className="flex justify-between gap-3 [&_button]:w-1/2">
					<AppButton
						variant="mute"
						className="bg-neutral-100 text-neutral-700"
						onClick={close}
						disabled={isLoading}
					>
						Cancel
					</AppButton>

					<AppButton variant="primary" isLoading={isLoading} onClick={submit} disabled={!user}>
						Disburse
					</AppButton>
				</div>
			}
			className="overflow-y-auto hideScrollbar"
		>
			<div className="flex overflow-auto flex-col px-5 mt-5 space-y-5 h-full">
				<span className="content-standard text-neutral-500">
					Please fill out the details below to initiate a transaction.
				</span>

				<form className="pb-3 space-y-3">
					<Input
						name="search_user"
						type="text"
						label="Search User"
						placeholder="enter username/email"
						value={search}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								getUser();
							}
						}}
						onBlur={getUser}
						onChange={handleSearch}
						disabled={isLoading || gettingUser}
					/>
					{gettingUser && <Spinner />}
					{user && (
						<>
							<Input
								type="text"
								readOnly
								value={user.user_profile?.first_name + " " + user.user_profile?.last_name}
								disabled
							/>
							<SelectBox
								name="type"
								label="Transaction Type"
								value={formData.type}
								onchange={(e) => updateForm("type", e)}
								options={optionsType}
								disabled={isLoading}
							/>
							<SelectBox
								name="transaction_source"
								label="Transaction Source"
								value={formData.transaction_source}
								onchange={(e) => updateForm("transaction_source", e)}
								options={transactionSources}
								disabled={isLoading}
							/>
							<Input
								name="amount"
								type="number"
								label="Amount"
								placeholder="Enter amount"
								value={formData.amount}
								onChange={(e) => updateForm("amount", e)}
								disabled={isLoading}
							/>
						</>
					)}
				</form>
			</div>
		</AppDrawer>
	);
});
