import React, { useState, useEffect } from 'react';

const ReverseEngineeringViewer = ({ 
    files = {}, 
    activeFileKey,
    onFileChange,
    onSave,
    readOnly = false 
}) => {
    // Manage active file (controlled or uncontrolled)
    const [internalActiveKey, setInternalActiveKey] = useState(Object.keys(files)[0]);
    const currentKey = activeFileKey !== undefined ? activeFileKey : internalActiveKey;
    const currentFile = files[currentKey];

    const [code, setCode] = useState(currentFile?.c || '');
    const [activeTab, setActiveTab] = useState('decompiled'); // 'decompiled' or 'assembly'

    // Update code when file changes (or if data from parent updates)
    useEffect(() => {
        if (currentFile) {
            setCode(currentFile.c);
        }
    }, [currentKey, currentFile]); // Depend on currentFile reference or content?

    const handleFileClick = (key) => {
        if (onFileChange) {
            onFileChange(key);
        } else {
            setInternalActiveKey(key);
        }
    };

    if (!currentFile) {
        return <div className="text-gray-500 p-4">No file selected</div>;
    }

    return (
        <div className="flex flex-row h-full bg-[#1e1e1e] border border-gray-700 font-mono text-sm shadow-xl rounded-lg overflow-hidden">
            {/* Sidebar for Files (if multiple) */}
            {Object.keys(files).length > 1 && (
                <div className="w-48 bg-[#252526] border-r border-gray-700 flex flex-col">
                    <div className="p-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Solution Explorer</div>
                    {Object.keys(files).map(key => (
                         (!files[key].hidden) && (
                            <button
                                key={key}
                                onClick={() => handleFileClick(key)}
                                className={`text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#37373d] ${currentKey === key ? 'bg-[#37373d] text-white' : 'text-gray-400'}`}
                            >
                                <span>📄</span>
                                {files[key].name}
                            </button>
                        )
                    ))}
                </div>
            )}

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header / Menu Bar */}
                <div className="bg-[#2d2d2d] flex items-center px-4 py-2 border-b border-gray-700 justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-4 text-gray-300 font-bold">Ghidra-Lite Decompiler v1.0</span>
                    </div>
                    <div className="text-blue-400 text-xs">Target: {currentFile.name}</div>
                </div>

                {/* Toolbar */}
                <div className="bg-[#252526] px-4 py-1 border-b border-gray-700 flex space-x-4 text-gray-400 text-xs">
                    <button 
                        onClick={() => setActiveTab('assembly')}
                        className={`hover:text-white px-2 py-1 rounded ${activeTab === 'assembly' ? 'bg-[#37373d] text-white' : ''}`}
                    >
                        DISASSEMBLY (.asm)
                    </button>
                    <button 
                        onClick={() => setActiveTab('decompiled')}
                        className={`hover:text-white px-2 py-1 rounded ${activeTab === 'decompiled' ? 'bg-[#37373d] text-white' : ''}`}
                    >
                        DECOMPILED SOURCE (.c)
                    </button>
                    <div className="flex-1"></div>
                    {!readOnly && (
                        <button 
                            onClick={() => onSave(code, currentKey)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded flex items-center gap-2"
                        >
                            <span>💾</span> PATCH & SAVE
                        </button>
                    )}
                </div>

                {/* Content Area */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Visual Assembly Representation */}
                    <div className={`${activeTab === 'assembly' ? 'flex' : 'hidden'} md:flex md:w-1/2 flex-col bg-[#1e1e1e] border-r border-gray-700 text-gray-400 p-0`}>
                        <div className="bg-[#252526] px-2 py-1 text-xs text-yellow-500 font-bold border-b border-gray-700">
                            ADDRESS &nbsp;&nbsp; OPCODES &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; INSTRUCTION
                        </div>
                        <div className="p-4 overflow-auto font-mono text-xs leading-relaxed opacity-80 select-none">
                            {currentFile.asm && currentFile.asm.split('\n').map((line, i) => (
                                <div key={i} className="hover:bg-[#2a2d2e] cursor-default px-1">
                                    <span className="text-gray-500 mr-4">{`00401${(i*4).toString(16).padStart(3, '0')}`}</span>
                                    {line}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Editable Source Code */}
                    <div className={`${activeTab === 'decompiled' ? 'flex' : 'hidden'} md:flex md:w-1/2 flex-col bg-[#1e1e1e]`}>
                        <div className="bg-[#252526] px-2 py-1 text-xs text-blue-400 font-bold border-b border-gray-700">
                            PSEUDO-C CODE (Editable)
                        </div>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="flex-1 w-full bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                            spellCheck="false"
                            readOnly={readOnly}
                        />
                    </div>
                </div>
                
                <div className="bg-[#007acc] text-white text-xs px-2 py-1 flex justify-between">
                    <span>ready</span>
                    <span>{currentFile.size}</span>
                </div>
            </div>
        </div>
    );
};

export default ReverseEngineeringViewer;
