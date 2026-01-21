import React, { useState } from 'react';

const Browser = () => {
    const [url, setUrl] = useState('https://www.google.com');
    const [search, setSearch] = useState('');

    const handleUrlKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('Navigating to:', url);
        }
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('Searching for:', search);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Address Bar */}
            <div className="bg-slate-100 border-b border-slate-300 p-2">
                <div className="flex items-center bg-white border border-slate-300 rounded-full px-3 py-1.5">
                    <span className="text-green-600 text-xs mr-2">🔒</span>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyPress={handleUrlKeyPress}
                        className="flex-1 outline-none text-xs text-slate-700"
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white flex flex-col items-center justify-center p-4">
                <div className="text-center mb-6">
                    <div className="text-4xl mb-2">🌐</div>
                    <div className="text-lg font-bold text-slate-700">CyberNav</div>
                </div>
                
                {/* Search Bar */}
                <div className="w-full max-w-md">
                    <div className="flex items-center bg-white border border-slate-300 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-slate-400 text-sm mr-2">🔍</span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                            placeholder="Search or enter URL"
                            className="flex-1 outline-none text-sm text-slate-700"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Browser;
