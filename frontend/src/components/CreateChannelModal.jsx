// import { useState } from "react";
// import axios from "axios";

// const CreateChannelModal = ({ onClose, onCreated }) => {
//   const [channelName, setChannelName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleCreate = async () => {
//     if (!channelName.trim()) {
//       setError("Channel name is required");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post("/api/channel", {
//         channelName,
//       });

//       onCreated(res.data); // update parent state
//       onClose();           // close modal
//     } catch (err) {
//       setError("Failed to create channel");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <h3>Create your channel</h3>

//         <input
//           type="text"
//           placeholder="Channel name"
//           value={channelName}
//           onChange={(e) => setChannelName(e.target.value)}
//         />

//         {error && <p className="error">{error}</p>}

//         <div className="modal-actions">
//           <button onClick={handleCreate} disabled={loading}>
//             {loading ? "Creating..." : "Create"}
//           </button>
//           <button onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateChannelModal;
import { useState } from "react";
import axios from "axios";

const CreateChannelModal = ({ isOpen, onClose, onCreated }) => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!channelName.trim()) return alert("Channel name required");

    const res = await axios.post("/api/channels", {
      channelName,
      description,
    });

    onCreated(res.data); // send new channel to parent
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Create Channel</h2>

        <input
          placeholder="Channel name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateChannelModal;
