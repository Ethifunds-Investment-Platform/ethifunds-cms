import { Badge } from "@/components/ui/badge";
import { amountSeparator } from "@/lib/amount-separator";
import useAppSelectors from "@/store/use-app-selectors";
import { Transaction } from "@/types/transaction.types";
import classNames from "classnames";

type HeaderProps = {
	amount: Transaction["amount"];
	status: Transaction["status"];
};
export function TransactionHeader(props: HeaderProps) {
	const { currency } = useAppSelectors("account");

	const badgeClx = classNames("capitalize", {
		"bg-error-100 text-error-300 border-error-300": props.status === "failed",
		"bg-warning-100 text-warning-300 border-warning-300": props.status === "pending",
		"bg-success-100 text-success-300 border-success-300": props.status === "success",
	});
	return (
		<div className="flex justify-between  items-center border rounded-lg p-3">
			<div>
				<span>Transaction Amount</span>
				<h1>
					{currency.sign} {amountSeparator(props.amount)}
				</h1>
			</div>

			<Badge className={badgeClx}>{props.status}</Badge>
		</div>
	);
}
