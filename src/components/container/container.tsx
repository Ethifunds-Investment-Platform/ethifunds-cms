import classNames from "classnames";
import ErrorBoundary from "../error-boundary";
import * as React from "react";

type ContainerProps = {
	children: React.ReactNode;
	className?: string;
	asChild?: boolean;
	as?: React.ElementType;
};

export default function AppContainer({
	children,
	className,
	asChild,
	as: Component = "div",
}: ContainerProps) {
	const cn = classNames("px-5 lg:px-5 py-5 md:max-w-4xl lg:max-w-6xl", className);

	// If asChild is true and there's a valid first child, clone it with our props
	if (asChild && React.isValidElement(children)) {
		return React.cloneElement(children, {
			...children.props,
			className: classNames(cn, children.props.className),
		});
	}

	return (
		<Component className={cn}>
			<ErrorBoundary>{children}</ErrorBoundary>
		</Component>
	);
}
