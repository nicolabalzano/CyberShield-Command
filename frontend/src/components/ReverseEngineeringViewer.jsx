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
                <div className="bg-[#252526] border-r border-gray-700 flex flex-col">
                    <div className="p-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Files</div>
                    {Object.keys(files).map(key => (
                         (!files[key].hidden) && (
                            <span
                                key={key}
                                onClick={() => handleFileClick(key)}
                                className={`text-left px-1 py-2 text-xs flex items-center gap-1 hover:bg-[#37373d] ${currentKey === key ? 'bg-[#37373d] text-white' : 'text-gray-400'}`}
                            >
                                <span>📄</span>
                                {files[key].name}
                            </span>
                        )
                    ))}
                </div>
            )}

            <div className="flex-1 flex flex-col h-full overflow-hidden">

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
                            {currentFile.asm && currentFile.asm.split('\n').map((line, i) => (
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
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="flex-1 w-full bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-xs resize-none focus:outline-none leading-relaxed"
                            spellCheck="false"
                            readOnly={readOnly}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReverseEngineeringViewer;
