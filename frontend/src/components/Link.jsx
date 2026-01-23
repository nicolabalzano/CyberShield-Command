import React from 'react';
import { useBrowser } from '../contexts/BrowserContext';

/**
 * Componente Link riutilizzabile per visualizzare link cliccabili
 * Apre automaticamente gli URL nel browser del gioco quando disponibile
 * 
 * @param {Object} props
 * @param {string} props.url - URL del link
 * @param {string} [props.children] - Testo del link (se non fornito, usa l'URL)
 * @param {string} [props.className] - Classi CSS personalizzate
 * @param {Function} [props.onClick] - Callback chiamato al click (riceve l'URL). Se restituisce false, blocca l'apertura del browser
 * @param {boolean} [props.openInBrowser=true] - Se true, apre automaticamente nel browser del gioco
 * @param {string} [props.style] - Stile del link: 'default', 'button', 'inline', 'underline'
 * @param {string} [props.icon] - Icona opzionale da mostrare prima del testo
 */
const Link = ({ 
    url,
    children,
    className = '',
    onClick,
    openInBrowser = true,
    style = 'underline',
    icon
}) => {
    const { openBrowser } = useBrowser();

    const handleClick = (e) => {
        e.preventDefault();
        
        let shouldOpenBrowser = openInBrowser;
        
        // Chiama il callback personalizzato se fornito
        if (onClick) {
            const result = onClick(url);
            // Se il callback restituisce false, non aprire il browser
            if (result === false) {
                shouldOpenBrowser = false;
            }
        }

        // Apri nel browser se richiesto e non bloccato dal callback
        if (shouldOpenBrowser) {
            openBrowser(url);
        }
    };

    // Determina lo stile del link
    const getStyleClasses = () => {
        switch (style) {
            case 'button':
                return 'px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium transition-colors inline-flex items-center gap-2';
            case 'inline':
                return 'text-slate-700 hover:text-slate-900 inline-flex items-center gap-1';
            case 'underline':
                return 'text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1 cursor-pointer';
            case 'default':
            default:
                return 'text-blue-600 hover:text-blue-800 cursor-pointer inline-flex items-center gap-1';
        }
    };

    const displayText = children || url;

    return (
        <a
            href={url}
            onClick={handleClick}
            className={`${getStyleClasses()} ${className}`}
            title={url}
        >
            {icon && <span>{icon}</span>}
            <span>{displayText}</span>
        </a>
    );
};

/**
 * Variante del Link come pulsante con icona
 */
export const LinkButton = ({ url, children, icon = '🔗', ...props }) => (
    <Link 
        url={url} 
        style="button"
        icon={icon}
        {...props}
    >
        {children}
    </Link>
);

/**
 * Variante del Link inline senza stile particolare
 */
export const LinkInline = ({ url, children, ...props }) => (
    <Link 
        url={url} 
        style="inline"
        {...props}
    >
        {children}
    </Link>
);

/**
 * Variante del Link sottolineato (stile classico)
 */
export const LinkUnderline = ({ url, children, ...props }) => (
    <Link 
        url={url} 
        style="underline"
        {...props}
    >
        {children}
    </Link>
);

export default Link;
