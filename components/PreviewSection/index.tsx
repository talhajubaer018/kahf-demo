import React from 'react'
import LinksPreviewComponent from './LinksPreviewComponent'
import ImageComponent from '../ImageComponent';

type PropsType = {
    linksArray: {
        id: string;
        value: 'github' | 'youtube' | 'linkedIn' | ''
        label: string;
        platform: string;
        link: string;
    }[]
    imagePreview?: string | null

    profileDetails?: {
        firstName: string;
        lastName: string;
        email: string;
    }
    setProfileDetails?: React.Dispatch<React.SetStateAction<{
        firstName: string;
        lastName: string;
        email: string;
    }>>
}

const PreviewSection = (props: PropsType) => {
    console.log("🚀 ~ PreviewSection ~ props?.imagePreview:", props?.imagePreview)
    return (
        <section className='previewDiv flex flex-col items-center justify-center py-6'>
            <div className='flex flex-col items-center'>
                {
                    props?.imagePreview ?
                        <ImageComponent className='bg-textLightGray rounded-full border-2 border-primary' imageClassName='rounded-full' src={props?.imagePreview} alt={'imagePreview'} width={'w-20'} height={'h-20'} /> :
                        <div className='w-20 h-20 bg-textLightGray rounded-full'></div>
                }
                {
                    props?.profileDetails?.firstName && props?.profileDetails?.lastName ?
                        <div className='h-3 text-center mx-auto mt-2 mb-2'>{`${props?.profileDetails?.firstName} ${props?.profileDetails?.lastName}`}</div> :
                        <div className='w-32 h-3 bg-textLightGray rounded-full mt-4'></div>
                }
                {
                    props?.profileDetails?.email ?
                        <div className='max-w-[200px] text-xs text-gray-400 mt-3'>{props?.profileDetails?.email}</div> :
                        <div className='w-16 h-1.5 bg-textLightGray rounded-full mt-3'></div>
                }
            </div>
            <LinksPreviewComponent linksArray={props?.linksArray} />
        </section>
    )
}

export default PreviewSection