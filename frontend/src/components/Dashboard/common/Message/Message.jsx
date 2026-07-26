import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiSend, 
    FiArrowLeft, 
    FiMoreVertical, 
    FiSearch, 
    FiCheckCircle, 
    FiShieldOff, 
    FiTrash2 
} from 'react-icons/fi';
import './Message.css';

function Message() {
    // Mock users/conversations list
    const [conversations, setConversations] = useState([
        {
            id: 1,
            name: 'Priyanka Dash',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            online: true,
            lastSeen: 'Online',
            messages: [
                { id: 101, sender: 'them', text: 'Hello Debabrata! Have you completed the React module?', time: '10:30 AM' },
                { id: 102, sender: 'me', text: 'Yes, almost done with hooks part.', time: '10:32 AM' },
            ],
            unreadCount: 2
        },
        {
            id: 2,
            name: 'Tech Monster Support',
            avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
            online: false,
            lastSeen: 'Last seen today at 9:15 AM',
            messages: [
                { id: 201, sender: 'them', text: 'Your certificate has been verified successfully!', time: 'Yesterday' }
            ],
            unreadCount: 0
        },
        {
            id: 3,
            name: 'Subrat Kumar',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
            online: true,
            lastSeen: 'Online',
            messages: [
                { id: 301, sender: 'them', text: 'Bhai, kal class achhi ki nahi?', time: '8:00 PM' }
            ],
            unreadCount: 1
        }
    ]);

    const [activeChat, setActiveChat] = useState(null);
    const [inputText, setInputText] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeChat?.messages]);

    // Handle selecting a chat & clearing its unread count
    const handleSelectChat = (chat) => {
        setActiveChat(chat);
        setConversations(conversations.map(c => c.id === chat.id ? { ...c, unreadCount: 0 } : c));
        setShowMenu(false);
    };

    // Send Message handler
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim() || !activeChat) return;

        const newMessage = {
            id: Date.now(),
            sender: 'me',
            text: inputText.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const updatedMessages = [...activeChat.messages, newMessage];
        setActiveChat({ ...activeChat, messages: updatedMessages });

        setConversations(conversations.map(c => c.id === activeChat.id ? { ...c, messages: updatedMessages } : c));
        setInputText('');
    };

    const filteredConversations = conversations.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div 
            className="message-page-container"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Left Sidebar: Conversations List */}
            <div className={`msg-sidebar ${activeChat ? 'mobile-hidden' : ''}`}>
                <div className="msg-sidebar-header">
                    <h2>Messages</h2>
                    <div className="msg-search-box">
                        <FiSearch />
                        <input 
                            type="text" 
                            placeholder="Search chats..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="msg-conversations-list">
                    {filteredConversations.map((chat) => {
                        const lastMsg = chat.messages[chat.messages.length - 1];
                        return (
                            <motion.div 
                                key={chat.id}
                                className={`msg-chat-item ${activeChat?.id === chat.id ? 'active' : ''}`}
                                onClick={() => handleSelectChat(chat)}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="msg-avatar-container">
                                    <img src={chat.avatar} alt={chat.name} />
                                    {chat.online && <span className="online-dot"></span>}
                                </div>
                                <div className="msg-item-info">
                                    <div className="msg-item-top">
                                        <h4>{chat.name}</h4>
                                        <span className="msg-time">{lastMsg?.time}</span>
                                    </div>
                                    <div className="msg-item-bottom">
                                        <p>{lastMsg?.text}</p>
                                        {chat.unreadCount > 0 && (
                                            <span className="msg-unread-badge">{chat.unreadCount}</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Right Main Chat Window */}
            <div className={`msg-chat-window ${!activeChat ? 'mobile-hidden' : ''}`}>
                {activeChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="msg-chat-header">
                            <div className="msg-header-left">
                                <button className="msg-back-btn" onClick={() => setActiveChat(null)}>
                                    <FiArrowLeft />
                                </button>
                                <div className="msg-avatar-container">
                                    <img src={activeChat.avatar} alt={activeChat.name} />
                                    {activeChat.online && <span className="online-dot"></span>}
                                </div>
                                <div className="msg-header-user-info">
                                    <h3>{activeChat.name}</h3>
                                    <span className="msg-status-text">{activeChat.lastSeen}</span>
                                </div>
                            </div>

                            <div className="msg-header-actions">
                                <button className="msg-icon-btn" onClick={() => setShowMenu(!showMenu)}>
                                    <FiMoreVertical />
                                </button>

                                <AnimatePresence>
                                    {showMenu && (
                                        <motion.div 
                                            className="msg-dropdown-menu"
                                            initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                        >
                                            <button onClick={() => alert('Chat Cleared')}>
                                                <FiTrash2 /> Clear Chat
                                            </button>
                                            <button onClick={() => alert('User Blocked')}>
                                                <FiShieldOff /> Block User
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Chat Messages Area */}
                        <div className="msg-messages-body">
                            {activeChat.messages.map((msg) => (
                                <motion.div 
                                    key={msg.id} 
                                    className={`msg-bubble-wrapper ${msg.sender === 'me' ? 'sent' : 'received'}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="msg-bubble">
                                        <p>{msg.text}</p>
                                        <div className="msg-meta">
                                            <span>{msg.time}</span>
                                            {msg.sender === 'me' && <FiCheckCircle className="msg-read-icon" />}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Chat Input Footer */}
                        <form className="msg-input-footer" onSubmit={handleSendMessage}>
                            <input 
                                type="text" 
                                placeholder="Type a message..." 
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <motion.button 
                                type="submit" 
                                className="msg-send-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiSend />
                            </motion.button>
                        </form>
                    </>
                ) : (
                    <div className="msg-no-chat-selected">
                        <div className="placeholder-content">
                            <FiSend size={50} color="#00f0ff" />
                            <h3>Select a conversation to start chatting</h3>
                            <p>Connect with peers and instructors instantly in real-time.</p>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default Message;