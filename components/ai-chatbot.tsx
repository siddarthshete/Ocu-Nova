"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, User, Send, X, MessageCircle, Zap, Loader2, Eye, Stethoscope, Camera, Shield, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hello! I'm OcuNova AI Assistant. I can help you with eye disease information, platform usage, and eye health education. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const commonQuestions = [
    "How accurate is the AI?",
    "What diseases can you detect?",
    "Is this for medical diagnosis?",
    "How to upload images?",
    "Tell me about cataracts",
    "What is diabetic retinopathy?",
    "What are glaucoma symptoms?",
    "How to prevent eye diseases?",
    "What is macular degeneration?",
    "When to see an eye doctor?"
  ]

  // Improved AI response function with better matching
  const getAIResponse = async (userMessage: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // More specific keyword matching
    if (lowerMessage.includes('accurate') || lowerMessage.includes('accuracy')) {
      return "🔍 **AI Accuracy Information:**\n\nOur deep learning model achieves approximately 95% accuracy in detecting common eye conditions like cataracts, diabetic retinopathy, and glaucoma in clinical validation studies. However, please note:\n\n• Results may vary based on image quality\n• Regular model updates improve performance\n• Always consult healthcare professionals for final diagnosis\n• Intended for screening purposes only";
    }
    
    if (lowerMessage.includes('prevent') || lowerMessage.includes('prevention') || lowerMessage.includes('healthy eyes')) {
      return "🛡️ **Eye Disease Prevention Tips:**\n\n**Regular Care:**\n• Comprehensive eye exams every 1-2 years\n• UV-protection sunglasses outdoors\n• Balanced diet rich in leafy greens and omega-3s\n\n**Lifestyle Habits:**\n• Maintain healthy blood sugar and pressure\n• Avoid smoking\n• Take screen breaks (20-20-20 rule)\n• Wear protective eyewear during sports\n\n**Early Detection:**\n• Monitor vision changes\n• Know family eye history\n• Don't ignore symptoms";
    }
    
    if (lowerMessage.includes('disease') && lowerMessage.includes('detect') || lowerMessage.includes('what can you detect')) {
      return "👁️ **Detectable Conditions:**\n\n**Common Conditions:**\n• Cataracts - Lens clouding\n• Diabetic Retinopathy - Diabetes-related\n• Glaucoma - Optic nerve damage\n• Macular Degeneration - Central vision loss\n\n**Other Conditions:**\n• Conjunctivitis (Pink Eye)\n• Retinal disorders\n• Corneal issues\n• Early signs of vision problems\n\n*Note: I provide screening information, not medical diagnosis.*";
    }
    
    if (lowerMessage.includes('medical diagnosis') || lowerMessage.includes('doctor') || lowerMessage.includes('professional')) {
      return "⚠️ **Medical Disclaimer**\n\n**Important:** I am an AI assistant for educational and screening purposes only. I do NOT provide:\n\n• Medical diagnoses\n• Treatment recommendations\n• Emergency advice\n• Professional medical opinions\n\n**Always consult with:**\n• Licensed ophthalmologists\n• Qualified eye care professionals\n• Healthcare providers for any concerns";
    }
    
    if (lowerMessage.includes('upload') || lowerMessage.includes('image') || lowerMessage.includes('photo')) {
      return "📸 **Image Upload Guide:**\n\n**Supported Formats:**\n• JPG, PNG, WebP\n• Max file size: 10MB\n• Recommended resolution: 1MP+\n\n**Best Practices:**\n1. Good, even lighting\n2. Eye centered in frame\n3. Clear focus on the eye\n4. No red-eye reduction\n5. Natural eye position\n\n**Upload Steps:**\n1. Click camera/upload icon\n2. Select your image\n3. Review image quality\n4. Submit for analysis";
    }
    
    if (lowerMessage.includes('cataract')) {
      return "🌫️ **Cataracts Information:**\n\n**What are cataracts?**\nClouding of the eye's natural lens, usually developing slowly with age.\n\n**Common Symptoms:**\n• Blurry, cloudy vision\n• Faded colors\n• Sensitivity to glare\n• Difficulty seeing at night\n• Frequent prescription changes\n\n**Risk Factors:**\n• Aging (most common)\n• Diabetes\n• Smoking\n• UV exposure\n• Family history\n\n**Treatment:**\nOutpatient surgery with high success rates (>95%)";
    }
    
    if (lowerMessage.includes('diabetic') || lowerMessage.includes('retinopathy')) {
      return "🩸 **Diabetic Retinopathy:**\n\n**What is it?**\nDiabetes complication affecting retinal blood vessels.\n\n**Stages:**\n1. Mild nonproliferative - Microaneurysms\n2. Moderate - Blood vessel blockage\n3. Severe - More vessel blockage\n4. Proliferative - New abnormal vessels\n\n**Prevention:**\n• Control blood sugar levels\n• Regular eye screenings\n• Manage blood pressure\n• Annual dilated eye exams\n\n**Critical:** Early detection prevents vision loss!";
    }
    
    if (lowerMessage.includes('glaucoma') || lowerMessage.includes('eye pressure')) {
      return "💧 **Glaucoma Information:**\n\n**The 'Silent Thief of Sight'**\nGroup of diseases damaging optic nerve, often with elevated eye pressure.\n\n**Types & Symptoms:**\n• **Open-angle:** Slow vision loss, peripheral first\n• **Angle-closure:** Sudden pain, redness, halos\n• **Normal-tension:** Progressive damage\n\n**Risk Factors:**\n• Over 60 years old\n• Family history\n• High eye pressure\n• Thin corneas\n• Extreme nearsightedness\n\n**Screening:** Regular pressure checks and comprehensive exams";
    }
    
    if (lowerMessage.includes('macular') || lowerMessage.includes('amd')) {
      return "🎯 **Macular Degeneration (AMD):**\n\n**What is AMD?**\nBreakdown of macula affecting central vision.\n\n**Two Types:**\n• **Dry (90%):** Slow progression, drusen deposits\n• **Wet:** Rapid vision loss, leaky blood vessels\n\n**Symptoms:**\n• Distorted straight lines\n• Dark/blurry central vision\n• Difficulty recognizing faces\n• Need for brighter light\n\n**Management:**\n• AREDS2 supplements (dry)\n• Anti-VEGF injections (wet)\n• Amsler grid monitoring\n• Healthy lifestyle";
    }
    
    if (lowerMessage.includes('see doctor') || lowerMessage.includes('when to see') || lowerMessage.includes('emergency')) {
      return "🏥 **When to See an Eye Doctor:**\n\n**Schedule an Appointment For:**\n• Routine exams every 1-2 years\n• Vision changes or blurriness\n• Eye discomfort or redness\n• Family history of eye disease\n• Diabetes or high blood pressure\n\n**Seek Immediate Care For:**\n• Sudden vision loss\n• Eye pain or injury\n• Seeing flashes/floaters\n• Double vision\n• Redness with pain/vision changes\n\n**Regular screening saves vision!**";
    }
    
    if (lowerMessage.includes('symptom')) {
      return "📋 **Common Eye Symptoms Guide:**\n\n**Concerning Symptoms:**\n• Persistent blurry vision\n• Eye pain or discomfort\n• Redness that doesn't resolve\n• Light sensitivity\n• Floaters or flashes\n• Double vision\n\n**Self-care Tips:**\n• Rest your eyes regularly\n• Use artificial tears if dry\n• Wear UV protection\n• Maintain screen distance\n• Stay hydrated\n\n**Remember:** Persistent symptoms need professional evaluation.";
    }
    
    if (lowerMessage.includes('child') || lowerMessage.includes('children') || lowerMessage.includes('pediatric')) {
      return "👶 **Children's Eye Health:**\n\n**Important Milestones:**\n• Newborn: Responds to light\n• 3 months: Tracks objects\n• 6 months: Color vision develops\n• 1 year: Depth perception\n\n**Warning Signs:**\n• Eye misalignment\n• White pupil in photos\n• Excessive tearing\n• Light sensitivity\n• Sitting close to screens\n\n**Recommendations:**\n• First eye exam at 6 months\n• Regular screenings in school\n• Encourage outdoor play\n• Limit screen time";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('lens') || lowerMessage.includes('contacts')) {
      return "👓 **Contact Lens Safety:**\n\n**Proper Care:**\n• Wash hands before handling\n• Use fresh solution daily\n• Replace case every 3 months\n• Never sleep in lenses (unless approved)\n• Follow replacement schedule\n\n**Warning Signs:**\n• Redness or pain\n• Blurry vision\n• Light sensitivity\n• Discharge\n• Feeling something in eye\n\n**Stop wearing and see doctor if symptoms persist more than 1 hour after removal.**";
    }

    // Default response for unrecognized questions
    return "🤔 I specialize in eye health information. Could you please ask about:\n\n• Specific eye conditions (cataracts, glaucoma, etc.)\n• Symptoms you're concerned about\n• Eye disease prevention\n• How to use our platform\n• When to see a doctor\n\nOr try one of the quick questions above!";
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    setError(null)

    try {
      const response = await getAIResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Chat error:', error)
      setError('Sorry, I encountered an error. Please try again.')
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
    setTimeout(() => {
      const inputElement = document.querySelector('input') as HTMLInputElement;
      inputElement?.focus();
    }, 100);
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "👋 Hello! I'm OcuNova AI Assistant. I can help you with eye disease information, platform usage, and eye health education. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ])
    setError(null)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping opacity-20"></div>
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
            size="icon"
          >
            <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card 
          ref={chatContainerRef}
          className={`fixed bottom-6 right-6 z-50 flex flex-col bg-background/95 backdrop-blur-sm border-2 border-primary/20 shadow-2xl transition-all duration-300 ${
            isMinimized 
              ? 'h-16 w-80' 
              : 'h-[600px] w-80 sm:w-96'
          }`}
        >
          {/* Header */}
          <CardHeader className={`pb-3 border-b bg-gradient-to-r from-primary/5 to-primary/10 transition-all duration-300 ${isMinimized ? 'pb-2' : ''}`}>
            <div className="flex items-center justify-between">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleMinimize}
              >
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <Zap className="h-3 w-3 text-green-500 fill-green-500" />
                  </div>
                </div>
                <div className={`transition-all duration-300 ${isMinimized ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                  <CardTitle className="text-lg">OcuNova AI</CardTitle>
                  <p className="text-xs text-muted-foreground">Eye Health Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMinimize}
                  className="h-7 w-7 text-muted-foreground hover:text-foreground transition-colors"
                  title={isMinimized ? "Expand" : "Minimize"}
                >
                  <div className={`transform transition-transform ${isMinimized ? 'rotate-180' : ''}`}>
                    ↓
                  </div>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearChat}
                  className="h-7 w-7 text-muted-foreground hover:text-foreground transition-colors"
                  title="Clear chat"
                >
                  <div className="h-3 w-3 bg-current rounded-sm" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-7 w-7 transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}
                  >
                    {message.sender === 'bot' && (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 transition-all duration-300 hover:shadow-md ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg'
                          : 'bg-muted/80 border shadow-sm backdrop-blur-sm'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                      <p className="text-xs opacity-70 mt-2 flex items-center gap-1">
                        <span>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                        {message.sender === 'bot' && (
                          <>
                            <span>•</span>
                            <span>AI Assistant</span>
                          </>
                        )}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start animate-in fade-in duration-300">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted/80 rounded-2xl p-4 border shadow-sm backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">Analyzing your question...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Quick Questions */}
              <div className="px-4 pb-3 border-b">
                <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Quick questions:
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                  {commonQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs h-7 hover:bg-primary/10 hover:text-primary transition-all duration-200 border-primary/20 hover:border-primary/40 whitespace-nowrap"
                      disabled={isTyping}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 bg-background/50 backdrop-blur-sm">
                <div className="flex gap-2 mb-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about eye diseases, symptoms, or prevention..."
                    className="flex-1 border-primary/20 focus:border-primary transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    size="icon"
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:hover:shadow-lg"
                  >
                    {isTyping ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-2">
                  <AlertTriangle className="h-3 w-3" />
                  For educational purposes • Not medical advice
                  <Shield className="h-3 w-3" />
                </p>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  )
}