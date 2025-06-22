import useUi from "@/hooks/use-ui";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCustomNavigation from "@/hooks/use-navigation";
import { useQuery } from "@tanstack/react-query";
import getInvestmentCategories from "@/services/investments/get-investment-categories";
import Render from "@/components/render";
import Overview from "./overview";
import Category from "./category";
import ErrorBoundary from "@/components/error-boundary";

export default function InvestmentsTabs() {
	useUi({ title: "Investments" });

	const { isFetching, isError, error, data } = useQuery(["investments-categories"], () =>
		getInvestmentCategories()
	);

	const { queryParams, navigate } = useCustomNavigation();
	const activeTab = queryParams.get("category_id");

	const click = (value: string) => {
		navigate(`?category_id=${value}`);
	};

	return (
		<ErrorBoundary>
			<Render isLoading={isFetching} isError={isError} error={error}>
				<Tabs defaultValue={activeTab ?? "overview"} className="!p-0 outline-none">
					<TabsList className="hide-scrollbar w-full justify-start gap-2 overflow-x-auto overflow-y-hidden rounded-none border-b-2 bg-transparent !p-0 !pb-3 lg:gap-5 lg:border-b">
						<TabsTrigger
							value={"overview"}
							onClick={() => click("overview")}
							className="content-standard hover:content-bold data-[state=active]:content-bold justify-start !rounded-none border-b-2 border-transparent !bg-transparent px-2 py-4 capitalize text-neutral-500 !shadow-none first:pl-0 hover:border-primary hover:text-primary data-[state=active]:border-primary data-[state=active]:!text-primary"
						>
							Overview
						</TabsTrigger>
						{data?.map((item, idx) => {
							return (
								<TabsTrigger
									key={idx}
									value={item.id.toString()}
									onClick={() => click(item.id.toString())}
									className="content-standard hover:content-bold data-[state=active]:content-bold justify-start !rounded-none border-b-2 border-transparent !bg-transparent px-2 py-4 capitalize text-neutral-500 !shadow-none first:pl-0 hover:border-primary hover:text-primary data-[state=active]:border-primary data-[state=active]:!text-primary"
								>
									{item.name}
								</TabsTrigger>
							);
						})}
					</TabsList>

					<Overview />

					{data?.map((cate, idx) => (
						<Category key={idx} category_id={`${cate.id}`} />
					))}
				</Tabs>
			</Render>
		</ErrorBoundary>
	);
}
