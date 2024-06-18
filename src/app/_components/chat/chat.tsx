"use client"
import React, { useState, type KeyboardEvent } from 'react';

import { CornerDownLeft } from "lucide-react"

  import { Button } from "~/components/ui/button"
  import { Label } from "~/components/ui/label"
  import { Textarea } from "~/components/ui/textarea"

// Define the structure of a message
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  response: string;
}

interface ChatComponentProps {
  profile: unknown;
  page?: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ profile, page }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: input, page }),
        });

        const data = await response.json() as ChatResponse;
        
        
        const assistantMessage: Message = { role: 'assistant', content: data.response  };

        setMessages([...messages, newMessage, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = { role: 'assistant', content: 'Error: unable to get response.' };
      setMessages([...messages, newMessage, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

//   const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       await sendMessage();
//     }
//   };

  return (
    <div className="grid w-full mt-5">
      <div className="flex-col">
        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
          <div className="border p-4 mb-4 h-96 overflow-y-scroll">
            {messages.map((message, index) => (
              <div key={index} className={message.role === 'user' ? 'text-right' : 'text-left'}>
                <p>
                  <strong>{message.role === 'user' ? 'You' : 'Bot'}:</strong> {message.content}
                </p>
              </div>
            ))}
          </div>
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
            

                <form
                    className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
                >
                    <Label htmlFor="message" className="sr-only">
                        Message
                    </Label>
                    <Textarea
                        id="message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                        placeholder="Type your message here..."
                        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                    />
                    <div className="flex items-center p-3 pt-0">
                        <Button  onClick={sendMessage} disabled={isLoading} type="submit" size="sm" className="ml-auto gap-1.5">
                            {isLoading ? 'Sending...' : 'Send'}
                        <CornerDownLeft className="size-3.5" />
                        </Button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;