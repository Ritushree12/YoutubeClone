// import { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import Sidebar from "../components/Sidebar";
// import VideoCard from "../components/VideoCard";
// import CreateChannelModal from "../components/CreateChannelModal";

// const Channel = () => {
//   const { id } = useParams(); // channelId
//   const { user } = useContext(AuthContext);

//   const [channel, setChannel] = useState(null);
//   const [subscribed, setSubscribed] = useState(false);

//   const [showCreateModal, setShowCreateModal] = useState(false);
//   useEffect(() => {
//     axios
//       .get(`/api/channel/${id}`)
//       .then((res) => {
//         setChannel(res.data);
//         if (user) {
//           setSubscribed(res.data.subscribers?.includes(user._id));
//         }
//       })
//       .catch(() => {
//         setChannel(null); // ❗ no channel exists
//       });
//   }, [id, user]);

//   // useEffect(() => {
//   //   axios.get(`/api/channel/${id}`).then((res) => {
//   //     setChannel(res.data);

//   //     if (user) {
//   //       const isSub = res.data.subscribers?.includes(user._id);
//   //       setSubscribed(isSub);
//   //     }
//   //   });
//   // }, [id, user]);

//   const handleSubscribe = async () => {
//     const res = await axios.post(`/api/channel/${id}/subscribe`);
//     setSubscribed(!subscribed);

//     setChannel((prev) => ({
//       ...prev,
//       subscribers: subscribed
//         ? prev.subscribers.filter((s) => s !== user._id)
//         : [...prev.subscribers, user._id],
//     }));
//   };

//   if (!channel) return <p>Loading...</p>;
//   if (channel === undefined) return <p>Loading...</p>;
//   if (channel === null) {
//     return (
//       <>
//         <div className="layout">
//           <Sidebar />

//           <div className="no-channel-page">
//             <h2>You don’t have a channel yet</h2>
//             <p>Create a channel to upload videos and build your audience.</p>

//             <button
//               className="create-channel-btn"
//               onClick={() => setShowCreateModal(true)}
//             >
//               Create Channel
//             </button>

//             {showCreateModal && (
//               <CreateChannelModal
//                 onClose={() => setShowCreateModal(false)}
//                 onCreated={(newChannel) => setChannel(newChannel)}
//               />
//             )}
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <div className="layout">
//         <Sidebar />

//         <div className="channel-page">
//           {/* Channel Header */}
//           <div className="channel-header">
//             <h1>{channel.channelName}</h1>
//             <p>{channel.handle}</p>
//             <p>{channel.subscribers?.length || 0} subscribers</p>

//             {user && channel.owner && user._id !== channel.owner.toString() && (
//               <button className="subscribe-btn" onClick={handleSubscribe}>
//                 {subscribed ? "Subscribed" : "Subscribe"}
//               </button>
//             )}
//           </div>

//           {/* Videos */}
//           <div className="video-grid">
//             {(channel.videos || []).map((video) => (
//               <VideoCard
//                 key={video._id}
//                 video={video}
//                 channelName={channel.channelName}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Channel;

import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import CreateChannelModal from "../components/CreateChannelModal";

const Channel = () => {
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get("/channel/me").then((res) => {
      setChannels(res.data);
      setActiveChannel(res.data[0] || null);
    });
  }, []);

  return (
    <>
      <div className="layout">
        <Sidebar />

        <div className="channel-page">
          {/* NO CHANNEL */}
          {!activeChannel && (
            <div className="no-channel">
              <h2>You don’t have a channel yet</h2>
              <p>Create a channel to upload videos</p>
              <button onClick={() => setShowModal(true)}>
                Create Channel
              </button>
            </div>
          )}

          {/* CHANNEL EXISTS */}
          {activeChannel && (
            <>
              <div className="channel-header">
                <h1>{activeChannel.channelName}</h1>
                <p>{activeChannel.subscribers?.length || 0} subscribers</p>
              </div>

              <div className="video-grid">
                {(activeChannel.videos || []).map((video) => (
                  <VideoCard key={video._id} video={video} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <CreateChannelModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={(channel) => {
          setChannels([...channels, channel]);
          setActiveChannel(channel);
        }}
      />
    </>
  );
};

export default Channel;
