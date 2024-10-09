'use client'

import React from 'react'
import IconComponent from '../IconComponent'
import { cn } from '@/utils/tailwind-merge'
import Link from 'next/link'

type PropsType = {
  currentTab: string
}

const Header = (props: PropsType) => {


  return (
    <header className='flex items-center bg-white px-4 py-2  rounded-md'>
      <div className='flex items-center gap-x-2 mr-auto'>
        <div className='bg-primary rounded-md p-1 logoIcon'>
          <IconComponent name={'Link'} color={'white'} />
        </div>
        <div className='font-extrabold text-lg'>devlinks</div>
      </div>
      <div className='mx-auto flex items-center gap-x-4'>
        <Link href='/links'>
          <div className={cn("flex items-center gap-x-2 rounded-md px-5 py-1.5", { 'bg-primary/20 text-primary': props?.currentTab === 'links' })}>
            <IconComponent
              name={"Link"}
              weight={props?.currentTab === 'links' ? 'bold' : 'regular'}
              color={props?.currentTab === 'links' ? '#613bf7' : "textGray"}
              fontSize={16}
            />
            <div className='font-bold'>Links</div>
          </div>
        </Link>
        <Link href='/profile'>
          <div className={cn("flex items-center gap-x-2 rounded-md px-5 py-1.5", { 'bg-primary/20 text-primary': props?.currentTab === 'profile' })}>
            <IconComponent
              name={"UserCircle"}
              weight={props?.currentTab === 'profile' ? 'bold' : 'regular'}
              color={props?.currentTab === 'profile' ? '#613bf7' : "textGray"}
              fontSize={18}
            />
            <div className='font-bold'>Profile Details</div>
          </div>
        </Link>
      </div>
      <div className="ml-auto text-primary border-[1px] border-primary rounded-md px-5 py-1.5">
        <div>Preview</div>
      </div>
    </header>
  )
}

export default Header