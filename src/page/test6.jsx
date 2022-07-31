import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {} from "three/examples/jsm/controls/DragControls";

export class Test6 extends Component {
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
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(innerWidth, innerHeight);
    container.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    function renderer3D() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(renderer3D);
    }
    renderer3D();

    const textureLoader = new THREE.TextureLoader();
    // 加载纹理贴图
    const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
    // doorColorTexture.offset.x = 0.5;
    // doorColorTexture.center.set(0.5, 0.5);
    doorColorTexture.wrapS = THREE.MirroredRepeatWrapping;
    // 把加载的纹理放到材质中去
    const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 10);
    const material = new THREE.MeshBasicMaterial({
      // color: "#ff0000",
      // wireframe: true,
      map: doorColorTexture,
    });
    const mesh = new THREE.Mesh(cubeGeometry, material);
    scene.add(mesh);
    console.log(mesh);
  }
  componentWillUnmount() {}
  render() {
    return <div id="container"></div>;
  }
}

export default Test6;
