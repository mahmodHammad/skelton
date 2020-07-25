import React, { useState } from "react";
import skelton from "../variables/skelton";
import {handleItemClick} from "../components/Model"
export default function Sidebar() {
  const [sideToggle, setsideToggle] = useState(false);
  const [bottomToggle, setbottomToggle] = useState(true);
  return (
    <div>
      <div id="sidebar" className={`sidebar ${sideToggle ? "openSB" : ""}`}>
        <ul className="sidebar-list">
          {skelton.map((s) => (
            <li onClick={handleItemClick} id={s.id}>
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
