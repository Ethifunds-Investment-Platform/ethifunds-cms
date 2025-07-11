import PinInput from "@/components/ui/form-input/otp-input";
import useForm from "./use-form";
import Button from "@/components/app-button";
import ResendOtp from "./resend-otp";
import classNames from "classnames";

export default function Form() {
	const { isLoading, formData, errorMsg, updateForm, submit } = useForm();

	const inputClass = classNames("!size-12 bg-neutral-200 border-white", {
		"!border-error-200 border-2 shake-animation !bg-white": errorMsg.length > 0,
	});

	return (
		<div className="flex flex-col gap-4 rounded-xl lg:rounded-3xl bg-white shadow-lg border px-4 py-8 lg:px-8 lg:py-5 w-full lg:w-96 mx-auto">
			<div className="text-center space-y-1">
				<PinInput
					value={formData.otp_code}
					valueLength={4}
					onChange={(e) => updateForm(e)}
					inputClass={inputClass}
				/>
				{errorMsg && (
					<p className="text-error-200 text-xs shake-animation">
						You've entered a wrong code. Please try again{" "}
					</p>
				)}
			</div>
			<p className="content-standard text-neutral-700 text-center">
				Didn’t get a code? <ResendOtp />
			</p>

			<div className="text-center pt-5">
				<Button
					onClick={submit}
					isLoading={isLoading}
					variant="primary"
					className="text-white w-full rounded-xl content-accent"
					disabled={isLoading}
				>
					Proceed
				</Button>
			</div>
		</div>
	);
}
