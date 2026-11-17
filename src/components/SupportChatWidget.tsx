import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ShoppingBag } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  quickActions?: { label: string; actionText: string }[];
  storeLink?: boolean;
}

interface SupportChatWidgetProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  onNavigateToStore?: () => void;
}

export const SupportChatWidget: React.FC<SupportChatWidgetProps> = ({
  isOpen,
  onToggle,
  onNavigateToStore,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Kia ora! Welcome to Autogrow Technical Grower Support.\nI can assist you with sensor calibration, MultiGrow wiring, 24VAC alarm faults, or finding genuine replacement probes and parts in our Online Store.',
      time: 'Just now',
      quickActions: [
        { label: 'Calibrate pH & EC', actionText: 'How do I calibrate my pH Sense Plus and EC sensors?' },
        { label: 'MultiGrow 24VAC Alarm', actionText: 'What does MultiGrow 24VAC Solenoid Lockout mean?' },
        { label: 'Order Replacement Probes', actionText: 'Where can I buy replacement pH electrodes or pump parts?' },
        { label: 'Direct Hotline & Email', actionText: 'What are the global support phone numbers and email?' },
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Formulate intelligent response
    setTimeout(() => {
      let botResponse = '';
      let isStore = false;
      const lower = text.toLowerCase();

      if (lower.includes('calibrate') || lower.includes('ph') && lower.includes('ec')) {
        botResponse = 'For pH Sense Plus: 1. Clean the glass bulb in distilled water. 2. Place in pH 7.00 buffer and press "Calibrate Standard" on your MultiGrow/IntelliDose. 3. Rinse and place into pH 4.01 buffer to set the slope.\n\nFor EC: Ensure the toroidal ring is fully submerged and calibrated using standard 2.77 mS/cm reference solution at 25°C with automatic temperature compensation enabled.';
      } else if (lower.includes('alarm') || lower.includes('solenoid') || lower.includes('24vac') || lower.includes('lockout') || lower.includes('fault')) {
        botResponse = 'MultiGrow 24VAC Solenoid Lockout typically occurs when an inductive current spike exceeds 2.5 Amps on terminal TB3, or when valve wiring has shorted in the field.\n\nDiagnostic Steps:\n1. Check that your solenoid coil impedance is between 25–40 Ohms.\n2. Verify that the snubber diode is intact across the relay terminals.\n3. Clear fault from console under Menu > System > Reset Fault Alarms.';
      } else if (lower.includes('replace') || lower.includes('probe') || lower.includes('part') || lower.includes('store') || lower.includes('buy')) {
        botResponse = 'Genuine replacement sensors (pH Sense Plus, EC Toroidal, WCS Substrate TDR), peristaltic pump cartridges, and calibration standards are available directly in our Online Parts Store with fast worldwide dispatch.';
        isStore = true;
      } else if (lower.includes('rs-485') || lower.includes('wire') || lower.includes('envirosensor') || lower.includes('cable')) {
        botResponse = 'EnviroSensor pods use a daisy-chain bus topology over RJ12 connectors or TB1 on MultiGrow. Ensure you use 24 AWG shielded twisted pair cable with 120-Ohm characteristic impedance. Always terminate the furthest pod with a 120-Ohm resistor to prevent signal reflection across runs over 100 meters.';
      } else if (lower.includes('phone') || lower.includes('hotline') || lower.includes('email') || lower.includes('contact')) {
        botResponse = 'Our Technical Helpdesk is available Monday–Friday 11AM–5PM (NZ Time):\n• New Zealand & Global HQ: +64 9 415 2380\n• Americas Toll-Free: +1 (800) 852-3088\n• Email Helpdesk: help@autogrow.com\nEmergency night critical harvest support is routed automatically for enterprise skid customers.';
      } else {
        botResponse = `Thank you for reaching out regarding "${text}". An Autogrow technical field engineer from our Auckland R&D team has been notified.\n\nFor urgent commercial crop issues, you can call our toll-free hotline at +1 (800) 852-3088 or email help@autogrow.com.`;
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        storeLink: isStore,
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
    }, 850);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 4000,
        }}
      >
        {!isOpen && (
          <button
            onClick={() => onToggle(true)}
            style={{
              backgroundColor: '#111827',
              color: '#FFFFFF',
              border: '2px solid #76b82a',
              borderRadius: '9999px',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '14px',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.backgroundColor = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = '#111827';
            }}
          >
            <span style={{ position: 'relative', display: 'flex' }}>
              <MessageSquare size={18} style={{ color: '#76b82a' }} />
              <span style={{ position: 'absolute', top: '-3px', right: '-3px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#76b82a' }} />
            </span>
            <span>Grower Technical Support</span>
          </button>
        )}
      </div>

      {/* Chat Dialog Window */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '390px',
            maxWidth: 'calc(100vw - 32px)',
            height: '580px',
            maxHeight: 'calc(100vh - 48px)',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 4500,
          }}
        >
          {/* Header */}
          <div 
            style={{
              backgroundColor: '#111827',
              color: '#FFFFFF',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div 
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: '#76b82a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: '16px',
                }}
              >
                A
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800 }}>Autogrow Technical Desk</div>
                <div style={{ fontSize: '11px', color: '#86EFAC', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#76b82a' }} />
                  Field Engineers Online · Auckland HQ
                </div>
              </div>
            </div>

            <button
              onClick={() => onToggle(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#9CA3AF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Body */}
          <div 
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              backgroundColor: '#F9FAFB',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {messages.map((msg) => (
              <div 
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div 
                  style={{
                    maxWidth: '88%',
                    padding: '12px 16px',
                    borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    backgroundColor: msg.sender === 'user' ? '#111827' : '#FFFFFF',
                    color: msg.sender === 'user' ? '#FFFFFF' : '#1F2937',
                    fontSize: '13.5px',
                    lineHeight: 1.5,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    border: msg.sender === 'bot' ? '1px solid #E5E7EB' : 'none',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {msg.text}

                  {msg.storeLink && onNavigateToStore && (
                    <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #E5E7EB' }}>
                      <button
                        onClick={() => {
                          onToggle(false);
                          onNavigateToStore();
                        }}
                        className="btn btn-primary"
                        style={{ padding: '6px 14px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <ShoppingBag size={13} />
                        Open Online Parts Store
                      </button>
                    </div>
                  )}
                </div>

                <span style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '4px', padding: '0 4px' }}>
                  {msg.time}
                </span>

                {/* Quick Action Suggestion Buttons */}
                {msg.quickActions && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px', maxWidth: '100%' }}>
                    {msg.quickActions.map((qa, qIdx) => (
                      <button
                        key={qIdx}
                        onClick={() => handleSend(qa.actionText)}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #76b82a',
                          color: '#15803D',
                          borderRadius: '9999px',
                          padding: '5px 12px',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'background-color 0.15s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F0FDF4')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                      >
                        {qa.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FFFFFF', padding: '8px 14px', borderRadius: '16px', width: 'fit-content', border: '1px solid #E5E7EB' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#76b82a' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#9CA3AF' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D1D5DB' }} />
                <span style={{ fontSize: '11px', color: '#6B7280', marginLeft: '4px' }}>Engineer typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Contact Hotline Bar */}
          <div style={{ backgroundColor: '#F3F4F6', padding: '8px 16px', fontSize: '11px', color: '#4B5563', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E5E7EB' }}>
            <span>🇳🇿 +64 9 415 2380</span>
            <span>🇺🇸 +1 (800) 852-3088</span>
            <span>help@autogrow.com</span>
          </div>

          {/* Input Bar */}
          <div 
            style={{
              padding: '12px 16px',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <input 
              type="text" 
              placeholder="Ask an engineer or type alarm code..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              style={{
                flex: 1,
                border: '1px solid #D1D5DB',
                borderRadius: '9999px',
                padding: '10px 16px',
                fontSize: '13px',
                outline: 'none',
                color: '#111827',
              }}
            />

            <button
              onClick={() => handleSend()}
              style={{
                backgroundColor: '#76b82a',
                color: '#FFFFFF',
                border: 'none',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <Send size={15} />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
