'use client'

import CustomizeLinksSection from '@/components/CustomizeLinksSection'
import Header from '@/components/Header'
import PreviewSection from '@/components/PreviewSection'
import { LinksArrayType } from '@/types/previewTypes'
import React, { useEffect, useState } from 'react'

const LinksPage = () => {
    const [linksArray, setLinksArray] = useState(
        [
            // { id: uuidv4(), value: 'github', label: 'Github', platform: 'Github', link: 'github.com' },
            // { id: uuidv4(), value: 'youtube', label: 'Youtube', platform: 'Youtube', link: 'youtube.com' },
        ] as LinksArrayType
    );

    useEffect(() => {
        console.log('11111111', JSON.parse(localStorage.getItem('linksArray') ?? ''))
        if (localStorage?.getItem('linksArray')) {
            setLinksArray(JSON.parse(localStorage.getItem('linksArray') as string))
        }

    }, [])


    return (
        <main className='mainContainer px-4 bg-red-200 pt-4'>
            <Header currentTab='links' />
            <div className='grid grid-custom gap-x-4 mt-5'>
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