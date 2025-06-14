'use client';

import React from 'react';
import { useEffect, useState } from 'react';

interface Reply {
  _id: string;
  to: string;
  subject: string;
  message: string;
  sentAt?: string;
  createdAt?: string;
}

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  replies?: Reply[];
}

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch('/api/contact');
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();
  }, []);

  const handleSendReply = async () => {
    if (!replyingTo) return;
    try {
      const res = await fetch('/api/contact/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: replyingTo.email,
          subject: subject || `Reply to your message`,
          message: replyContent,
          messageId: replyingTo._id, // Link reply to message
        }),
      });

      if (res.ok) {
        alert('Reply sent!');
        setReplyingTo(null);
        setReplyContent('');
        setSubject('');

        // Refresh messages to show new reply
        const updatedRes = await fetch('/api/contact');
        const updatedData = await updatedRes.json();
        setMessages(updatedData);
      } else {
        alert('Failed to send reply');
      }
    } catch (err) {
      console.error(err);
      alert('Error sending reply');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Messages</h1>

      <table className="min-w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Message</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <React.Fragment key={msg._id}>
              <tr>
                <td className="border px-4 py-2">{msg.name}</td>
                <td className="border px-4 py-2">{msg.email}</td>
                <td className="border px-4 py-2">{msg.message}</td>
                <td className="border px-4 py-2">
                  {new Date(msg.createdAt).toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => setReplyingTo(msg)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Reply
                  </button>
                </td>
              </tr>

              {/* Show replies */}
              {msg.replies && msg.replies.length > 0 && (
                <tr>
                  <td colSpan={5} className="bg-gray-100 px-4 py-2">
                    <div className="text-sm text-gray-700">
                      <strong>Replies:</strong>
                      <ul className="list-disc ml-4 mt-2">
                        {msg.replies.map((reply) => (
                          <li key={reply._id}>
                            <strong>{reply.subject}</strong>: {reply.message}{' '}
                            <em>({new Date(reply.createdAt || '').toLocaleString()})</em>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Reply Modal */}
      {replyingTo && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-bold mb-2">Reply to {replyingTo.email}</h2>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full mb-2 p-2 border"
          />
          <textarea
            placeholder="Type your reply here..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full h-32 p-2 border"
          />
          <div className="mt-2">
            <button
              onClick={handleSendReply}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Send Reply
            </button>
            <button
              onClick={() => setReplyingTo(null)}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
