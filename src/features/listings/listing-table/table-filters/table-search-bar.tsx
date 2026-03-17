import { assets } from "@/constants";
import * as React from "react";
import { FilterProps } from ".";
import useCustomNavigation from "@/hooks/use-navigation";
export default React.memo(function TableSearchBar(props: FilterProps) {
	const [text, setText] = React.useState("");
	const { navigate, queryParams } = useCustomNavigation();

	const hasQuery = React.useMemo(() => queryParams.has("search"), [queryParams]);

	const search = () => {
		navigate(`?search=${text}`);
	};

	React.useMemo(() => {
		if (text === "" && hasQuery) queryParams.delete("search");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [text]);

	return (
		<div className="flex items-center gap-3 p-2 border  rounded">
			<div className="cursor-pointer" onClick={search}>
				<img
					src={text ? assets.search_icon_01 : assets.search_icon_02}
					alt="search icon"
					className="size-5"
				/>
			</div>
			<input
				type="search"
				name="search-bar"
				id="search-bar"
				placeholder="Search by seller name"
				className="outline-none"
				onChange={(e) => setText(e.target.value.trim())}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						search();
					}
				}}
				value={text}
				disabled={props.disabled}
			/>
		</div>
	);
});
