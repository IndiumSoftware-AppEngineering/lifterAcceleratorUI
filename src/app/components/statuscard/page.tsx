import Card from "../common/projectstatuscard/page";


export default function StatusCard() {
  const cardsData = [
    {
      id: "11011",
      title: "Natural Language Processing",
      status: "Active",
      date: "12-11-2024",
      extractionStatus: "Extraction Completed",
      avatars: [
        { name: "L", color: "bg-purple-500" },
        { name: "C", color: "bg-green-500" },
        { name: "A", color: "bg-orange-500" },
        { name: "J", color: "bg-blue-500" },
      ],
      icons: [
        { name: "PDF", link: "/pdf-link", iconPath: "/images/pdf.png" },
        { name: "GitHub", link: "/github-link", iconPath: "/images/git.png" },
        { name: "Web", link: "/web-link", iconPath: "/images/web.png" },
        { name: "OpenAI", link: "/openai-link", iconPath: "/images/chat.png" },
      ],
    },
    {
      id: "13564",
      title: "Predictive Maintenance System",
      status: "Inactive",
      date: "12-11-2024",
      extractionStatus: "Extraction in Progress",
      progress: 60, 
      avatars: [
        { name: "A", color: "bg-orange-500" },
        { name: "J", color: "bg-blue-500" },
      ],
      icons: [
        { name: "Web", link: "/web-link", iconPath: "/images/web.png" },
        { name: "OpenAI", link: "/openai-link", iconPath: "/images/chat.png" },
      ],
    },
    {
      id: "67895",
      title: "Image Recognition Solution",
      status: "Active",
      date: "12-11-2024",
      extractionStatus: "Extraction in Progress",
      progress: 45, 
      avatars: [
        { name: "M", color: "bg-blue-500" },
        { name: "K", color: "bg-green-500" },
      ],
      icons: [
        { name: "Web", link: "/web-link", iconPath: "/images/web.png" },
        { name: "OpenAI", link: "/openai-link", iconPath: "/images/chat.png" },
      ],
    },
    {
      id: "98765",
      title: "Blockchain Security Framework",
      status: "Active",
      date: "12-11-2024",
      extractionStatus: "Approval Pending",
      avatars: [
        { name: "S", color: "bg-red-500" },
        { name: "T", color: "bg-yellow-500" },
      ],
      icons: [
        { name: "PDF", link: "/pdf-link", iconPath: "/images/pdf.png" },
        { name: "GitHub", link: "/github-link", iconPath: "/images/git.png" },
      ],
    },
    {
      id: "54321",
      title: "Quantum Computing Research",
      status: "Inactive",
      date: "12-11-2024",
      extractionStatus: "Feedback Needed",
      avatars: [
        { name: "R", color: "bg-pink-500" },
        { name: "D", color: "bg-teal-500" },
      ],
      icons: [
        { name: "Web", link: "/web-link", iconPath: "/images/web.png" },
        { name: "OpenAI", link: "/openai-link", iconPath: "/images/chat.png" },
      ],
    },
    {
      id: "12345",
      title: "Autonomous Vehicle System",
      status: "Active",
      date: "12-11-2024",
      extractionStatus: "Extraction Failed",
      avatars: [
        { name: "E", color: "bg-indigo-500" },
        { name: "F", color: "bg-cyan-500" },
      ],
      icons: [
        { name: "PDF", link: "/pdf-link", iconPath: "/images/pdf.png" },
        { name: "GitHub", link: "/github-link", iconPath: "/images/git.png" },
      ],
    },
    {
      id: "56789",
      title: "Smart Home Automation",
      status: "Inactive",
      date: "12-11-2024",
      extractionStatus: "Extraction in Progress",
      progress: 80,
      avatars: [
        { name: "G", color: "bg-lime-500" },
        { name: "H", color: "bg-amber-500" },
      ],
      icons: [
        { name: "Web", link: "/web-link", iconPath: "/images/web.png" },
        { name: "OpenAI", link: "/openai-link", iconPath: "/images/chat.png" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {cardsData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}