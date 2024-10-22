import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef(null);

    useEffect(() => {
        // Scroll to the last message when messages change
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {loading && (
                <div>
                    {[...Array(3)].map((_, idx) => (
                        <MessageSkeleton key={idx} />
                    ))}
                </div>
            )}

            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}

            {!loading && messages.length > 0 && messages.map((message, index) => (
                <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
                    <Message message={message} />
                </div>
            ))}
        </div>
    );
};

export default Messages;
