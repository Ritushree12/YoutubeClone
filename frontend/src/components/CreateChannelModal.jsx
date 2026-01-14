import { useState } from "react";
import api from "../services/api.js";

const CreateChannelModal = ({ isOpen, onClose, onCreated }) => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!channelName.trim()) return alert("Channel name required");

    const res = await api.post("/channels", {
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
