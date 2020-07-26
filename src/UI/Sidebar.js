import React, { useState } from "react";
import skelton from "../variables/skelton";
import { handleItemClick } from "../components/Model";
export default function Sidebar() {
  const [sideToggle, setsideToggle] = useState(false);
  const [bottomToggle, setbottomToggle] = useState(true);
  const [description, setdescription] = useState(
    "The Human Body, <<< Select an element from the sidebar to see more information about it >>> "
  );
  function handleSidebarItemClick(e) {
    const targetID = e.target.id;
    const target = skelton.find((s) => s.id === targetID);
    setdescription(target.description)
    setbottomToggle(false)
    handleItemClick(target);
  }
  return (
    <div>
      <div id="sidebar" className={`sidebar ${sideToggle ? "openSB" : ""}`}>
        <ul className="sidebar-list">
          {skelton.map((s) => (
            <li onClick={handleSidebarItemClick} id={s.id}>
              {s.label}
            </li>
          ))}
        </ul>

        <button
          className={`Toggle  ${sideToggle ? "rotateSideToggle" : ""}`}
          id="sideToggle"
          onClick={() => setsideToggle(!sideToggle)}
        >
          {"<"}
        </button>
      </div>
      <div className={`bottombar ${bottomToggle ? "openBB" : ""}`}>
        <button
          className={`Toggle ${bottomToggle ? "rotateBottomToggle" : ""}`}
          id="bottomToggle"
          onClick={() => setbottomToggle(!bottomToggle)}
        >
          {"<"}
        </button>
        {description}
      </div>
    </div>
  );
}
