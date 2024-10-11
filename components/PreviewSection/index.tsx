import React from 'react'
import LinksPreviewComponent from './LinksPreviewComponent'

type PropsType = {
    linksArray: {
        id: string;
        value: 'github' | 'youtube' | 'linkedIn' | ''
        label: string;
        platform: string;
        link: string;
    }[]
}

const PreviewSection = (props: PropsType) => {
    return (
        <section className='previewDiv flex flex-col items-center justify-center py-6'>
            <div className='flex flex-col items-center '>
                <div className='w-16 h-16 bg-textLightGray rounded-full'></div>
                <div className='w-32 h-3 bg-textLightGray rounded-full mt-4'></div>
                <div className='w-16 h-1.5 bg-textLightGray rounded-full mt-3'></div>
            </div>
            <LinksPreviewComponent linksArray={props?.linksArray} />
        </section>
    )
}

export default PreviewSection