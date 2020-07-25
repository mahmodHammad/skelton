import React from "react";
import skelton from "../variables/skelton";
export default function Sidebar() {
  return (
    <div id="sidebar" className="sidebar">
      <ul className="sidebar-list">
        {skelton.map((s) => (
          <li onClick={e=>console.log(e.target.id)} id={s.id}>{s.label}</li>
        ))}
      </ul>

      <button id="toggle"> > </button>
    </div>
  );
}
