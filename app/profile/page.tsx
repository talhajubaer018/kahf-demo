'use client'

import Header from '@/components/Header'
import PreviewSection from '@/components/PreviewSection'
import ProfileSection from '@/components/ProfileSection'
import { LinksArrayType } from '@/types/previewTypes'
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
    const [linksArray, setLinksArray] = useState(
        [
            // { id: uuidv4(), value: 'github', label: 'Github', platform: 'Github', link: 'github.com' },
            // { id: uuidv4(), value: 'youtube', label: 'Youtube', platform: 'Youtube', link: 'youtube.com' },
        ] as LinksArrayType
    );

    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [profileDetails, setProfileDetails] = useState({ firstName: '', lastName: '', email: '' })

    useEffect(() => {
        console.log('11111111', JSON.parse(localStorage.getItem('linksArray') ?? ''))
        if (localStorage?.getItem('linksArray')) {
            setLinksArray(JSON.parse(localStorage.getItem('linksArray') as string))
        }
        // if (localStorage?.getItem('imagePreview')) {
        //     setImagePreview(JSON.parse(localStorage.getItem('imagePreview') as string))
        // }
        if (localStorage?.getItem('profileDetails')) {
            setProfileDetails(JSON.parse(localStorage.getItem('profileDetails') as string))
        }

    }, [])

    return (
        <main className='mainContainer px-4 bg-[#fafafa] pt-4'>
            <Header currentTab='profile' />
            <div className='grid grid-custom gap-x-4 mt-5'>
                <PreviewSection
                    linksArray={linksArray}
                    imagePreview={imagePreview}

                    profileDetails={profileDetails}
                    setProfileDetails={setProfileDetails}
                />
                <ProfileSection
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}

                    profileDetails={profileDetails}
                    setProfileDetails={setProfileDetails}
                />
                
            </div>
        </main>
    )
}

export default ProfilePage