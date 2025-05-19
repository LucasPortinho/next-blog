import { clsx } from "clsx";
import { useId } from "react";

type InputCheckboxProps = {
    labelText?: string;
    type?: 'checkbox'
} & React.ComponentProps<'input'>

export function InputCheckbox({ labelText='', type='checkbox', ...props }: InputCheckboxProps) {
    const id = useId()
    const inputClasses = clsx(
        'w-4 h-4 focus:ring-blue-600 transition ring-2 rounded outline-0',
        props.className
    )

    return (
        <div className="flex items-center gap-2">
            <input {...props} className={inputClasses} id={id} type={type} />
            {labelText && (
                <label htmlFor={id} className='text-sm'>
                    {labelText}
                </label>
            )}
        </div>
    )
}
