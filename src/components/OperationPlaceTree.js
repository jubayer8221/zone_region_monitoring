import { useState } from 'react';

const TreeNode = ({ node, onToggle }) => {
  const hasChildren = node.children && node.children.length > 0;
  
  return (
    <li className="pl-4 my-1">
      <div className="flex items-center">
        {hasChildren && (
          <button 
            onClick={() => onToggle(node.id)}
            className="mr-2 w-6 h-6 flex items-center justify-center"
          >
            {node.isOpen ? '−' : '+'}
          </button>
        )}
        {!hasChildren && <span className="w-6 h-6 inline-block"></span>}
        <span>{node.name}</span>
      </div>
      
      {hasChildren && node.isOpen && (
        <ul className="border-l-2 border-gray-300">
          {node.children.map(childNode => (
            <TreeNode 
              key={childNode.id} 
              node={childNode} 
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const OperationPlaceTree = ({ data }) => {
  const [treeData, setTreeData] = useState(data);

  const toggleNode = (id) => {
    const updateNode = (nodes) => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };

    setTreeData(updateNode(treeData));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Operation Place Tree</h2>
      <ul>
        {treeData.map(node => (
          <TreeNode key={node.id} node={node} onToggle={toggleNode} />
        ))}
      </ul>
    </div>
  );
};

export default OperationPlaceTree;