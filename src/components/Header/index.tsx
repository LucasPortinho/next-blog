import clsx from "clsx"
import Link from "next/link"

export const Header = () => {
    return (
        <header>
            {/* Primeira parte do clsx: Mobile -> Tailwind é mobile first. SM é acima de 640px*/}
            {/*Small (640px), medium(768px), */}
            <h1 className={clsx(
            'text-4xl/normal font-extrabold py-8', 
            'sm:text-5xl/normal sm:py-10', 
            'md:text-6xl/normal md:py-11',
            'lg:text-7xl/normal lg:py-12')}>
                <Link href="/">The blog</Link>
            </h1>
        </header>
    )
}