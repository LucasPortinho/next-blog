import { PostModel } from "@/models/post/post-model";
import { formatDatetime, formatRelativeDate } from "@/utils/format-datetime";
import { PostDate } from "../PostDate/index";
import { PostHeading } from "../PostHeading/index";

// NUNCA passe o post completo no next, pois pode ter informações sensíveis.
// E outro desenvolvedor pode colocar useClient nesses casos, comprometendo a segurança da aplicação.
type PostSummaryProps = {
    postLink: string,
    postHeading: 'h1' | 'h2',
    createdAt: PostModel['createdAt'],
    postTitle: PostModel['title'],
    postExcerpt: PostModel['excerpt'],
}

export function PostSummary({ postLink, postHeading, postTitle, postExcerpt, createdAt }: PostSummaryProps) {
    return (
        <div className="flex flex-col gap-4 sm: justify-center">
            <PostDate createdAt={createdAt} />

            <PostHeading href={postLink} as={postHeading}>
                {postTitle}
            </PostHeading>

            <p>
                {postExcerpt}
            </p>
        </div>
    )
}