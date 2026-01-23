import React, { createContext, useContext } from 'react';

const BrowserContext = createContext();

/**
 * Hook per accedere alle funzionalità del browser
 * @returns {Object} { openBrowser: (url) => void }
 */
export const useBrowser = () => {
    const context = useContext(BrowserContext);
    // Ritorna un oggetto con funzioni dummy se il context non è disponibile
    // Questo permette al componente Link di funzionare anche fuori dal context
    if (!context) {
        return {
            openBrowser: (url) => {
                console.warn('BrowserContext not available. Cannot open URL:', url);
            }
        };
    }
    return context;
};

/**
 * Provider per gestire l'apertura del browser
 * Deve wrappare i componenti che necessitano di aprire URL nel browser
 */
export const BrowserProvider = ({ children, openWindow }) => {
    const openBrowser = (url) => {
        if (openWindow) {
            openWindow('CyberNav Browser', 'browser', { width: 500, height: 350 }, { initialUrl: url });
        }
    };

    return (
        <BrowserContext.Provider value={{ openBrowser }}>
            {children}
        </BrowserContext.Provider>
    );
};

export default BrowserContext;
