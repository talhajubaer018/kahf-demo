'use client'

import { Button } from '@/components/ButtonComponent'
import PreviewSection from '@/components/PreviewSection'
import { LinksArrayType } from '@/types/previewTypes'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const PreviewPage = () => {
    const [linksArray, setLinksArray] = useState(
        [
        ] as LinksArrayType
    );

    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [profileDetails, setProfileDetails] = useState({ firstName: '', lastName: '', email: '' })

    useEffect(() => {
        console.log('11111111', JSON.parse(localStorage.getItem('linksArray') ?? ''))
        if (localStorage?.getItem('linksArray')) {
            setLinksArray(JSON.parse(localStorage.getItem('linksArray') as string))
        }
        if (localStorage?.getItem('imagePreview')) {
            setImagePreview((localStorage.getItem('imagePreview') as string))
        }
        if (localStorage?.getItem('profileDetails')) {
            setProfileDetails(JSON.parse(localStorage.getItem('profileDetails') as string))
        }

    }, [])

    const handleShareLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!')
        }).catch(err => {
            console.error('Failed to copy: ', err)
        })
    }

    return (
        <main className='previewPage relative px-4 bg-primary pt-4 min-h-[280px] rounded-br-3xl rounded-bl-3xl'>
            <header className='bg-white rounded-md py-3 px-5 flex items-center'>
                <Link href='/links'>
                    <Button variant={'outline'} className='text-primary' buttonDivClassName='mr-auto'>Back to Editor</Button>
                </Link>
                <Button onClick={handleShareLink} variant={'default'} className='text-white' buttonDivClassName='ml-auto '>Share Link</Button>
            </header>
            <div className=''>
                <PreviewSection
                    linksArray={linksArray}
                    imagePreview={imagePreview}

                    profileDetails={profileDetails}
                    setProfileDetails={setProfileDetails}
                />
            </div>
        </main>
    )
}

export default PreviewPage