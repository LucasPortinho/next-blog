import clsx from "clsx";
import { Button } from "../Button/index";

type DialogProps = {
    isVisible?: boolean;
    title: string;
    content: React.ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
    disabled: boolean;
}

export function Dialog({ isVisible, title, content, disabled, onConfirm, onCancel }: DialogProps) {
    if (!isVisible) return null;

    function handleOutsideClick() {
        if (disabled) return
        onCancel()
    }

    return (
        <div className={clsx(
            'fixed z-50 top-0 bottom-0 right-0 left-0',  // Ocupar de forma fixa a tela toda
            'bg-black/50 backdrop-blur-xs',   // Fundo escuro e borrado
            'flex items-center justify-center'
            ) }
            onClick={handleOutsideClick}>

            <div 
            className="bg-slate-100 rounded-lg p-6 mx-6 max-w-2xl flex flex-col gap-6 shadow-lg shadow-black/30 text-center"
            onClick={e => e.stopPropagation()}   // Faz com que o click nessa div e em seus filhos não sejam considerados cliques do "pai"
            role='dialog'
            aria-modal={true}
            aria-labelledby='dialog-title'
            aria-describedby="dialog-description"
            >
                <h3 id='dialog-title' className="text-xl font-extrabold">{title}</h3>

                <div id='dialog-description'>{content}</div>
                
                {/* Space around: distancia entre si e das bordas |||| Space beetween> distancia entre si */}
                <div className="flex items-center justify-around">
                    <Button 
                    variant="ghost"
                    className="w-full mx-2"
                    autoFocus 
                    onClick={onCancel}
                    disabled={disabled}
                    >Cancelar</Button>
                    <Button 
                    variant="default"
                    className="w-full mx-2"
                    onClick={onConfirm}
                    disabled={disabled}
                    >Ok</Button>
                </div>

            </div>

        </div>
    )
}