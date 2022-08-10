import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
    const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
    const doorAlpheaTexture = textureLoader.load("./textures/door/alpha.jpg");
    const doorAoTexture = textureLoader.load(
      "./textures/door/ambientOcclusion.jpg"
    );
    const heightTexture = textureLoader.load("./textures/door/height.jpg");
    const roughnessTexture = textureLoader.load(
      "./textures/door/roughness.jpg"
    );
    const metalnessTexture = textureLoader.load(
      "./textures/door/metalness.jpg"
    );
    const normalTexture = textureLoader.load("./textures/door/normal.jpg");

    // 把加载的纹理放到材质中去
    const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 100, 100, 100);
    const basicMaterial = new THREE.MeshStandardMaterial({
      map: doorColorTexture,
      transparent: true,
      alphaMap: doorAlpheaTexture,
      aoMap: doorAoTexture,
      aoMapIntensity: 0.5,
      side: THREE.DoubleSide,
      displacementMap: heightTexture,
      displacementScale: 0.1,
      // roughness: 0,
      roughnessMap: roughnessTexture,
      metalness: 1,
      metalnessMap: metalnessTexture,
      normalMap: normalTexture,
    });
    const mesh = new THREE.Mesh(cubeGeometry, basicMaterial);
    cubeGeometry.setAttribute(
      "uv2",
      new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
    );
    scene.add(mesh);

    const planeGeometry = new THREE.PlaneBufferGeometry(1, 1);
    const plane = new THREE.Mesh(planeGeometry, basicMaterial);
    plane.position.set(3, 0, 0);
    scene.add(plane);
    planeGeometry.setAttribute(
      "uv2",
      new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
    );

    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(0, 10, 10);
    scene.add(dirLight);
    console.log(mesh);
  }
  componentWillUnmount() {}
  render() {
    return <div id="container"></div>;
  }
}

export default Test6;
