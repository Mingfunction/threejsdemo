import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export class Test6_1 extends Component {
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
    camera.position.set(0, 3, 3);
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
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
    const texture = textureLoader.load("./textures/minecraft.png");
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    // 把加载的纹理放到材质中去
    const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
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

export default Test6_1;
