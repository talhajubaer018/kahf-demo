'use client'

import { LinkedinLogo, YoutubeLogo, GithubLogo, Link, UserCircle, ArrowRight, Eye, Image as ImageIcon, Warning } from '@phosphor-icons/react'
import React from 'react'

export type IconNameProps = ''
    | 'Link'
    | 'UserCircle'
    | 'github'
    | 'youtube'
    | 'linkedIn'
    | 'ArrowRight'
    | 'Loader'
    | 'Eye'
    | 'ImageIcon'
    | 'Warning'




type PropTypes = {
    name: IconNameProps,
    fontSize?: number,
    color: string,
    hoverColor?: string,
    className?: string,
    weight?: 'thin' | 'light' | 'regular' | 'fill' | 'duotone' | 'bold'
}

const iconMap: { [key: string]: React.ReactElement } = {
    UserCircle: <UserCircle />,
    Link: <Link />,
    github: <GithubLogo />,
    youtube: <YoutubeLogo />,
    linkedIn: <LinkedinLogo />,
    ArrowRight: <ArrowRight />,
    Eye: <Eye />,
    ImageIcon: <ImageIcon />,
    Warning: <Warning />,

}

const IconComponent = ({ name, fontSize, color, hoverColor, className, weight }: PropTypes) => {
    const defaultIconSize = 18
    const selectedIcon = iconMap[name]

    if (selectedIcon) {
        return React.cloneElement(selectedIcon, {
            size: fontSize ?? defaultIconSize,
            color: className?.includes('hover') ? hoverColor : color,
            className: className ?? '',
            weight: weight ?? 'bold'
        })
    }

    return null
}

export default IconComponent
