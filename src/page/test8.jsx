import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {} from "three/examples/jsm/controls/DragControls";

export class Test8 extends Component {
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

    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(innerWidth, innerHeight);
    // 渲染器开启阴影
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
    const material = new THREE.MeshStandardMaterial({
      // color: "#ff0000",
      metalness: 0,
    });
    const sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.castShadow = true;
    scene.add(sphere);

    const planeGeometry = new THREE.PlaneBufferGeometry(20, 20);
    const material2 = new THREE.MeshStandardMaterial({});
    const plane = new THREE.Mesh(planeGeometry, material2);
    plane.receiveShadow = true;
    scene.add(plane);
    plane.position.y = -1;
    plane.rotateX(-Math.PI / 2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // 平行光
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    // // 光源开启阴影
    // directionalLight.castShadow = true;
    // directionalLight.position.set(10, 10, 10);
    // scene.add(directionalLight);

    // directionalLight.shadow.radius = 20;
    // directionalLight.shadow.mapSize.set(2048, 2048);

    // 聚光灯
    // const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    // spotLight.castShadow = true;
    // spotLight.shadow.mapSize.set(2048, 2048);
    // spotLight.position.set(10, 10, 10);
    // spotLight.angle = Math.PI / 9;
    // scene.add(spotLight);

    // 点光源
    const pointLight = new THREE.PointLight(0xff0000, 1);
    // pointLight.position.set(2, 2, 2);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // 把点光源加入到小球中;
    const smallSphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.1, 20, 20),
      new THREE.MeshBasicMaterial({ color: "#ff0000" })
    );
    smallSphere.position.set(-2, 2, -3);
    smallSphere.add(pointLight);
    scene.add(smallSphere);
    let num = 0;
    function renderer3D() {
      controls.update();
      num += 3;
      let x = Math.sin((num * Math.PI) / 360) * 2;
      let z = Math.cos((num * Math.PI) / 360) * 2;
      let y = 0 + Math.sin((5 * num * Math.PI) / 360) * 2;
      smallSphere.position.set(x, y, z);
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

export default Test8;
