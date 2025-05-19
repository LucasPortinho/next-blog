'use client';

type ErrorMessageProps = {
    pageTitle: string,
    contentTitle: string,
    content: React.ReactNode
}

export default function ErrorMessage({ pageTitle, contentTitle, content }: ErrorMessageProps) {
    return (
        <>
            <title>{pageTitle}</title>

            <div className="bg-slate-900 text-slate-100 min-h-[320px] p-8 mb-16 rounded-xl flex items-center justify-center text-center">
                <div>
                    <h1 className="text-7xl/normal font-bold mb-4">{contentTitle}</h1>
                    <div>{content}</div>  
                </div>
            </div>
        </>
    )
}