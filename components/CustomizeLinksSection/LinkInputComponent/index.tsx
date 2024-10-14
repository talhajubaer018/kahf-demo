/* eslint-disable no-unsafe-optional-chaining */
import IconComponent from '@/components/IconComponent';
import { COLOR_ERROR, COLOR_GRAY } from '@/utils/colorUtils';
import { cn } from '@/utils/tailwind-merge';
import React from 'react'

type PropsType = {
    link: any
    inputRefs: any
    setFocusedInputId: any
    index: number
    linksArray: any
    setLinksArray: any
    errors: any
}

const LinkInputComponent = (props: PropsType) => {
    return (
        <>
            <div className='text-xs text-textGray mb-1'>Link</div>
            <div className="relative">
                <IconComponent name={"Link"} color={COLOR_GRAY} className="absolute top-[15px] left-3" fontSize={14} />
                <input
                    name={`${props?.link?.id}`}
                    className={cn('mt-0 w-full p-2 pl-8 border-[1px] border-[#cccccc] hover:border-primary rounded-md linkInput focus:outline-primary', { 'border-errorColor': props?.errors[props?.link.id] })}
                    ref={(el) => {
                        props.inputRefs.current[props?.link.id] = el;
                    }}
                    placeholder='Link'
                    value={props?.link?.link}
                    onFocus={() => props?.setFocusedInputId(props?.link.id)}
                    onChange={(e) => {
                        const updatedArray = [...props?.linksArray];
                        updatedArray[props?.index] = {
                            ...updatedArray[props?.index],
                            link: e?.target?.value
                        };
                        props?.setLinksArray(updatedArray);
                    }}
                />
                {props?.errors[props?.link.id] && (
                    <p className="text-errorColor flex items-center gap-x-2 font-medium text-[12px] mt-1">
                        <IconComponent name={"Warning"} color={COLOR_ERROR} fontSize={16} />
                        {props?.errors[props?.link.id]}
                    </p>
                )}
            </div>
        </>
    )
}

export default LinkInputComponent