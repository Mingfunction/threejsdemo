import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Test2 extends Component {
  componentDidMount() {
    let container = document.getElementById("container");
    console.log(container);
    let innerHeight = container.clientHeight;
    let innerWidth = container.clientWidth;
    console.log(innerHeight);
    console.log(innerWidth);

    // 1、创建场景
    const scene = new THREE.Scene();

    // 2、创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.1,
      1000
    );

    // 设置相机位置
    camera.position.set(0, 0, 10);
    scene.add(camera);

    // 添加物体
    // 创建几何体
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // 将几何体添加到场景中
    scene.add(cube);
    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer();
    // 设置渲染的尺寸大小
    renderer.setSize(innerWidth, innerHeight);
    // console.log(renderer);
    // 将webgl渲染的canvas内容添加到body
    container.appendChild(renderer.domElement);

    // 使用渲染器，通过相机将场景渲染进来
    new OrbitControls(camera, renderer.domElement);

    function render() {
      cube.position.x += 0.01;
      if (cube.position.x > 5) {
        cube.position.x = 0;
      }
      renderer.render(scene, camera);
      //   渲染下一帧的时候就会调用render函数
      requestAnimationFrame(render);
    }
    render();
  }

  render() {
    return <div id="container"></div>;
  }
}

export default Test2;
