import clsx from 'clsx'

type SpinLoaderProps = {
    className?: string
}

export const SpinLoader = ({ className = ''}: SpinLoaderProps) => {
    const classes = clsx('flex', 'items-center', 'justify-center', className)

    return (
        <div className={classes}>
            <div className='w-[40px] h-[40px] border-5 border-t-transparent border-blue-900 rounded-full animate-spin'>

            </div>
        </div>
    )
}