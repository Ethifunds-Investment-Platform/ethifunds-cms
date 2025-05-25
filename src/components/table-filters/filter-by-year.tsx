import SelectBox from "../select-box";

type Props = {
	name: string;
	value: string;
	onchange: (value: string) => void;
};
export default function FilterByYear(props: Props) {
	const currentYear = new Date().getFullYear();
	const selectOptions = Array.from({ length: 6 }, (_, i) => ({
		title: (currentYear - i).toString(),
		value: (currentYear - i).toString(),
	}));

	const handleSelect = (value: string) => {
		const year = parseInt(value, 10);
		if (props.onchange) {
			props.onchange(year.toString());
		}
	};

	return (
		<div>
			<SelectBox
				name={props.name}
				options={selectOptions}
				onchange={handleSelect}
				value={props.value}
			/>
		</div>
	);
}
