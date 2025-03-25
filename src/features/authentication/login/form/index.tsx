import { Input } from "@/components/ui/form-input";
import { formFields } from "./data";
import useForm from "./use-form";
import { Link } from "react-router-dom";
import Button from "@/components/app-button";

export default function Form() {
	const { isLoading, formData, errorMsg, updateForm, submit } = useForm();

	return (
		<form
			className="flex flex-col gap-4 rounded-xl lg:rounded-3xl bg-white shadow border px-4 py-8 lg:px-8 lg:py-5"
			onSubmit={submit}
		>
			{formFields.map((item, idx) => {
				return (
					<Input
						key={idx}
						{...item}
						value={formData[item.name]}
						onChange={updateForm}
						disabled={isLoading}
						invalid={errorMsg.length > 0}
					/>
				);
			})}

			<div className="flex justify-between items-center">
				<Link to={"/recovery"} className="text-secondary content-accent">
					Forgot Password?
				</Link>
			</div>
			<div className="pt-5">
				<Button
					type="submit"
					isLoading={isLoading}
					variant="primary"
					className="text-white w-full rounded-xl content-accent"
					disabled={isLoading}
				>
					Login
				</Button>
			</div>
		</form>
	);
}
