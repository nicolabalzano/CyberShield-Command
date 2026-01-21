import React, { useState } from 'react';

const Terminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        '$ Welcome to CYBER OS Terminal',
        '$ Type "help" for available commands',
    ]);
    const inputRef = React.useRef(null);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const newHistory = [...history, `$ ${input}`, `Command not found: ${input}`];
            setHistory(newHistory);
            setInput('');
        }
    };

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div 
            className="bg-black text-green-400 font-mono text-xs p-2 h-full overflow-auto cursor-text"
            onClick={focusInput}
        >
            {history.map((line, i) => (
                <div key={i}>{line}</div>
            ))}
            <div className="flex items-center">
                <span className="mr-2">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    className="bg-transparent outline-none flex-1 text-green-400"
                    autoFocus
                />
                <span className="animate-pulse">_</span>
            </div>
        </div>
    );
};

export default Terminal;
