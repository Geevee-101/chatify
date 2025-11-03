import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore()
  return <div className="tabs bg-transparent w-full p-4">
    <button onClick={() => setActiveTab("chats")} className={`tab flex-1 ${activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400 rounded-md" : "text-slate-400"}`}>
      Chats
    </button>
    <button onClick={() => setActiveTab("contacts")} className={`tab flex-1 ${activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-400 rounded-md" : "text-slate-400"}`}>
      Contacts
    </button>
  </div>
}

export default ActiveTabSwitch;