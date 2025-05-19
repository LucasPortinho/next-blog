import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

type PostCoverImageProps = {
    imageProps: React.ComponentProps<typeof Image>
    linkProps: React.ComponentProps<typeof Link>
}

export const PostCoverImage = ({ imageProps, linkProps }: PostCoverImageProps) => {
    return (
        <Link className={clsx("w-full", "h-full", "overflow-hidden", "rounded-xl", linkProps.className)} {...linkProps}>
            <Image 
            className={
                clsx(
                    "w-full", "h-full", "object-cover", "object-center", "group-hover:scale-105", 
                    "transition", "duration-300", "ease-in-out", imageProps.className
                )
            } 
            {...imageProps}
            />
        </Link>
    )
}