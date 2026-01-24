import React, { useState } from 'react';

const Terminal = ({ 
    initialHistory = [
        '$ Welcome to CYBER OS Terminal',
        '$ Type "help" for available commands',
    ],
    commands = {},
    onCommandExecute = null,
    prompt = '$',
    helpCommand = true,
    currentDir = '/home/user'
}) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState(initialHistory);
    const [workingDir, setWorkingDir] = useState(currentDir);
    const inputRef = React.useRef(null);

    const defaultCommands = {
        help: () => {
            const availableCommands = Object.keys({ ...commands, ...(helpCommand ? { help: null } : {}) }).join(', ');
            return `Available commands: ${availableCommands}`;
        },
    };

    const allCommands = { ...defaultCommands, ...commands };

    const handleCommand = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            const trimmedInput = input.trim();
            const [command, ...args] = trimmedInput.split(' ');
            
            let output;
            
            // Create context object to pass current directory
            const context = { 
                currentDir: workingDir,
                setCurrentDir: (newDir) => setWorkingDir(newDir)
            };
            
            if (allCommands[command]) {
                try {
                    output = allCommands[command](args, trimmedInput, context);
                    // Update working directory if cd command changed it
                    if (command === 'cd' && context.currentDir !== workingDir) {
                        setWorkingDir(context.currentDir);
                    }
                } catch (error) {
                    output = `Error executing command: ${error.message}`;
                }
            } else {
                output = `Command not found: ${command}`;
            }
            
            if (onCommandExecute) {
                onCommandExecute(command, args, output);
            }
            
            const newHistory = [...history, `${workingDir} ${prompt} ${trimmedInput}`];
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
        /* Aggiunto text-left e items-start per forzare l'allineamento a sinistra */
        <div 
            className="bg-black text-green-400 font-mono text-xs p-4 h-full overflow-auto cursor-text text-left flex flex-col items-start"
            onClick={focusInput}
        >
            <div className="w-full">
                {history.map((line, i) => (
                    <div key={i} className="mb-1 break-all whitespace-pre-wrap">{line}</div>
                ))}
            </div>
            
            <div className="flex items-center w-full">
                <span className="mr-2 flex-shrink-0">{workingDir} {prompt}</span>
                <div className="flex items-center">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        /* Calcoliamo la larghezza in base alla lunghezza del testo */
                        style={{ 
                            width: input.length > 0 ? `${input.length}ch` : '1px',
                            minWidth: '1px' 
                        }}
                        className="bg-transparent outline-none text-green-400 font-mono"
                        autoFocus
                    />
                    <span className="animate-pulse flex-shrink-0">_</span>
                </div>
            </div>
        </div>
    );
};

export default Terminal;