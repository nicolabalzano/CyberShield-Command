import React, { useState, useEffect } from 'react';

const ReverseEngineeringViewer = ({ 
    files = {}, 
    activeFileKey,
    onFileChange,
    onSave,
    readOnly = false 
}) => {
    // Manage active file (controlled or uncontrolled)
    const [internalActiveKey, setInternalActiveKey] = useState(null);
    const currentKey = activeFileKey !== undefined ? activeFileKey : internalActiveKey;
    const currentFile = files[currentKey];
    
    // Path Input State
    const [filePathInput, setFilePathInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [code, setCode] = useState(currentFile?.c || '');
    const [activeTab, setActiveTab] = useState('decompiled'); // 'decompiled' or 'assembly'

    // Update code when file changes
    useEffect(() => {
        if (currentFile) {
            setCode(currentFile.c);
            // Auto-fill path input if entry exists
            if (!filePathInput || files[filePathInput] !== currentFile) {
                 // Just show filename if empty
                 // setFilePathInput(currentFile.name); 
            }
        }
    }, [currentKey, currentFile]);

    const handleFileClick = (key) => {
        if (onFileChange) {
            onFileChange(key);
        } else {
            setInternalActiveKey(key);
        }
        setErrorMsg('');
    };

    const handleLoadFile = () => {
        // Logic to simulate finding file by path. 
        // We check if the input string contains one of the file keys (simple fuzzy match)
        // e.g. input: "C:\Downloads\malware.exe", key: "malware.exe" -> Match
        const cleanInput = filePathInput.trim().replace(/\\/g, '/'); // normalize slashes
        
        const matchedKey = Object.keys(files).find(key => {
            return cleanInput.endsWith(key) || key === cleanInput;
        });

        if (matchedKey) {
            handleFileClick(matchedKey);
            setErrorMsg('');
        } else {
            setErrorMsg(`File not openable or not found: ${filePathInput}`);
        }
    };

    if (!Object.keys(files).length) {
        return <div className="text-gray-500 p-4">No files available to reverse engineer.</div>;
    }

    // Default view if nothing selected yet
    const displayFile = currentFile;

    return (
        <div className="flex flex-row h-full bg-[#1e1e1e] border border-gray-700 font-mono text-sm shadow-xl rounded-lg overflow-hidden">
            {/* Sidebar for Files (Hidden if we want pure manual input, but kept for UX) */}
            {/* Removing sidebar to force input usage as requested? Or keep it? 
                User said "aggiungi un campo...", not "replace sidebar". Keeping sidebar is safer. 
            */}
            {Object.keys(files).length > 1 && (
                <div className="bg-[#252526] border-r border-gray-700 flex flex-col w-48">
                    <div className="p-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Project Files</div>
                    {Object.keys(files).map(key => (
                         (!files[key].hidden) && (
                            <span
                                key={key}
                                onClick={() => handleFileClick(key)}
                                className={`cursor-pointer text-left px-2 py-2 text-xs flex items-center gap-2 hover:bg-[#37373d] ${currentKey === key ? 'bg-[#37373d] text-white' : 'text-gray-400'}`}
                            >
                                <span>📄</span>
                                <span className="truncate">{files[key].name}</span>
                            </span>
                        )
                    ))}
                </div>
            )}

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                
                {/* ADDRESS BAR */}
                <div className="bg-[#333333] p-2 border-b border-gray-700 flex gap-2 items-center">
                    <span className="text-gray-400 text-xs">File Path:</span>
                    <input 
                        type="text" 
                        value={filePathInput}
                        onChange={(e) => setFilePathInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLoadFile()}
                        className="flex-1 bg-[#1e1e1e] border border-gray-600 text-white text-xs px-2 py-1 focus:outline-none focus:border-blue-500 font-mono"
                        placeholder="e.g. C:\Users\Admin\Downloads\suspect.exe"
                    />
                    <button 
                        onClick={handleLoadFile}
                        className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded"
                    >
                        LOAD
                    </button>
                </div>
                {errorMsg && <div className="bg-red-900/80 text-white text-xs px-2 py-1 flex items-center gap-2"><span>⚠️</span> {errorMsg}</div>}

                {/* Toolbar */}
                <div className="bg-[#252526] px-4 py-1 border-b border-gray-700 flex space-x-4 text-gray-400 text-xs">
                    {/* <span 
                        onClick={() => setActiveTab('assembly')}
                        className={`hover:text-white px-2 py-1 rounded ${activeTab === 'assembly' ? 'bg-[#37373d] text-white' : ''}`}
                        >
                        DISASSEMBLY (.asm)
                    </span>
                    <span 
                        onClick={() => setActiveTab('decompiled')}
                        className={`hover:text-white px-2 py-1 rounded ${activeTab === 'decompiled' ? 'bg-[#37373d] text-white' : ''}`}
                    >
                        DECOMPILED SOURCE (.c)
                    </span>*/}
                    {!readOnly && (
                        <span 
                            onClick={() => onSave(code, currentKey)}
                            className="bg-gray-600 hover:bg-gray-700 px-2 py-1 text-white rounded flex items-center text-xs"
                        >
                            <span>💾</span> PATCH & SAVE
                        </span>
                    )}
                </div>

                {/* Content Area */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Visual Assembly Representation */}
                    <div className={`${activeTab === 'assembly' ? 'flex' : 'hidden'} md:flex md:w-1/2 flex-col bg-[#1e1e1e] border-r border-gray-700 text-gray-400 p-0`}>
                        <div className="bg-[#252526] px-2 py-1 text-xs text-yellow-500 font-bold border-b border-gray-700">
                            ADDRESS OPCODES INSTRUCTION
                        </div>
                        <div className=" overflow-auto font-mono text-xs leading-relaxed opacity-80 select-none">
                            {displayFile && displayFile.asm && displayFile.asm.split('\n').map((line, i) => (
                                <div key={i} className="hover:bg-[#2a2d2e] cursor-default px-1 flex">
                                    <span className="text-gray-500 w-24 flex-shrink-0">{`00401${(i*4).toString(16).padStart(3, '0')}`}</span>
                                    <span className="whitespace-pre">{line}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Editable Source Code */}
                    <div className={`${activeTab === 'decompiled' ? 'flex' : 'hidden'} md:flex md:w-1/2 flex-col bg-[#1e1e1e]`}>
                        <div className="bg-[#252526] px-2 py-1 text-xs text-blue-400 font-bold border-b border-gray-700">
                            PSEUDO-C CODE (Editable)
                        </div>
                        {displayFile ? (
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="flex-1 w-full bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-xs resize-none focus:outline-none leading-relaxed"
                                spellCheck="false"
                                readOnly={readOnly}
                            />
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-600">
                                No file loaded. Use the top bar to load a file.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReverseEngineeringViewer;
