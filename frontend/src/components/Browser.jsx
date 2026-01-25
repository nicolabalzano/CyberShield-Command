import React, { useState } from 'react';

/**
 * Browser dinamico che può mostrare pagine personalizzate
 * 
 * @param {Object} props
 * @param {string} [props.initialUrl] - URL iniziale da mostrare (default: homepage)
 * @param {Array} [props.availableSites] - Array di siti navigabili: [{ url: 'https://...', title: '...', content: <JSX> }]
 * @param {Function} [props.onNavigate] - Callback chiamato quando si naviga: (url) => {}
 * @param {Function} [props.onSearch] - Callback chiamato quando si cerca: (query) => {}
 */
const Browser = ({ 
    initialUrl = 'home',
    availableSites = [],
    onNavigate,
    onSearch
}) => {
    const [currentUrl, setCurrentUrl] = useState(initialUrl);
    const [urlInput, setUrlInput] = useState(initialUrl === 'home' ? 'https://www.google.com' : initialUrl);
    const [search, setSearch] = useState('');

    // Trova il sito corrente
    const currentSite = availableSites.find(site => site.url === currentUrl);

    const handleUrlKeyDown = (e) => {
        if (e.key === 'Enter') {
            const matchingSite = availableSites.find(site => 
                site.url.toLowerCase().includes(urlInput.toLowerCase()) ||
                urlInput.toLowerCase().includes(site.url.toLowerCase())
            );
            
            if (matchingSite) {
                setCurrentUrl(matchingSite.url);
                setUrlInput(matchingSite.url);
                if (onNavigate) onNavigate(matchingSite.url);
            } else {
                // Torna alla home se URL non valido
                setCurrentUrl('home');
                if (onNavigate) onNavigate('home');
            }
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Cerca tra i siti disponibili
            const matchingSite = availableSites.find(site => 
                site.title?.toLowerCase().includes(search.toLowerCase()) ||
                site.url.toLowerCase().includes(search.toLowerCase())
            );
            
            if (matchingSite) {
                setCurrentUrl(matchingSite.url);
                setUrlInput(matchingSite.url);
                if (onNavigate) onNavigate(matchingSite.url);
            } else if (onSearch) {
                onSearch(search);
            }
            setSearch('');
        }
    };

    const handleSiteClick = (url) => {
        setCurrentUrl(url);
        setUrlInput(url);
        if (onNavigate) onNavigate(url);
    };

    // Pagina home di default
    const renderHomePage = () => (
        <div className="flex-1 bg-white flex flex-col items-center justify-center p-4">
            <div className="text-center mb-6">
                <div className="text-4xl mb-2">🌐</div>
                <div className="text-lg font-bold text-slate-700">CyberNav</div>
            </div>
            
            {/* Search Bar */}
            <div className="w-full max-w-md mb-6">
                <div className="flex items-center bg-white border border-slate-300 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-slate-400 text-sm mr-2">🔍</span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        placeholder="Search or enter URL"
                        className="flex-1 outline-none text-sm text-slate-700"
                    />
                </div>
            </div>

            {/* Available Sites */}
            {availableSites.length > 0 && (
                <div className="w-full max-w-md">
                    <div className="text-xs font-semibold text-slate-500 mb-2 uppercase">Available Sites</div>
                    <div className="grid gap-2">
                        {availableSites.map((site, index) => (
                            <button
                                key={index}
                                onClick={() => handleSiteClick(site.url)}
                                className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-left"
                            >
                                <span className="text-2xl">{site.icon || '🌐'}</span>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-slate-700">{site.title || site.url}</div>
                                    <div className="text-xs text-slate-500">{site.url}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Address Bar */}
            <div className="bg-slate-100 border-b border-slate-300 p-2">
                <div className="flex items-center gap-2">
                    {currentUrl !== 'home' && (
                        <span
                            onClick={() => handleSiteClick('home')}
                            className="px-2 py-1 hover:bg-slate-200 rounded text-slate-600 text-xs"
                        >
                            ← Back
                        </span>
                    )}
                    <div className="flex items-center bg-white border border-slate-300 rounded-full px-3 py-1.5 flex-1">
                        <span className="text-green-600 text-xs mr-2">🔒</span>
                        <input
                            type="text"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onKeyDown={handleUrlKeyDown}
                            className="flex-1 outline-none text-xs text-slate-700"
                        />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            {currentUrl === 'home' ? renderHomePage() : (
                <div className="flex-1 overflow-auto bg-white">
                    {currentSite?.content || (
                        <div className="flex items-center justify-center h-full text-slate-400">
                            <div className="text-center">
                                <div className="text-4xl mb-2">❌</div>
                                <div className="text-sm">Page not found</div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Browser;
