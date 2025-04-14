import TransactionDetails from "@/features/transactions/transaction-details";
import useSeo from "@/hooks/use-seo";

export default function TransactionDetailsPage() {
	useSeo({ pageTitle: "Transactions Details" });
	return <TransactionDetails />;
}
