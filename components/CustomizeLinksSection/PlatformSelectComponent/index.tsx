/* eslint-disable no-unsafe-optional-chaining */
import IconComponent from '@/components/IconComponent';
import { COLOR_GRAY } from '@/utils/colorUtils';
import React from 'react'
import Select, { components } from 'react-select';

type PropsType = {
    linksArray: {
        id: string;
        value: 'github' | 'youtube' | 'linkedIn' | '';
        label: string;
        platform: string;
        link: string;
    }[]
    setLinksArray: React.Dispatch<React.SetStateAction<{
        id: string;
        value: 'github' | 'youtube' | 'linkedIn' | '';
        label: string;
        platform: string;
        link: string;
    }[]>>
    index: number
}

const PlatformSelectComponent = (props: PropsType) => {
    const IndicatorSeparator = () => {
        return null
    };

    const SingleValue = (props: any) => {
        console.log("🚀 ~ SingleValue ~ props:", props)
        return (<components.SingleValue {...props}>
            <p>
                <span className="flex items-center gap-x-2 font-regular text-textGray rounded-md relative">
                    <IconComponent weight="fill" fontSize={16} name={props.selectProps.value?.value} color={COLOR_GRAY} />
                    {props.selectProps.value?.label}
                </span>
            </p>
        </components.SingleValue>);
    }

    const options = [
        { value: 'github', label: 'Github', image: 'github' },
        { value: 'youtube', label: 'Youtube', image: 'youtube' },
        { value: 'linkedIn', label: 'LinkedIn', image: 'linkedIn' }
    ]

    return (
        <>
            <div className='text-xs text-textGray mt-3 mb-2'>Platform</div>
            <Select
                options={options}
                components={{ SingleValue, IndicatorSeparator }}
                // styles={singleSelectStyles}
                onChange={(e: any) => {
                    console.log("🚀 ~ SortableItem ~ e:", e)
                    const updatedArray = [...props?.linksArray];
                    updatedArray[props?.index] = {
                        ...updatedArray[props?.index],
                        value: e?.value,
                        label: e?.label,
                        platform: e?.label,
                        link: ''
                    };
                    props?.setLinksArray(updatedArray);
                }}
                defaultValue={props?.linksArray[props?.index]}
            />
        </>
    )
}

export default PlatformSelectComponent