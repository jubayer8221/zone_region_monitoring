import { useState } from "react";

export default function OperationPlaceTree() {
  const [data, setData] = useState([
    {
      id: "1",
      name: "Zone Office",
      // rank: "Gold",
      borr: 713,
      savings: 1196.17,
      savingsRatio: "49%",
      os: 300.5,
      AvgOS: 3.5,
      otr: "90%",
      totalcollection: 13.19,
      serviceCharge: 9.36,
      savingscollection: 3.83,
      savingsetn: 0.5,
      srratio: "50%",
      disbursement: 0.5,
      cashandbank: 0.5,
      overdue: 0.5,
      // email: "Headquarters@gmail.com",
      // commission: 5000,
      isOpen: true,
      children: [
        {
          id: "1.1",
          name: "Rangpur Division",
          borr: 876,
          savings: 107.01,
          savingsRatio: "44%",
          os: 245.01,
          AvgOS: 2.47,
          rank: "Silver",
          commission: 2000,
          otr: "94%",
          isOpen: false,
          children: [
            {
              id: "1.1.1",
              name: "North Station A",
              rank: "Bronze",
              commission: 1000,
              children: [],
            },
            {
              id: "1.2",
              name: "East Division",
              rank: "Silver",
              commission: 1800,
              isOpen: false,
              children: [],
            },
          ],
        },
      ],
    },
    // {
    //   id: "2",
    //   name: "Regional Office",
    //   rank: "Platinum",
    //   commission: 7000,
    //   isOpen: false,
    //   children: [
    //     {
    //       id: "2.1",
    //       name: "West Division",
    //       rank: "Gold",
    //       commission: 3000,
    //       isOpen: false,
    //       children: [],
    //     },
    //     {
    //       id: "2.2",
    //       name: "South Division",
    //       rank: "Silver",
    //       commission: 1500,
    //       isOpen: false,
    //       children: [
    //         {
    //           id: "2.2.1",
    //           name: "South Station B",
    //           rank: "Bronze",
    //           commission: 800,
    //           children: [],
    //         },
    //       ],
    //     },
    //   ],
    // },
  ]);

  const [editModal, setEditModal] = useState({
    isOpen: false,
    node: null,
    parentId: null,
    isEdit: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    rank: "",
    commission: "",
  });

  // Toggle node expansion
  const toggleNode = (id) => {
    const updateNode = (nodes) => {
      return nodes.map((node) => {
        if (node.id === id) {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };

    setData(updateNode(data));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate unique ID
  const generateId = (parentId = "") => {
    return parentId ? `${parentId}.${Date.now()}` : `${Date.now()}`;
  };

  // Open modal for add/edit
  const openModal = (node = null, parentId = null, isEdit = false) => {
    setEditModal({
      isOpen: true,
      node,
      parentId,
      isEdit,
    });
    setFormData(
      node
        ? { name: node.name, rank: node.rank, commission: node.commission }
        : { name: "", rank: "", commission: "" }
    );
  };

  // Close modal
  const closeModal = () => {
    setEditModal({
      isOpen: false,
      node: null,
      parentId: null,
      isEdit: false,
    });
    setFormData({ name: "", rank: "", commission: "" });
  };

  // Add or update node
  const saveNode = () => {
    if (!formData.name || !formData.rank || !formData.commission) return;

    const newNode = {
      id: editModal.isEdit ? editModal.node.id : generateId(editModal.parentId),
      name: formData.name,
      rank: formData.rank,
      commission: Number(formData.commission),
      isOpen: false,
      children: editModal.isEdit ? editModal.node.children : [],
    };

    const updateData = (nodes, parentId, isEdit = false) => {
      return nodes.map((node) => {
        if (isEdit && node.id === newNode.id) {
          return { ...newNode };
        }
        if (node.id === parentId) {
          return {
            ...node,
            children: isEdit ? node.children : [...node.children, newNode],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateData(node.children, parentId, isEdit),
          };
        }
        return node;
      });
    };

    if (editModal.isEdit && !editModal.parentId) {
      setData(updateData(data, editModal.node.id, true));
    } else if (editModal.parentId) {
      setData(updateData(data, editModal.parentId, editModal.isEdit));
    } else {
      setData([...data, { ...newNode, id: generateId() }]);
    }

    closeModal();
  };

  // Delete node
  const deleteNode = (id) => {
    const deleteFromNodes = (nodes, targetId) => {
      return nodes
        .filter((node) => node.id !== targetId)
        .map((node) => ({
          ...node,
          children: deleteFromNodes(node.children, targetId),
        }));
    };
    setData(deleteFromNodes(data, id));
  };

  // Recursive component to render tree nodes
  const TreeNode = ({ node, depth = 0, parentId = null }) => {
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div className="pl-4 my-1">
        <div className="flex items-center hover:bg-gray-100 p-1 rounded ">
          {hasChildren && (
            <button
              onClick={() => toggleNode(node.id)}
              className="mr-2 p-2 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
            >
              {node.isOpen ? "−" : "+"}
            </button>
          )}
          {/* {!hasChildren && <span className="inline-block"></span>}
          <span className="text-gray-800 font-semibold">{`${
            " ".repeat(depth * 1) + node.name
          }`}</span> */}
          <span className="mx-2 text-gray-600">{node.email}</span>
          <span className="font-medium flex-grow">{node.name}</span>
          <span className="mx-2 text-gray-600">{node.rank}</span>
          <span className="mx-2 text-gray-600">{node.commission}</span>
          <span className="mx-2 text-gray-600">{node.borr}</span>
          <span className="mx-2 text-gray-600">{node.savings}</span>

          <div className="flex gap-2">
            <button
              onClick={() => openModal(node, parentId, true)}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => deleteNode(node.id)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => openModal(null, node.id, false)}
              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Child
            </button>
          </div>
        </div>

        {hasChildren && node.isOpen && (
          <div className="border-l-2 border-gray-300">
            {node.children.map((childNode) => (
              <TreeNode
                key={childNode.id}
                node={childNode}
                depth={depth + 1}
                parentId={node.id}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Operation Place Tree</h1>

      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Root Node
      </button>

      <div className="border rounded-lg p-4 bg-white shadow-sm">
        {data.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>

      {/* Edit/Add Modal */}
      {editModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full">
            <h2 className="text-xl font-bold mb-4">
              {editModal.isEdit ? "Edit Node" : "Add Node"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rank
                </label>
                <input
                  type="text"
                  name="rank"
                  value={formData.rank}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commission
                </label>
                <input
                  type="number"
                  name="commission"
                  value={formData.commission}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveNode}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
