import React, { useState } from 'react';

const Terminal = ({ 
    initialHistory = [
        '$ Welcome to CYBER OS Terminal',
        '$ Type "help" for available commands',
    ],
    commands = {},
    onCommandExecute = null,
    prompt = '$',
    helpCommand = true
}) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState(initialHistory);
    const inputRef = React.useRef(null);

    const defaultCommands = {
        help: () => {
            const availableCommands = Object.keys({ ...commands, ...(helpCommand ? { help: null } : {}) }).join(', ');
            return `Available commands: ${availableCommands}`;
        },
        clear: () => {
            setHistory([]);
            return null;
        }
    };

    const allCommands = { ...defaultCommands, ...commands };

    const handleCommand = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            const trimmedInput = input.trim();
            const [command, ...args] = trimmedInput.split(' ');
            
            let output;
            
            // Esegui il comando se esiste
            if (allCommands[command]) {
                try {
                    output = allCommands[command](args, trimmedInput);
                } catch (error) {
                    output = `Error executing command: ${error.message}`;
                }
            } else {
                output = `Command not found: ${command}`;
            }
            
            // Callback opzionale per il livello
            if (onCommandExecute) {
                onCommandExecute(command, args, output);
            }
            
            // Aggiorna la cronologia
            const newHistory = [...history, `${prompt} ${trimmedInput}`];
            if (output !== null && output !== undefined) {
                if (Array.isArray(output)) {
                    newHistory.push(...output);
                } else {
                    newHistory.push(output);
                }
            }
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
                <span className="mr-2">{prompt}</span>
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
