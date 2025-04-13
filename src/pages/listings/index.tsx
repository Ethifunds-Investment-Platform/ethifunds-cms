import Listing from "@/features/listings";
import useSeo from "@/hooks/use-seo";

export default function ListingPage() {
	useSeo({ pageTitle: "Listing" });
	return <Listing />;
}
