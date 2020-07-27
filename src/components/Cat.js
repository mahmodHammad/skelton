import React, { Component } from "react";

import { sceneSetup, controls } from "./setup";
import { addCustomSceneObjects } from "./SceneObjects";
import { startAnimationLoop, requestID } from "./Animate";

class Cat extends Component {
  componentDidMount() {
    sceneSetup();
    addCustomSceneObjects();
    startAnimationLoop();
  }

  // clean up to prevent memory leak
  componentWillUnmount() {
    window.cancelAnimationFrame(requestID);
    controls.dispose();
  }

  render() {
    return <div id="three" />;
  }
}

export { Cat };
