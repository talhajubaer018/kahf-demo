import { cn } from "@/utils/tailwind-merge";
import React from "react";
import IconComponent from "../IconComponent";
import { COLOR_ERROR } from "@/utils/colorUtils";

type PropTypes = {
    name: string;
    errors: any;
    className?: string;
};

const ErrorValidationComponent = ({ name, errors, className }: PropTypes) => {
    return (
        <React.Fragment>
            {
                errors[name] ?
                    <div className={cn("flex items-center gap-1 font-medium text-errorColor text-[12px]", className)}>
                        <p><IconComponent name={"Warning"} color={COLOR_ERROR} fontSize={16} /></p>
                        {
                            errors[name]?.message === "Invalid format" ? `Invalid format` :
                                errors[name]?.message === "Required" || errors[name]?.message === "Expected string, received object" ? `This field is required` :
                                    `${errors[name]?.message}`
                        }
                    </div>
                    : null
            }
        </React.Fragment>
    );
};

export default ErrorValidationComponent;
