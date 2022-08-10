import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {} from "three/examples/jsm/controls/DragControls";

export class Test9 extends Component {
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
    camera.position.set(0, 5, 5);

    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(innerWidth, innerHeight);
    // 渲染器开启阴影
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    function renderer3D() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(renderer3D);
    }
    renderer3D();

    const textureLoader = new THREE.TextureLoader();
    const pointTexture = textureLoader.load("./textures/particles/2.png");
    //创建球几何体
    const sphereGeometry = new THREE.SphereBufferGeometry(2, 20, 20);
    const pointMaterial = new THREE.PointsMaterial({
      color: "#ff0000",
      map: pointTexture,
      transparent: true,
      alphaMap: pointTexture,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    pointMaterial.size = 0.1;
    // pointMaterial.map = pointTexture;
    // pointMaterial.sizeAttenuation = false;
    const points = new THREE.Points(sphereGeometry, pointMaterial);

    scene.add(points);
  }
  componentWillUnmount() {}
  render() {
    return <div id="container"></div>;
  }
}

export default Test9;
