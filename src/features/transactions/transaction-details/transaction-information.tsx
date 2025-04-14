import { Transaction } from "@/types/transaction.types";

export function TransactionInformation(props: Transaction) {
	const data = {
		account_name: props.accountName,
		transaction_category: props.category,
		transaction_type: props.transaction_type,
		description: props.description,
		// fee: props.fee,
		transaction_date: props.transaction_date,
		transaction_reference: props.transaction_reference,
	};

	return (
		<div className="flex flex-col gap-4">
			{Object.entries(data).map(([key, value]) => (
				<div key={key} className="flex justify-between items-center">
					<span className="content-accent capitalize">{key.replace(/_/g, " ")}</span>
					<span>{value}</span>
				</div>
			))}
		</div>
	);
}
