'use client'

import React from 'react'
import IconComponent from '../IconComponent'
import { cn } from '@/utils/tailwind-merge'
import Link from 'next/link'
import { Button } from '../ButtonComponent'
import { COLOR_GRAY, COLOR_PRIMARY } from '@/utils/colorUtils'

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
        <div className='font-extrabold text-lg md:block hidden'>devlinks</div>
      </div>
      <div className='mx-auto flex items-center gap-x-4'>
        <Link href='/links'>
          <div className={cn("flex items-center gap-x-2 rounded-md px-5 py-1.5 text-sm text-textGray", { 'bg-primary/20 text-primary': props?.currentTab === 'links' })}>
            <IconComponent
              name={"Link"}
              weight={props?.currentTab === 'links' ? 'bold' : 'regular'}
              color={props?.currentTab === 'links' ? COLOR_PRIMARY : COLOR_GRAY}
              fontSize={16}
            />
            <div className='font-bold md:block hidden'>Links</div>
          </div>
        </Link>
        <Link href='/profile'>
          <div className={cn("flex items-center gap-x-2 rounded-md px-5 py-1.5 text-sm text-textGray", { 'bg-primary/20 text-primary': props?.currentTab === 'profile' })}>
            <IconComponent
              name={"UserCircle"}
              weight={props?.currentTab === 'profile' ? 'bold' : 'regular'}
              color={props?.currentTab === 'profile' ? COLOR_PRIMARY : COLOR_GRAY}
              fontSize={18}
            />
            <div className='font-bold md:block hidden'>Profile Details</div>
          </div>
          {/* <Button prefixIcon='UserCircle' className={cn('font-bold ', { 'bg-primary/20 text-primary': props?.currentTab === 'profile' })} size={'md'} variant={'default'} >Profile Details</Button> */}
        </Link>
      </div>
      <Link href='/preview'>
        <Button className='ml-auto font-bold text-primary' size={'md'} variant={'outline'}>
          <IconComponent
            className=' block md:hidden'
            name={"Eye"}
            weight={'bold'}
            color={COLOR_PRIMARY}
            fontSize={18}
          />
          <div className='md:block hidden'>Preview</div>
        </Button>
      </Link>
    </header>
  )
}

export default Header