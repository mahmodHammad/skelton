import React,{useState} from "react";
import skelton from "../variables/skelton";
export default function Sidebar() {
    const [toggle, settoggle] = useState(true)
  return (
    <div id="sidebar" className={`sidebar ${toggle?"openSB":"closeSB"}`}>
      <ul className="sidebar-list">
        {skelton.map((s) => (
          <li onClick={e=>console.log(e.target.id)} id={s.id}>{s.label}</li>
        ))}
      </ul>

      <button id="toggle" onClick={()=>settoggle(!toggle)}> {toggle? ">" : "<"} </button>
    </div>
  );
}
