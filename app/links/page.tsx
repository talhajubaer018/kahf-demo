'use client'

import CustomizeLinksSection from '@/components/CustomizeLinksSection'
import Header from '@/components/Header'
import PreviewSection from '@/components/PreviewSection'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

type LinksArrayType = {
    id: string;
    value: 'github' | 'youtube' | 'linkedIn' | ''
    label: string;
    platform: string;
    link: string;
}[]

const LinksPage = () => {
    const [linksArray, setLinksArray] = useState(
        [
            { id: uuidv4(), value: 'github', label: 'Github', platform: 'Github', link: 'github.com' },
            { id: uuidv4(), value: 'youtube', label: 'Youtube', platform: 'Youtube', link: 'youtube.com' },
        ] as LinksArrayType
    );
    return (
        <main className='mainContainer px-4 bg-red-200 pt-4'>
            <Header currentTab='links' />
            links
            <div className='grid grid-custom gap-x-4'>
                <PreviewSection
                    linksArray={linksArray}
                />
                <CustomizeLinksSection
                    linksArray={linksArray}
                    setLinksArray={setLinksArray}
                />
            </div>
        </main>
    )
}

export default LinksPage