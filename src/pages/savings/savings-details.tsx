import SavingsDetails from "@/features/savings/savings-details";
import useSeo from "@/hooks/use-seo";

export default function SavingsDetailsPage() {
	useSeo({ pageTitle: "Savings Details" });
	return <SavingsDetails />;
}
