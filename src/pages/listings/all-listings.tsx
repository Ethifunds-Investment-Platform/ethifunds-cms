import AllListings from "@/features/listings/all-listings";
import useSeo from "@/hooks/use-seo";

export default function AllListingPage() {
	useSeo({ pageTitle: "All Listing" });
	return <AllListings />;
}
