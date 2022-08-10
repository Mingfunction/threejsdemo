import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {} from "three/examples/jsm/controls/DragControls";

export class Test10 extends Component {
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
    const pointTexture = textureLoader.load("./textures/particles/1.png");
    //创建球几何体

    const geometry = new THREE.BufferGeometry();
    const num = 5004;
    const floatArray = new Float32Array(num);
    const colorArray = new Float32Array(num);
    for (let index = 0; index < num; index++) {
      floatArray[index] = Math.random() * 100 - 50;
      colorArray[index] = Math.random();
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(floatArray, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    const pointMaterial = new THREE.PointsMaterial({
      // color: "#ff0000",
      map: pointTexture,
      transparent: true,
      alphaMap: pointTexture,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      // 启用顶点颜色设置
      vertexColors: true,
    });
    pointMaterial.vertexColors = true;
    pointMaterial.size = 1;
    const points = new THREE.Points(geometry, pointMaterial);

    scene.add(points);
  }
  componentWillUnmount() {}
  render() {
    return <div id="container"></div>;
  }
}

export default Test10;
