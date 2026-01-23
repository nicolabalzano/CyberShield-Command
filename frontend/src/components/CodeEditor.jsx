import React, { useState, useEffect } from 'react';

/**
 * CodeEditor - Componente per visualizzare e modificare file di codice
 * Più semplice del ReverseEngineeringViewer, pensato per editing generico di codice
 */
const CodeEditor = ({ 
    files = {}, 
    onSave,
    readOnly = false,
    language = 'php'
}) => {
    const [activeFileKey, setActiveFileKey] = useState(Object.keys(files)[0]);
    const currentFile = files[activeFileKey];
    const [code, setCode] = useState(currentFile?.content || '');

    // Aggiorna il codice quando cambia il file attivo
    useEffect(() => {
        if (currentFile) {
            setCode(currentFile.content || '');
        }
    }, [activeFileKey, currentFile]);

    const handleSave = () => {
        if (onSave) {
            onSave(code, activeFileKey);
        }
    };

    if (!currentFile) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-900 text-gray-400">
                <p>No file selected</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] font-mono text-sm">
            {/* Header con tabs dei file */}
            <div className="bg-[#252526] border-b border-gray-700 flex items-center">
                <div className="flex flex-1 overflow-x-auto">
                    {Object.keys(files).map(key => (
                        <div
                            key={key}
                            onClick={() => setActiveFileKey(key)}
                            className={`px-4 py-2 text-sm cursor-pointer flex items-center gap-2 border-r border-gray-700 ${
                                activeFileKey === key 
                                    ? 'bg-[#1e1e1e] text-white' 
                                    : 'bg-[#2d2d30] text-gray-400 hover:bg-[#37373d]'
                            }`}
                        >
                            <span className="text-xs">📄</span>
                            <span>{files[key].name}</span>
                            {files[key].modified && <span className="text-yellow-500">●</span>}
                        </div>
                    ))}
                </div>
                
                {/* Pulsante Save */}
                {!readOnly && (
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors flex items-center gap-2"
                    >
                        <span>💾</span> Save
                    </button>
                )}
            </div>

            {/* Info file */}
            <div className="bg-[#252526] px-4 py-1 text-xs text-gray-400 border-b border-gray-700 flex items-center gap-4">
                <span>📝 {currentFile.name}</span>
                <span>📏 {currentFile.size || 'Unknown size'}</span>
                <span>🔤 {language.toUpperCase()}</span>
            </div>

            {/* Editor area */}
            <div className="flex-1 overflow-hidden flex flex-col">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 w-full bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-sm resize-none focus:outline-none leading-relaxed overflow-auto"
                    spellCheck="false"
                    readOnly={readOnly}
                    placeholder="// Write your code here..."
                />
            </div>

            {/* Status bar */}
            <div className="bg-[#007acc] px-4 py-1 text-xs text-white flex items-center gap-4">
                <span>Line: {code.split('\n').length}</span>
                <span>Characters: {code.length}</span>
                {!readOnly && <span className="ml-auto">Press Save to apply changes</span>}
            </div>
        </div>
    );
};

export default CodeEditor;
