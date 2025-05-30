import AllInvestments from "@/features/investments/all-investments";
import useSeo from "@/hooks/use-seo";

export default function AllInvestmentsPage() {
	useSeo({ pageTitle: "All Investments" });
	return <AllInvestments />;
}
