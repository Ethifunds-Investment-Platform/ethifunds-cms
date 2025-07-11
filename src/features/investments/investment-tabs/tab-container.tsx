import { TabsContent } from "@/components/ui/tabs";
import classNames from "classnames";

import ErrorBoundary from "@/components/error-boundary";

type ContainerProps = {
	value: string;
	children: React.ReactNode;
	className?: string;
};
export default function TabContainer(props: ContainerProps) {
	const cn = classNames("pt-5 !outline-none focus-visible:ring-0", props.className);
	return (
		<TabsContent value={props.value} className={cn}>
			<ErrorBoundary>{props.children}</ErrorBoundary>
		</TabsContent>
	);
}
