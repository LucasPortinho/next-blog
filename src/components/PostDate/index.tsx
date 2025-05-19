import { formatDatetime, formatRelativeDate } from "@/utils/format-datetime"

type PostDateProps = {
    createdAt: string
}

export function PostDate({ createdAt }: PostDateProps) {
    return (
        <time className="text-slate-600 text-sm" dateTime={createdAt}>
            {`${formatDatetime(createdAt)} (${formatRelativeDate(createdAt)})`}
        </time>
    )
}