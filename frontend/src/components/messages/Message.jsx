import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    
    // Determine if the message is sent by the current user
    const fromMe = message.senderId === authUser._id; 
    const formattedTime = extractTime(message.createdAt);

    // Define chat alignment class based on sender
    const chatClassName = fromMe ? "chat-end" : "chat-start"; 
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    
    // Background and text colors for sent and received messages
    const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-300"; 
    const textColor = fromMe ? "text-white" : "text-black"; 
    const shakeClass = message.shouldShake ? "shake" : "";

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='User Avatar' src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble ${bubbleBgColor} ${textColor} ${shakeClass} pb-2`}>
                {message.message}
            </div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
        </div>
    );
};

export default Message;
