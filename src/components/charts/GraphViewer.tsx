import React, { useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import data from '../../data/hcps.json';

interface Props {
  onSelectHCP: (hcpId: string) => void;
  focusNodeId?: string;
}

interface HCP {
  id: string;
  name: string;
  avatar: string;
  [key: string]: any;
}

interface EdgeDetail {
  x: number;
  y: number;
  text: string;
  source?: HCP;
  target?: HCP;
}

const elements = [
  ...data.nodes.map((node) => ({
    data: {
      id: node.id,
      label: node.name,
      image: node.avatar,
    },
  })),
  ...data.links.map((link) => ({
    data: {
      source: link.source,
      target: link.target,
      label: link.details,
    },
  })),
];

const GraphViewer: React.FC<Props> = ({ onSelectHCP, focusNodeId }) => {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  const [selectedEdgeDetails, setSelectedEdgeDetails] = useState<EdgeDetail | null>(null);

  useEffect(() => {
    const handleResize = () => cyRef.current?.resize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (cyRef.current && focusNodeId) {
      const cy = cyRef.current;
      const node = cy.$id(focusNodeId);
      if (node.nonempty()) {
        node.select();
        cy.animate({
          fit: { eles: node, padding: 220 },
          duration: 600,
          easing: 'ease-in-out',
        });
      }
    }
  }, [focusNodeId]);

  const handleEdgeHover = (evt: cytoscape.EventObject) => {
    const edge = evt.target;
    const label = edge.data('label');
    const pos = evt.renderedPosition;
    setTooltip({ x: pos.x, y: pos.y, text: label });
  };

  const handleEdgeOut = () => setTooltip(null);

  const handleEdgeClick = (evt: cytoscape.EventObject) => {
    const edge = evt.target;
    const label = edge.data('label');
    const pos = evt.renderedPosition;

    const sourceId = edge.data('source');
    const targetId = edge.data('target');
    const source = data.nodes.find((n) => n.id === sourceId);
    const target = data.nodes.find((n) => n.id === targetId);

    setSelectedEdgeDetails({
      x: pos.x,
      y: pos.y,
      text: label,
      source,
      target,
    });
  };

  return (
    <div className="relative w-full h-full">
      <CytoscapeComponent
        elements={elements}
        layout={{ name: 'cose' }}
        style={{ width: '100%', height: '100%', minHeight: '300px' }}
        cy={(cy: cytoscape.Core) => {
          cyRef.current = cy;

          cy.on('tap', 'node', (evt) => {
            const nodeId = evt.target.id();
            onSelectHCP(nodeId);
            setSelectedEdgeDetails(null);
          });

          cy.on('mouseover', 'edge', handleEdgeHover);
          cy.on('mouseout', 'edge', handleEdgeOut);
          cy.on('tap', 'edge', handleEdgeClick);
        }}
        stylesheet={[
          {
            selector: 'node',
            style: {
              width: 40,
              height: 40,
              shape: 'ellipse',
              'background-color': '#fff',
              'background-opacity': 0,
              'background-fit': 'cover',
              'background-image': 'data(image)',
              'background-clip': 'node',
              'border-color': '#2d6ee4',
              'border-width': 1,
              label: 'data(label)',
              'text-valign': 'bottom',
              'text-halign': 'center',
              'font-size': 0,
              color: '#333',
            },
          },
          {
            selector: 'edge',
            style: {
              width: 1,
              'line-color': '#2d6ee4',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              label: 'data(label)',
              'font-size': 0,
              'text-rotation': 'autorotate',
            },
          },
        ]}
      />

      {tooltip && (
        <div
          className="absolute bg-black text-white text-xs px-2 py-1 rounded shadow"
          style={{ top: tooltip.y + 10, left: tooltip.x + 10, pointerEvents: 'none' }}
        >
          {tooltip.text}
        </div>
      )}

      {selectedEdgeDetails && (
        <div
          className="absolute bg-white border border-gray-300 text-sm p-3 rounded shadow-lg w-72 z-50"
          style={{ top: selectedEdgeDetails.y + 10, left: selectedEdgeDetails.x + 10 }}
        >
          <div className="flex items-center justify-between mb-2">
            {selectedEdgeDetails.source && (
              <div className="flex items-center gap-2">
                <img
                  src={selectedEdgeDetails.source.avatar}
                  alt={selectedEdgeDetails.source.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-xs font-medium">{selectedEdgeDetails.source.name}</span>
              </div>
            )}
            <span className="text-xs text-gray-400">↔</span>
            {selectedEdgeDetails.target && (
              <div className="flex items-center gap-2">
                <img
                  src={selectedEdgeDetails.target.avatar}
                  alt={selectedEdgeDetails.target.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-xs font-medium">{selectedEdgeDetails.target.name}</span>
              </div>
            )}
          </div>
          <div className="text-xs text-gray-700 mt-2">{selectedEdgeDetails.text}</div>
        </div>
      )}
    </div>
  );
};

export default GraphViewer;
