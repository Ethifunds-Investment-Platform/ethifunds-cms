import { BankAccount } from "@/types/bank-account.types";
import AccountCard from "./account-card";


type AccountListProps = {
  data: BankAccount[];
  
};
export default function AccountList(props: AccountListProps) {
  return (
		<div className="grid grid-cols-3 gap-3 w-full">
			{props.data.map((item) => (
				<AccountCard key={item.id} {...item} />
			))}
		</div>
	);
}
