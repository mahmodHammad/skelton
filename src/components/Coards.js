
import * as THREE from "three";
import { scene } from "./setup";

function displayCoards() {
    // x red
    // y green
    // z blue
  
    function createCoord(x, y, z, color) {
      const points = [];
      points.push(new THREE.Vector3(0, 0, 0));
      points.push(new THREE.Vector3(100 * x, 100 * y, 100 * z));
      const material = new THREE.LineBasicMaterial({ color });
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      scene.add(line);
    }
  
    createCoord(1, 0, 0, 0xff0000);
    createCoord(0, 1, 0, 0x00ff00);
    createCoord(0, 0, 1, 0x0000ff);
  }
  
  export{displayCoards}