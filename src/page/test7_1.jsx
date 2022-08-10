import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export class Test7_1 extends Component {
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

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(0, 10, 10);
    scene.add(dirLight);
    const rgbeLoader = new RGBELoader();
    rgbeLoader.loadAsync("./textures/hdr/002.hdr").then((texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
      scene.environment = texture;
    });

    const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
    const material = new THREE.MeshStandardMaterial({
      metalness: 0.9,
      roughness: 0.1,
      // envMap: envMapTexture,
    });
    const sphere = new THREE.Mesh(sphereGeometry, material);

    scene.add(sphere);
  }
  componentWillUnmount() {}
  render() {
    return <div id="container"></div>;
  }
}

export default Test7_1;
