import { underConstruction } from "@/constants/assets";

export default function MobileRestriction() {
	return (
		<div className="flex flex-col items-center justify-center lg:gap-3 grow h-full">
			<h1 className="heading-4 text-primary capitalize">Mobile Device</h1>
			<img
				src={underConstruction}
				alt="underConstruction"
				className="lg:w-1/3 h-96 lg:h-60 object-cover"
			/>
			<div className="flex flex-col items-center justify-center">
				<span className="body-3 text-neutral-700">
					This app currently does not support mobile devices
				</span>
				<span className="body-3 text-neutral-700">coming soon</span>
			</div>
		</div>
	);
}
