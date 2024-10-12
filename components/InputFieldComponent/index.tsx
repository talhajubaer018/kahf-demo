import { cn } from '@/utils/tailwind-merge'
import React from 'react'
import { Controller } from 'react-hook-form'
import ErrorComponent from '../ErrorComponent'

type PropsType = {
    name: string
    control: any
    className?: string
    children?: any
    errors?: any
    value?: string
    placeholder?: string
}

const InputFieldComponent = (props: PropsType) => {
    return (
        <Controller
            name={props?.name}
            control={props?.control}
            render={({ field }) => (
                <div className="relative flex flex-col bg-white rounded-md w-full mb-0">
                    <input
                        {...field}
                        placeholder={props?.placeholder ?? ''}
                        // value={field?.value ?? props?.value}
                        // type={type ?? 'text'}
                        // placeholder={placeholder}
                        // onKeyUp={handleInputChange}
                        // autoComplete={autoComplete}
                        className={cn(
                            "flex h-9 w-full bg-white rounded-md border border-input hover:border-primary focus:border-primary bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-textMuted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                            props?.className,
                            { "border-errorColor focus-visible:ring-errorColor/50": props?.errors && props?.errors[props?.name]?.message }
                        )}
                    />
                    {props?.children}
                    {
                        props?.errors ? <ErrorComponent name={props?.name} errors={props?.errors} />
                            : null
                    }
                </div>
            )}
        />
    )
}

export default InputFieldComponent