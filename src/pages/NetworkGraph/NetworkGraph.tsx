import React, { useEffect, useState } from 'react';
import GraphViewer from '../../components/charts/GraphViewer';
import HCPDetails from '../../components/hcp/HCPDetails';
import UknownHCP from '../../components/hcp/UknownHCP';
import mockData from '../../data/hcps.json';
import { Search } from 'lucide-react';

interface HCPNode {
  id: string;
  name: string;
  specialty: string;
  location: string;
  avatar: string;
  about?: string;
  education?: any[];
  patientsServed?: number;
  successRate?: number;
}

const NetworkGraphPage = () => {
  const [selectedHCP, setSelectedHCP] = useState<HCPNode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusNodeId, setFocusNodeId] = useState<string | undefined>(undefined);

  const handleSelectHCP = (id: string) => {
    const found = mockData.nodes.find((n) => n.id === id);
    if (found) setSelectedHCP(found);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!searchTerm.trim()) {
        setFocusNodeId(undefined);
        return;
      }

      const match = mockData.nodes.find((n) =>
        n.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (match) {
        setFocusNodeId(match.id);
        handleSelectHCP(match.id);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <>
      <div className="mb-4 relative">
        <div className="absolute top-[8px] left-[10px] text-[#ccc]">
          <Search size={20} />
        </div>
        <input
          type="text"
          className="w-full p-2 pl-10 border rounded text-sm"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-3 h-screen bg-gray-50 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] p-3 lg:p-5 shadow-[0px_5px_24px_0px_#dfebea] rounded-[30px]">
        <aside className="w-[400px] bg-white overflow-y-auto">
          {selectedHCP ? <HCPDetails hcp={selectedHCP} /> : <UknownHCP />}
        </aside>
        <main className="flex-1 h-full">
          <GraphViewer onSelectHCP={handleSelectHCP} focusNodeId={focusNodeId} />
        </main>
      </div>
    </>
  );
};

export default NetworkGraphPage;
