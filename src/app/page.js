"use client";

import { useState, useRef } from "react";

export default function App() {

  const [tab, setTab] = useState(0);
  const touchStart = useRef(null);

  const initialDevices = [{ name: "Ring Alpha", active: true, online: true }];
  const initialChat = [{ role: "ai", text: "🛡️ Sistema attivo." }];

  const [devices, setDevices] = useState(initialDevices);
  const [newDevice, setNewDevice] = useState("");

  const [tracking, setTracking] = useState(true);
  const battery = 92;
  const [status, setStatus] = useState("Protetto");

  const lat = 37.0557;
  const lng = 15.3015;

  const [chat, setChat] = useState(initialChat);
  const [input, setInput] = useState("");

  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [username, setUsername] = useState("Utente");

  const [silentMode, setSilentMode] = useState(false);
  const [ecoMode, setEcoMode] = useState(false);
  const [secureMode, setSecureMode] = useState(false);

  // SWIPE
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 50 && tab < 2) setTab(t => t + 1);
    if (diff < -50 && tab > 0) setTab(t => t - 1);
  };

  // CHAT
const sendMessage = () => {
  if (!input) return;

  const text = input.toLowerCase();
  let reply = "";

  // 📍 POSIZIONE
  if (
    text.includes("anello") ||
    text.includes("dove") ||
    text.includes("posizione") ||
    text.includes("trova")
  ) {
    reply = `📍 Il tuo dispositivo si trova vicino al Castello Maniace (Siracusa).
Coordinate: ${lat}, ${lng}`;
  }

  // 🆘 ASSISTENZA
  else if (
    text.includes("assistenza") ||
    text.includes("supporto") ||
    text.includes("aiuto") ||
    text.includes("contatto")
  ) {
    reply = "📩 Per assistenza puoi contattare: support@securing.com";
  }

  // 🔋 BATTERIA
  else if (text.includes("batteria")) {
    reply = `🔋 La batteria attuale è al ${battery}%`;
  }

  // 📱 DISPOSITIVI
  else if (text.includes("dispositivi")) {
    reply = `📱 Hai ${devices.length} dispositivi collegati e attivi.`;
  }

  // 📡 TRACKING
  else if (text.includes("tracking")) {
    reply = tracking
      ? "📡 Il tracking è attivo e funzionante."
      : "📡 Il tracking è attualmente disattivato.";
  }

  // 🛡️ SICUREZZA
  else if (text.includes("sicurezza") || text.includes("stato")) {
    reply = `🛡️ Stato del sistema: ${status}`;
  }

  // 👤 UTENTE
  else if (text.includes("nome") || text.includes("utente")) {
    reply = `👤 Sei registrato come: ${username}`;
  }

  // 🤖 DEFAULT (PIÙ NATURALE)
  else {
    const risposte = [
      "🤖 Tutto funziona correttamente.",
      "📡 Sto monitorando il sistema in tempo reale.",
      "🛡️ Non rilevo problemi al momento.",
      "✔️ Sistema stabile e operativo."
    ];
    reply = risposte[Math.floor(Math.random() * risposte.length)];
  }

  setChat(prev => [
    ...prev,
    { role: "user", text: input },
    { role: "ai", text: reply }
  ]);

  setInput("");
};

  const addDevice = () => {
    if (!newDevice) return;
    setDevices(prev => [...prev, { name: newDevice, active: true, online: true }]);
    setNewDevice("");
  };

  const removeDevice = (i) => {
    setDevices(prev => prev.filter((_, index) => index !== i));
  };

  const toggleDevice = (i) => {
    setDevices(prev => {
      const copy = [...prev];
      copy[i].active = !copy[i].active;
      return copy;
    });
  };

  // 🔴 RESET COMPLETO MIGLIORATO
  const resetApp = () => {
    setDevices(initialDevices);
    setNewDevice("");

    setTracking(true);
    setStatus("Protetto");

    setChat(initialChat);
    setInput("");

    setUsername("Utente");

    setDarkMode(false);
    setNotificationsEnabled(true);
    setVibration(true);

    setSilentMode(false);
    setEcoMode(false);
    setSecureMode(false);

    setTab(0); // torna alla home
  };

  const theme = darkMode ? "bg-black text-white" : "bg-gray-100 text-black";
  const card = darkMode ? "bg-gray-800" : "bg-gray-100";

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme}`}>

      <div
        className={`w-[380px] h-[700px] rounded-3xl shadow-xl p-4 flex flex-col justify-between ${darkMode ? "bg-gray-900" : "bg-white"}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        <div className="flex-1 overflow-y-auto space-y-4">

          <h1 className="text-xl font-semibold text-blue-600">SECURING</h1>

          {/* HOME */}
          {tab === 0 && (
            <>
              <div className={`${card} p-4 rounded-2xl flex justify-between`}>
                <div>
                  <p>Batteria</p>
                  <h2>{battery}%</h2>
                </div>
                <Toggle value={tracking} onClick={()=>setTracking(!tracking)} />
              </div>

              <div className={`${card} p-4 rounded-2xl`}>
                Stato: {status}
              </div>

              <iframe
                src={`https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
                className="w-full h-32 rounded-2xl"
              />

              <button className="w-full bg-red-600 text-white p-3 rounded-2xl">
                🚨 SOS
              </button>

              <div className={`${card} p-3 rounded-2xl`}>
                <div className="h-24 overflow-y-auto text-sm mb-2">
                  {chat.map((m,i)=><div key={i}>{m.text}</div>)}
                </div>

                <div className="flex gap-2">
                  <input
                    placeholder="Scrivi..."
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                    className="flex-1 p-2 rounded-xl border"
                  />
                  <button onClick={sendMessage} className="bg-blue-600 text-white px-3 rounded-xl">➤</button>
                </div>
              </div>
            </>
          )}

          {/* DEVICES */}
          {tab === 1 && (
            <>
              {devices.map((d,i)=>(
                <div key={i} className={`${card} p-3 rounded-2xl flex justify-between`}>
                  <div>
                    {d.name}
                    <p className="text-xs">{d.online ? "🟢 Online" : "🔴 Offline"}</p>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={()=>toggleDevice(i)} className="bg-blue-600 text-white px-2 rounded">
                      {d.active ? "ON" : "OFF"}
                    </button>
                    <button onClick={()=>removeDevice(i)}>❌</button>
                  </div>
                </div>
              ))}

              <div className="flex gap-2">
                <input value={newDevice} onChange={(e)=>setNewDevice(e.target.value)} className="flex-1 p-2 rounded-xl border"/>
                <button onClick={addDevice} className="bg-blue-600 text-white px-3 rounded-xl">+</button>
              </div>
            </>
          )}

          {/* SETTINGS */}
          {tab === 2 && (
            <>
              <input value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full p-2 rounded-xl border"/>

              <Row label="Dark Mode"><Toggle value={darkMode} onClick={()=>setDarkMode(!darkMode)} /></Row>
              <Row label="Tracking"><Toggle value={tracking} onClick={()=>setTracking(!tracking)} /></Row>
              <Row label="Notifiche"><Toggle value={notificationsEnabled} onClick={()=>setNotificationsEnabled(!notificationsEnabled)} /></Row>
              <Row label="Vibrazione"><Toggle value={vibration} onClick={()=>setVibration(!vibration)} /></Row>

              <Row label="Silenzioso"><Toggle value={silentMode} onClick={()=>setSilentMode(!silentMode)} /></Row>
              <Row label="Risparmio"><Toggle value={ecoMode} onClick={()=>setEcoMode(!ecoMode)} /></Row>
              <Row label="Sicurezza"><Toggle value={secureMode} onClick={()=>setSecureMode(!secureMode)} /></Row>

              <button onClick={resetApp} className="w-full bg-red-600 text-white p-3 rounded-2xl">
                Reset sistema
              </button>
            </>
          )}

        </div>

        {/* NAV */}
        <div className="flex justify-around mt-2">
          <Nav icon="🏠" active={tab===0} onClick={()=>setTab(0)} />
          <Nav icon="➕" active={tab===1} onClick={()=>setTab(1)} />
          <Nav icon="⚙️" active={tab===2} onClick={()=>setTab(2)} />
        </div>

      </div>
    </div>
  );
}

// UI
function Toggle({ value, onClick }) {
  return (
    <div onClick={onClick} className={`w-10 h-5 flex items-center rounded-full p-1 ${value ? "bg-blue-600" : "bg-gray-400"}`}>
      <div className={`bg-white w-4 h-4 rounded-full ${value ? "translate-x-5" : ""}`} />
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      {children}
    </div>
  );
}

function Nav({ icon, active, onClick }) {
  return (
    <button onClick={onClick} className={`w-12 h-12 rounded-full ${active ? "bg-blue-600 text-white" : "bg-gray-300"}`}>
      {icon}
    </button>
  );
}