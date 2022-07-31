import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {} from "three/examples/jsm/controls/DragControls";

export class Test7 extends Component {
  state = {
    gui: null,
  };
  componentDidMount() {
    let container = document.getElementById("container");
    console.log(container);
    let innerHeight = container.clientHeight;
    let innerWidth = container.clientWidth;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.1,
      1000
    );
    scene.add(camera);
    camera.position.set(0, 5, 10);

    const box = new THREE.Box3();

    const helper = new THREE.Box3Helper(box, 0xffff00);
    scene.add(helper);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(innerWidth, innerHeight);
    container.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    let x = 2;
    let y = 0;
    let Z = 0;
    function renderer3D() {
      controls.update();
      // box.setFromCenterAndSize(
      //   new THREE.Vector3((y -= 0.005), 0, 0),
      //   new THREE.Vector3((x += 0.01), 3, 4)
      // );
      renderer.render(scene, camera);
      requestAnimationFrame(renderer3D);
    }
    renderer3D();
  }
  componentWillUnmount() {}
  render() {
    return <div id="container"></div>;
  }
}

export default Test7;
