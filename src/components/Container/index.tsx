type ContainerProps = {
    children: React.ReactNode,
}

export function Container({children}: ContainerProps) {
    return (
        <div className="min-h-screen dark:bg-slate-900 dark:text-slate-100 light:bg-slate-100 text-slate-900">
            <div className="max-w-screen-lg px-8 text-justify mx-auto">
                {children}
            </div>
        </div>
    )
}