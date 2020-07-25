import React, { useState } from "react";
import skelton from "../variables/skelton";
export default function Sidebar() {
  const [sideToggle, setsideToggle] = useState(true);
  const [bottomToggle, setbottomToggle] = useState(true);
  return (
    <div>
      <div id="sidebar" className={`sidebar ${sideToggle ? "openSB" : ""}`}>
        <ul className="sidebar-list">
          {skelton.map((s) => (
            <li onClick={(e) => console.log(e.target.id)} id={s.id}>
              {s.label}
            </li>
          ))}
        </ul>

        <button
          className={`Toggle  ${sideToggle?"rotateSideToggle":""}`}
          id="sideToggle"
          onClick={() => setsideToggle(!sideToggle)}
        >
          {"<"}
        </button>
      </div>
      <div className={`bottombar ${bottomToggle? "openBB" : ""}`}>
        <button
          className={`Toggle ${bottomToggle?"rotateBottomToggle":""}`}
          id="bottomToggle"
          onClick={() => setbottomToggle(!bottomToggle)}
        >
        {">"}
        </button>
          Hello world my name is Mahmoud Hammad i'am 21 years old
      </div>
    </div>
  );
}
