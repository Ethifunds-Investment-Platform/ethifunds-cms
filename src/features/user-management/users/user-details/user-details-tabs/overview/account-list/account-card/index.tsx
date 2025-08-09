import { Badge } from "@/components/ui/badge";
import { assets } from "@/constants";

import { BankAccount } from "@/types/bank-account.types";
import { Copy } from "lucide-react";
import { toast } from "sonner";
// import Actions from "./actions";

export default function AccountCard(props: BankAccount) {
	const copy = () => {
		const text = `Account Number: ${props.account_number}\nAccount Name: ${props.account_name}\nBank Name: ${props.bank_name} `;
		navigator.clipboard.writeText(text);
		toast.success("Copied to clipboard");
	};
	return (
		<div className="flex justify-between items-start p-4 rounded-lg border transition hover:bg-neutral-100/20">
			<div className="flex gap-3 items-center grow">
				<Badge
					variant={"outline"}
					className="flex justify-center items-center rounded-full size-10 border-neutral-500"
				>
					<img src={assets.bank_01} alt="bank icon" className="size-full" />
				</Badge>

				<div className="flex flex-col gap-1 capitalize grow">
					<h1 className="content-bold">{props.account_name.toLowerCase()}</h1>
					<div className="flex justify-between content-accent grow text-neutral-500">
						<span>{props.account_number}</span>
					</div>
					<span className="content-accent text-neutral-500">{props.bank_name.toLowerCase()}</span>
				</div>
			</div>

			<Copy onClick={copy} className="cursor-pointer text-neutral-500" size={20} />
		</div>
	);
}
