import React, { Component } from "react";
import * as THREE from "three";
import Stats from "stats-js";

import { sceneSetup, scene, render, controls, camera } from "./setup";
const stats = new Stats();

class Cat extends Component {
  addCustomSceneObjects = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true,
    });
    this.cube = new THREE.Mesh(geometry, material);
    scene.add(this.cube);

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);
  };

  startAnimationLoop = () => {
    stats.begin();
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    render();
    stats.end();
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  componentDidMount() {
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
    sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
  }

  // clean up
  componentWillUnmount() {
    window.cancelAnimationFrame(this.requestID);
    controls.dispose();
  }
  // let themount =
  render() {
    return <div id="three" />;
  }
}

export { Cat };
