import Link from "next/link"

type PostHeadingProps = {
    children: React.ReactNode,
    href: string,
    as?: 'h1' | 'h2'
}

export const PostHeading = ({ children, href, as: Tag = 'h2' }: PostHeadingProps) => {
    const classesMap = {
        h1: "text-2xl/tight font-extrabold sm:text-4xl",
        h2: "text-2xl/tight font-bold"
    }

    return (
        <Tag className={classesMap[Tag]}>
            <Link className="hover:text-slate-500 transition ease-in-out duration-300" href={href}>
                {children}
            </Link>
        </Tag>
    )
}