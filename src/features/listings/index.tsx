import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import Metrics from "./metrics";
import RecentListing from "./recent-listings";

export default function Listing() {
	useUi({ title: "Listings" });

	return (
		<AppContainer className="space-y-5">
			<Metrics />
			<RecentListing />
		</AppContainer>
	);
}
