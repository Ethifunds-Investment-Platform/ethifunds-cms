import Render from "@/components/render";
import TabContainer from "../../tab-container";
import useActivityLog from "./use-activity-log";
import ActivityLogTable from "./activity-log-table";

export default function ActivityLog() {
	const { isFetching, isError, error, activityLog } = useActivityLog();

	return (
		<TabContainer value={"activity_log"}>
			<div className="p-5">
				<Render isLoading={isFetching} isError={isError} error={error}>
					<ActivityLogTable data={activityLog ?? []} isEmpty={!activityLog?.length} />
				</Render>
			</div>
		</TabContainer>
	);
}
