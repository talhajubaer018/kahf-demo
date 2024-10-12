import IconComponent from '@/components/IconComponent'
import ImageComponent from '@/components/ImageComponent'
import { COLOR_WHITE } from '@/utils/colorUtils'
import { cn } from '@/utils/tailwind-merge'
import React, { useState } from 'react'

type PropsType = {
    imagePreview: string | null
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>
}

const UploadPictureSection = (props: PropsType) => {
    

    // const acceptedExtensions = ['.png', 'jpg', 'jpeg', 'bmp'];

    const handleResourceData = (newFiles: File[]) => {
        console.log("🚀 ~ handleResourceData ~ newFiles:", newFiles?.length)
        // const validFiles = newFiles.filter(file => {
        //     const fileExtension = file.name.split('.').pop()?.toLowerCase();
        //     const isExtensionValid = acceptedExtensions.includes(`.${fileExtension}`);
        //     // const isSizeValid = file.size <= 10 * 1024 * 1024; // 10MB in bytes
        //     return isExtensionValid
        // });

        if (newFiles.length > 0) {
            const file = newFiles[0];
            const imageUrl = URL.createObjectURL(file); // Create a URL for the file
            console.log("🚀 ~ handleResourceData ~ imageUrl:", imageUrl)
            props?.setImagePreview(imageUrl)

            localStorage.setItem("imagePreview", imageUrl)
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files)
        handleResourceData(droppedFiles)
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || [])
        handleResourceData(selectedFiles)
        event.target.value = ''
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }
    return (
        <div className='profile-custom-grid bg-[#fafafa] p-4 rounded-md mt-8 text-sm text-gray-500'>
            <div className='my-auto'>Profile picture</div>
            <div className='profile-upload-custom-grid'>
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className={cn("relative cursor-pointer bg-pageBg rounded-md w-[200px] h-[200px] group")}
                >
                    <div className={cn('text-white rounded-md bg-black opacity-70 group-hover:opacity:100 absolute text-sm w-full h-full text-center flex flex-col justify-center my-auto items-center', { 'opacity-0 group-hover:opacity-70 z-[10000]': props?.imagePreview })}>
                        <IconComponent name={'ImageIcon'} color={COLOR_WHITE} className={cn('mx-auto')} />
                        Change Image
                    </div>
                    <input
                        type="file"
                        id="fileInput"
                        className={cn('w-full h-full opacity-0 cursor-pointer absolute z-[10001] uploadInput', { '': props?.imagePreview })}
                        onChange={handleFileSelect}
                        accept=".png, .jpg, .jpeg, .bmp"
                    />
                    <div>
                        {
                            props?.imagePreview ?
                                <ImageComponent imageClassName='object-contain' className="rounded-md imagePreview" src={props?.imagePreview} alt={'profile preview'} width={'w-[200px]'} height={'h-[200px]'} /> : null
                        }
                    </div>
                </div>
                <div className='w-full ml-4'>
                    Image must be below 1024x1024px.<br />
                    Use PNG, JPG or BMP format.
                </div>
            </div>

        </div>
    )
}

export default UploadPictureSection