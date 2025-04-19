import SavingsTransactions from "@/features/savings/savings-transactions";
import useSeo from "@/hooks/use-seo";

export default function SavingsTransactionsPage() {
	useSeo({ pageTitle: "Savings Transactions" });
	return <SavingsTransactions />;
}
