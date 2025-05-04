import { useState } from "react";
import data from "../../data/data"; // Assuming you have a data.json file with the initial data

export default function OperationPlaceTree() {
  const [data, setData] = useState([
    {
      id: "1",
      name: "Zone Office",
      borr: 713,
      savings: 1196.17,
      savingsRatio: "49%",
      os: 300.5,
      avgos: 3.5,
      otr: "90%",
      totalcollection: 13.19,
      serviceCharge: 9.36,
      savingscollection: 3.83,
      savingsrtn: 0.5,
      srratio: "50%",
      disbursement: 0.5,
      cashandbank: 0.5,
      overdue: 0.5,
      isOpen: true,
      children: [
        {
          id: "1.1",
          name: "Rangpur Division",
          borr: 876,
          savings: 107.01,
          savingsRatio: "44%",
          os: 245.01,
          avgos: 2.47,
          otr: "94%",
          totalcollection: 13.19,
          serviceCharge: 9.36,
          savingscollection: 3.83,
          savingsrtn: 0.5,
          srratio: "50%",
          disbursement: 0.5,
          cashandbank: 0.5,
          overdue: 0.5,
          isOpen: false,
          children: [
            {
              id: "1.1.1",
              name: "North Station A",
              borr: 500,
              savings: 80.25,
              savingsRatio: "38%",
              os: 150.25,
              avgos: 2.1,
              otr: "94%",
              totalcollection: 13.19,
              serviceCharge: 9.36,
              savingscollection: 3.83,
              savingsrtn: 0.5,
              srratio: "50%",
              disbursement: 0.5,
              cashandbank: 0.5,
              overdue: 0.5,
              isOpen: false,
              children: [
                {
                  id: "1.1.1.1",
                  name: "North Station A1",
                  borr: 500,
                  savings: 80.25,
                  savingsRatio: "38%",
                  os: 150.25,
                  avgos: 2.1,
                  otr: "94%",
                  totalcollection: 13.19,
                  serviceCharge: 9.36,
                  savingscollection: 3.83,
                  savingsrtn: 0.5,
                  srratio: "50%",
                  disbursement: 0.5,
                  cashandbank: 0.5,
                  overdue: 0.5,
                  isOpen: false,
                },

                {
                  id: "1.1.1.2",
                  name: "North Station A2",
                  borr: 500,
                  savings: 80.25,
                  savingsRatio: "38%",
                  os: 150.25,
                  avgos: 2.1,
                  otr: "94%",
                  totalcollection: 13.19,
                  serviceCharge: 9.36,
                  savingscollection: 3.83,
                  savingsrtn: 0.5,
                  srratio: "50%",
                  disbursement: 0.5,
                  cashandbank: 0.5,
                  overdue: 0.5,
                  isOpen: false,
                },
              ],
            },
          ],
        },
        {
          id: "1.2",
          name: "Dhaka Division",
          borr: 500,
          savings: 80.25,
          savingsRatio: "38%",
          os: 150.25,
          avgos: 2.1,
          otr: "94%",
          totalcollection: 13.19,
          serviceCharge: 9.36,
          savingscollection: 3.83,
          savingsrtn: 0.5,
          srratio: "50%",
          disbursement: 0.5,
          cashandbank: 0.5,
          overdue: 0.5,
          isOpen: false,
          children: [
            {
              id: "1.2.1",
              name: "Dhaka Division",
              borr: 500,
              savings: 80.25,
              savingsRatio: "38%",
              os: 150.25,
              avgos: 2.1,
              otr: "94%",
              totalcollection: 13.19,
              serviceCharge: 9.36,
              savingscollection: 3.83,
              savingsrtn: 0.5,
              srratio: "50%",
              disbursement: 0.5,
              cashandbank: 0.5,
              overdue: 0.5,
              isOpen: false,
            },
          ],
        },
      ],
    },
  ]);

  // const [selectedNode, setSelectedNode] = useState(null);
  const [editModal, setEditModal] = useState({
    isOpen: false,
    node: null,
    parentId: null,
    isEdit: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    borr: "",
    savings: "",
    savingsRatio: "",
    os: "",
    avgos: "",
    otr: "",
    totalcollection: "",
    serviceCharge: "",
    savingscollection: "",
    savingsrtn: "",
    srratio: "",
    disbursement: "",
    cashandbank: "",
    overdue: "",
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
        ? {
            name: node.name,
            borr: node.borr,
            savings: node.savings,
            savingsRatio: node.savingsRatio,
            os: node.os,
            avgos: node.avgos,
            otr: node.otr,
            totalcollection: node.totalcollection || "",
            serviceCharge: node.serviceCharge || "",
            savingscollection: node.savingscollection || "",
            savingsrtn: node.savingsrtn || "",
            srratio: node.srratio || "",
            disbursement: node.disbursement || "",
            cashandbank: node.cashandbank || "",
            overdue: node.overdue || "",
          }
        : {
            name: "",
            borr: "",
            savings: "",
            savingsRatio: "",
            os: "",
            avgos: "",
            otr: "",
            totalcollection: "",
            serviceCharge: "",
            savingscollection: "",
            savingsrtn: "",
            srratio: "",
            disbursement: "",
            cashandbank: "",
            overdue: "",
          }
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
    setFormData({
      name: "",
      borr: "",
      savings: "",
      savingsRatio: "",
      os: "",
      avgos: "",
      otr: "",
      totalcollection: "",
      serviceCharge: "",
      savingscollection: "",
      savingsrtn: "",
      srratio: "",
      disbursement: "",
      cashandbank: "",
      overdue: "",
    });
  };

  // Add or update node
  const saveNode = () => {
    if (!formData.name) return;

    const newNode = {
      id: editModal.isEdit ? editModal.node.id : generateId(editModal.parentId),
      name: formData.name,
      borr: Number(formData.borr) || 0,
      savings: Number(formData.savings) || 0,
      savingsRatio: formData.savingsRatio || "0%",
      os: Number(formData.os) || 0,
      avgos: Number(formData.avgos) || 0,
      otr: formData.otr || "0%",
      totalcollection: Number(formData.totalcollection) || 0,
      serviceCharge: Number(formData.serviceCharge) || 0,
      savingscollection: Number(formData.savingscollection) || 0,
      savingsrtn: Number(formData.savingsrtn) || 0,
      srratio: formData.srratio || "0%",
      disbursement: Number(formData.disbursement) || 0,
      cashandbank: Number(formData.cashandbank) || 0,
      overdue: Number(formData.overdue) || 0,
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
        {/* Node Content */}
        <div className="flex items-center hover:bg-gray-100 p-1 rounded">
          {hasChildren && (
            <button
              onClick={() => toggleNode(node.id)}
              className="mr-2 p-2 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
            >
              {node.isOpen ? "−" : "+"}
            </button>
          )}

          {/* Data columns */}
          <span className="w-48 mx-2 font-xs">{node.name}</span>
          <span className="w-24 mx-2 text-gray-600">{node.borr}</span>
          <span className="w-24 mx-2 text-gray-600">{node.savings}</span>
          <span className="w-24 mx-2 text-gray-600">{node.savingsRatio}</span>
          <span className="w-24 mx-2 text-gray-600">{node.os}</span>
          <span className="w-24 mx-2 text-gray-600">{node.avgos}</span>
          <span className="w-24 mx-2 text-gray-600">{node.otr}</span>
          <span className="w-24 mx-2 text-gray-600">
            {node.totalcollection}
          </span>
          <span className="w-24 mx-2 text-gray-600">{node.serviceCharge}</span>
          <span className="w-24 mx-2 text-gray-600">
            {node.savingscollection}
          </span>
          <span className="w-24 mx-2 text-gray-600">{node.savingsrtn}</span>
          <span className="w-24 mx-2 text-gray-600">{node.srratio}</span>
          <span className="w-24 mx-2 text-gray-600">{node.disbursement}</span>
          <span className="w-24 mx-2 text-gray-600">{node.cashandbank}</span>
          <span className="w-24 mx-2 text-gray-600">{node.overdue}</span>

          <div className="flex gap-2 ml-auto">
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

      <div className="border rounded-lg bg-white shadow-sm overflow-x-auto">
        {/* Fixed Header Row */}
        <div className="flex items-center bg-gray-100 p-2 rounded-t-lg font-xs text-wrap sticky top-0 z-10">
          <div className="flex">
            <span className="lg:w-56 mx-2 mr-5">Operation Place</span>
          </div>
          <span className="w-auto px-2">Borr</span>
          <span className="w-auto px-2">Savings</span>
          <span className="w-auto px-2">Savings %</span>
          <span className="w-auto px-2">OS</span>
          <span className="w-auto px-2">Avg OS</span>
          <span className="w-auto px-2">OTR%</span>
          <span className="w-auto px-2">Total Collection</span>
          <span className="w-auto px-2">Service Charge</span>
          <span className="w-auto px-2">Savings Collection</span>
          <span className="w-auto px-2">Savings RTN</span>
          <span className="w-auto px-2">SR Ratio</span>
          <span className="w-auto px-2">Disbursement</span>
          <span className="w-auto px-2">Cash & Bank</span>
          <span className="w-auto px-2">Overdue</span>
          <span className="w-48 px-2 ml-auto">Actions</span>
        </div>

        {/* Tree Nodes */}
        <div className="p-2">
          {data.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </div>
      </div>

      {/* Edit/Add Modal */}
      {editModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editModal.isEdit ? "Edit Node" : "Add Node"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Borrowers
                </label>
                <input
                  type="number"
                  name="borr"
                  value={formData.borr}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Savings
                </label>
                <input
                  type="number"
                  name="savings"
                  value={formData.savings}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Savings Ratio
                </label>
                <input
                  type="text"
                  name="savingsRatio"
                  value={formData.savingsRatio}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OS
                </label>
                <input
                  type="number"
                  name="os"
                  value={formData.os}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Avg OS
                </label>
                <input
                  type="number"
                  name="avgos"
                  value={formData.avgos}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OTR
                </label>
                <input
                  type="text"
                  name="otr"
                  value={formData.otr}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Collection
                </label>
                <input
                  type="number"
                  name="totalcollection"
                  value={formData.totalcollection}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Charge
                </label>
                <input
                  type="number"
                  name="serviceCharge"
                  value={formData.serviceCharge}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Savings Collection
                </label>
                <input
                  type="number"
                  name="savingscollection"
                  value={formData.savingscollection}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Savings RTN
                </label>
                <input
                  type="number"
                  name="savingsrtn"
                  value={formData.savingsrtn}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SR Ratio
                </label>
                <input
                  type="text"
                  name="srratio"
                  value={formData.srratio}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Disbursement
                </label>
                <input
                  type="number"
                  name="disbursement"
                  value={formData.disbursement}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cash & Bank
                </label>
                <input
                  type="number"
                  name="cashandbank"
                  value={formData.cashandbank}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overdue
                </label>
                <input
                  type="number"
                  name="overdue"
                  value={formData.overdue}
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
