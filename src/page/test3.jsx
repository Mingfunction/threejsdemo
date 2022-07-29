import React, { Component } from "react";

import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";
// import { color } from "dat.gui";

export class Test3 extends Component {
  state = {
    gui: null,
  };
  componentDidMount() {
    let container = document.getElementById("container");
    console.log(container);
    let innerHeight = container.clientHeight;
    let innerWidth = container.clientWidth;
    console.log(innerHeight);
    console.log(innerWidth);

    // 目标：掌握轻量级图形界面

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
    const cubeMaterial = new THREE.MeshBasicMaterial({});
    // 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    const geometry = new THREE.SphereGeometry(2.5, 32, 16);
    const material = new THREE.MeshBasicMaterial({
      // transparent: true,
      wireframe: true, // 将几何图形渲染为线框
      // opacity: 0,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(5, 0, 0);
    scene.add(sphere);
    // 修改物体的位置
    // cube.position.set(5, 0, 0);
    // cube.position.x = 3;
    // 缩放
    // cube.scale.set(3, 2, 1);
    cube.scale.x = 5;
    // 旋转
    // cube.rotation.set(Math.PI / 4, 0, 0, "XZY");

    console.log(cube);
    // 将几何体添加到场景中
    scene.add(cube);
    const gui = new dat.GUI();
    this.setState({
      gui,
    });
    gui
      .add(cube.position, "x")
      .min(0)
      .max(5)
      .step(0.01)
      .name("移动x轴")
      .onChange((value) => {
        console.log("值被修改：", value);
      })
      .onFinishChange((value) => {
        console.log("完全停下来:", value);
      });
    //   修改物体的颜色
    const params = {
      color: "#ffff00",
      fn: () => {
        //   让立方体运动起来
        gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 });
      },
    };
    gui.addColor(params, "color").onChange((value) => {
      console.log("值被修改：", value);
      cube.material.color.set(value);
    });
    // 设置选项框
    gui.add(cube, "visible").name("是否显示");

    var folder = gui.addFolder("设置立方体");
    folder.add(cube.material, "wireframe");
    // 设置按钮点击触发某个事件
    folder.add(params, "fn").name("立方体运动");

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer();
    // 设置渲染的尺寸大小
    renderer.setSize(innerWidth, innerHeight);
    // console.log(renderer);
    // 将webgl渲染的canvas内容添加到body
    container.appendChild(renderer.domElement);

    // // 使用渲染器，通过相机将场景渲染进来
    // renderer.render(scene, camera);

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
    controls.enableDamping = true;

    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    // 设置时钟
    // const clock = new THREE.Clock();

    window.addEventListener("dblclick", () => {
      const fullScreenElement = document.fullscreenElement;
      if (!fullScreenElement) {
        //   双击控制屏幕进入全屏，退出全屏
        // 让画布对象全屏
        renderer.domElement.requestFullscreen();
      } else {
        //   退出全屏，使用document对象
        document.exitFullscreen();
      }
      //   console.log(fullScreenElement);
    });

    function render() {
      controls.update();
      renderer.render(scene, camera);
      //   渲染下一帧的时候就会调用render函数
      requestAnimationFrame(render);
    }

    render();

    // 监听画面变化，更新渲染画面
    window.addEventListener("resize", () => {
      //   console.log("画面变化了");
      // 更新摄像头
      camera.aspect = innerWidth / innerHeight;
      //   更新摄像机的投影矩阵
      camera.updateProjectionMatrix();

      //   更新渲染器
      renderer.setSize(innerWidth, innerHeight);
      //   设置渲染器的像素比
      renderer.setPixelRatio(window.devicePixelRatio);
    });
  }
  componentWillUnmount() {
    this.state.gui.destroy();
  }
  render() {
    return <div id="container"></div>;
  }
}

export default Test3;
