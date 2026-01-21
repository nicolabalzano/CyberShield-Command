import React from 'react';

const FileManager = () => (
    <div className="text-white font-mono text-xs">
        <div className="mb-2 text-cyan-400">📁 /home/user/</div>
        <div className="space-y-1">
            <div className="hover:bg-slate-700 p-1 cursor-pointer">📄 document.txt</div>
            <div className="hover:bg-slate-700 p-1 cursor-pointer">📁 Downloads</div>
            <div className="hover:bg-slate-700 p-1 cursor-pointer">📁 Projects</div>
            <div className="hover:bg-slate-700 p-1 cursor-pointer">📄 notes.md</div>
        </div>
    </div>
);

export default FileManager;
