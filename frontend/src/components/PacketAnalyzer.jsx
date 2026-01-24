import React, { useState } from 'react';

const PacketAnalyzer = ({ packets = [], onPacketSelect }) => {
  const [filterProtocol, setFilterProtocol] = useState('ALL');
  const [filterSource, setFilterSource] = useState('');
  const [searchPayload, setSearchPayload] = useState('');
  const [selectedPacket, setSelectedPacket] = useState(null);

  const filteredPackets = packets.filter(p => {
    // Filter by Protocol
    if (filterProtocol !== 'ALL' && p.protocol !== filterProtocol) return false;
    
    // Filter by Source IP
    if (filterSource && !p.source.includes(filterSource)) return false;

    // Filter by Payload content
    if (searchPayload && !p.payload.toLowerCase().includes(searchPayload.toLowerCase())) return false;

    return true;
  });

  const handlePacketClick = (packet) => {
    setSelectedPacket(packet);
    if (onPacketSelect) {
      onPacketSelect(packet);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 font-mono text-sm text-green-400">
      {/* Header / Toolbar */}
      <div className="bg-gray-800 p-2 border-b border-gray-700 flex gap-4 items-center flex-wrap">
        <div className="flex items-center gap-2">
           <span className="font-bold">Protocol:</span>
           <select 
             className="bg-gray-700 border border-gray-600 rounded px-2 py-1"
             value={filterProtocol}
             onChange={(e) => setFilterProtocol(e.target.value)}
           >
             <option value="ALL">ALL</option>
             <option value="TCP">TCP</option>
             <option value="UDP">UDP</option>
             <option value="HTTP">HTTP</option>
             <option value="FTP">FTP</option>
           </select>
        </div>

        <div className="flex items-center gap-2">
            <span className="font-bold">Source IP:</span>
            <input 
              type="text" 
              placeholder="192.168..." 
              className="bg-gray-700 border border-gray-600 rounded px-2 py-1 w-32"
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
            />
        </div>

        <div className="flex items-center gap-2">
            <span className="font-bold">Find String:</span>
            <input 
              type="text" 
              placeholder="Search bytes..." 
              className="bg-gray-700 border border-gray-600 rounded px-2 py-1 w-32"
              value={searchPayload}
              onChange={(e) => setSearchPayload(e.target.value)}
            />
        </div>
      </div>

      {/* Main Content: Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Packet List */}
        <div className="flex-1 overflow-auto border-r border-gray-700">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-800 sticky top-0">
              <tr>
                <th className="p-2 border-b border-gray-700">No.</th>
                <th className="p-2 border-b border-gray-700">Time</th>
                <th className="p-2 border-b border-gray-700">Source</th>
                <th className="p-2 border-b border-gray-700">Destination</th>
                <th className="p-2 border-b border-gray-700">Protocol</th>
                <th className="p-2 border-b border-gray-700">Info</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackets.map((packet, idx) => (
                <tr 
                  key={packet.id} 
                  className={`hover:bg-gray-800 cursor-pointer ${selectedPacket?.id === packet.id ? 'bg-blue-900/50' : idx % 2 === 0 ? 'bg-gray-900' : 'bg-gray-900/50'}`}
                  onClick={() => handlePacketClick(packet)}
                >
                  <td className="p-2 border-b border-gray-800 text-gray-400">{packet.id}</td>
                  <td className="p-2 border-b border-gray-800 text-gray-400">{packet.time}</td>
                  <td className="p-2 border-b border-gray-800 text-yellow-300">{packet.source}</td>
                  <td className="p-2 border-b border-gray-800 text-yellow-300">{packet.destination}</td>
                  <td className="p-2 border-b border-gray-800 text-purple-400 font-bold">{packet.protocol}</td>
                  <td className="p-2 border-b border-gray-800 text-gray-300">{packet.info}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPackets.length === 0 && (
             <div className="p-4 text-center text-gray-500 italic">No packets found</div>
          )}
        </div>

        {/* Packet Details (Bottom or Side) */}
        {selectedPacket && (
            <div className="w-1/3 flex flex-col bg-gray-900 border-l border-gray-700">
                <div className="bg-gray-800 p-2 border-b border-gray-700 font-bold text-xs uppercase tracking-wider flex justify-between items-center">
                    <span>Packet Details</span>
                    <button 
                        onClick={() => setSelectedPacket(null)}
                        className="text-gray-400 hover:text-white px-2"
                        title="Close Details"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-4 overflow-auto font-mono text-xs text-gray-300">
                    <div className="mb-4">
                        <div className="text-gray-500">Frame {selectedPacket.id}: {selectedPacket.length} bytes on wire</div>
                        <div className="text-gray-500">Ethernet II, Src: {selectedPacket.macSrc}, Dst: {selectedPacket.macDst}</div>
                        <div className="text-gray-500">Internet Protocol Version 4, Src: {selectedPacket.source}, Dst: {selectedPacket.destination}</div>
                        <div className="text-gray-500">{selectedPacket.protocol} Protocol</div>
                    </div>

                    <div className="bg-black p-2 rounded border border-gray-700">
                        <div className="text-blue-400 font-bold mb-1">Payload (Hex / ASCII):</div>
                        <div className="grid grid-cols-[1fr_2fr] gap-4">
                            <pre className="text-gray-500 select-text whitespace-pre-wrap break-all">
                                {selectedPacket.payloadHex}
                            </pre>
                             <pre className="text-green-500 select-text whitespace-pre-wrap break-all">
                                {selectedPacket.payload}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default PacketAnalyzer;
