export const messages = [
  {
    type: 'user' as const,
    text: "Hey! Do you offer custom designs?",
    delay: 0
  },
  {
    type: 'bot' as const,
    text: "Hi there! 👋 Yes, we do offer custom designs! Our team specializes in creating unique pieces tailored to your preferences. Would you like to know more about our custom design process?",
    delay: 1500
  },
  {
    type: 'user' as const,
    text: "What is the typical turnaround time?",
    delay: 3000
  },
  {
    type: 'bot' as const,
    text: "Our typical turnaround time for custom designs is 2-3 weeks. This includes the initial design consultation, revisions, and final production. Would you like to schedule a consultation?",
    delay: 4500
  }
]