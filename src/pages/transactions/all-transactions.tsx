import AllTransactions from "@/features/transactions/all-transactions";
import useSeo from "@/hooks/use-seo";

export default function AllTransactionsPage() {
	useSeo({ pageTitle: "Transactions" });
	return <AllTransactions />;
}
