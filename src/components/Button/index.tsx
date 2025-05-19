'use client'

import { clsx } from "clsx";

type ButtonVariants = 'default' | 'ghost' | 'danger'
type ButtonSizes = 'sm' | 'md' | 'lg'

type ButtonProps = {
    variant?: ButtonVariants;
    size?: ButtonSizes;
} & React.ComponentProps<'button'>

export function Button({ variant='default', size='md', ...props }: ButtonProps) {
    const mapVariants: Record<ButtonVariants, string> = {
        default: clsx('bg-blue-600 text-blue-100 hover:bg-blue-700'),
        danger: clsx('bg-red-600 text-red-100 hover:bg-red-700'),
        ghost: clsx('bg-slate-300 text-slate-900 hover:bg-slate-400'),
    }

    const mapSizes: Record<ButtonSizes, string> = {
        sm: clsx(
            'text-xs/tight py-2 px-2 rounded-sm',
            '[&_svg]:w-4 [&_svg]:h-4'
        ),        
        md: clsx(
            'text-base/tight py-3 px-3 rounded-md',
            '[&_svg]:w-5 [&_svg]:h-5'
        ),       
        lg: clsx(
            'text-lg/tight py-4 px-4 rounded-lg',
            '[&_svg]:w-6 [&_svg]:h-6'
        ),        
    }

    const buttonClasses = clsx(
        mapVariants[variant], mapSizes[size], 
        'flex items-center justify-center transition cursor-pointer gap-2',
        'disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed',
        props.className
    )

    return <button {...props} className={buttonClasses} />  // Ordem importa na hora de aplicar as classes e props
}
