import * as THREE from "three";
import { scene, render } from "./setup";
import fonter from "three/examples/fonts/gentilis_regular.typeface.json"
console.log(fonter,"XXXXX")
const fontLoader = new THREE.FontLoader();

function createPoles(){


const loadedfont = fontLoader.parse(fonter)
 
  var textMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xd4af37,
  });
//   console.log(font)

  const fontAttributes = {
    font: loadedfont,
    size: 3,
    height: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelOffset: 0,
    bevelSegments: 5,
  };

  function ceatePole(name, x, y, z) {
    const geometry = new THREE.TextGeometry(name, fontAttributes);
    const pole = new THREE.Mesh(geometry, textMaterial);
    pole.castShadow = true;
    pole.receiveShadow = true;

    pole.translateX(32 * x + 2);
    pole.translateY(30 * y);
    pole.translateZ(30 * z - 2);
    pole.rotateX(1.5 * Math.PI);
    pole.rotateZ(Math.PI);
    return pole;
  }
  const north = ceatePole("N", 0, 0, 1);
  const east = ceatePole("E", -1, 0, 0);
  const west = ceatePole("W", 1, 0, 0);
  const south = ceatePole("S", 0, 0, -1);

  scene.add(north);
  scene.add(east);
  scene.add(west);
  scene.add(south);
  render();

}

export {createPoles}