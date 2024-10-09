import { cn } from '@/utils/tailwind-merge'
import Image from 'next/image'

type PropTypes = {
  src: string,
  alt: string,
  width: string,
  height: string,
  className?: string
  imageClassName?: string
}

const ImageComponent = ({ src, alt, width, height, className, imageClassName }: PropTypes) => {
  return (
    <div className={cn("relative ", `${height} ${width} ${className}`)}>
      <Image style={{ overflow: "hidden", fontSize: "10px" }} fill src={src} alt={alt} className={imageClassName} onError={(err) => console.log('aaaaaa', err)} />
    </div>
  )
}

export default ImageComponent