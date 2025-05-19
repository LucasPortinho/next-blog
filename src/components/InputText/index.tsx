import clsx from "clsx";
import { useId } from "react";

type InputTextProps = {
    labelText?: string;
} & React.ComponentProps<'input'>

export function InputText({ labelText='', ...props }: InputTextProps) {
    const id = useId()  // Gera id's aleatórios -> prevenir erro de associar clique do label no errado.
    const inputClasses = clsx(
        'bg-white outline-0 text-base/tight',
        'ring-2 ring-slate-400 rounded p-2',
        'focus:ring-blue-600 transition',
        'placeholder-slate-300',
        'disabled:bg-slate-200 disabled:placeholder-slate-400 disabled:text-slate-400 disabled:cursor-not-allowed',
        'readonly:bg-slate-200',
        props.className
    )

    return (
        <div className="flex flex-col gap-2">
            {labelText && (
                <label htmlFor={id} className="text-sm">
                    {labelText}
                </label>
            )}
            <input {...props} className={inputClasses} id={id}/>
        </div>
    )
}
