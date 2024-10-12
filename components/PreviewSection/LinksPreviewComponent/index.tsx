import IconComponent from '@/components/IconComponent'
import { capitalizeFirstLetter } from '@/helpers/helperFunctions'
import { COLOR_WHITE } from '@/utils/colorUtils'
import { cn } from '@/utils/tailwind-merge'
import React from 'react'


type PropsType = {
    linksArray: {
        id: string;
        value: 'github' | 'youtube' | 'linkedIn' | ''
        label: string;
        platform: string;
        link: string;
    }[]
}

const LinksPreviewComponent = (props: PropsType) => {

    return (
        <div className='w-1/2 flex flex-col gap-4 mt-12'>
            {
                props?.linksArray?.map((link) => {
                    return (
                        <div
                            key={`${link?.id}`}
                            className={
                                cn('bg-textLightGray rounded-md py-2 px-3 mx-4 flex items-center gap-x-2 text-white text-sm',
                                    { 'bg-black': link?.value === 'github' },
                                    { 'bg-[#ef383a]': link?.value === 'youtube' },
                                    { 'bg-[#2d69ff]': link?.value === 'linkedIn' },
                                )
                            }
                        >
                            <IconComponent fontSize={13} weight='fill' name={link?.value} color={COLOR_WHITE} />
                            {capitalizeFirstLetter(link?.value)}
                            <IconComponent fontSize={13} className='ml-auto' name={'ArrowRight'} color={COLOR_WHITE} />

                        </div>
                    )
                })
            }
        </div>
    )
}

export default LinksPreviewComponent