import React, { Component } from "react";

export class Test12 extends Component {
  state = {
    gui: null,
  };
  componentDidMount() {
    const canvas = document.getElementById("canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    // 创建webgl上下文
    let gl = canvas.getContext("webgl");
    console.log(gl);
    // 第一次创建webgl绘图上下文需要设置视大小
    gl.viewport(0, 0, canvas.width, canvas.height);

    // 创建顶点着色器
    // gl.createShader 创建着色器 参数 是告诉gl要创建什么着色器
    // gl.VERTEX_SHADER 是顶点着色器的标识
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);

    // 创建顶点着色器的源码
    /*
      参数的属性传进来 
      类型为vec4 的 a_Position 值
      转化为屏幕的坐标
    */
    gl.shaderSource(
      vertexShader,
      `
      attribute vec4 a_Position;
      void main(){
          gl_Position = a_Position;
      }
    `
    );
    // 编译顶点着色器
    gl.compileShader(vertexShader);

    // 编写片元着色器
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(
      fragmentShader,
      `
      void main(){
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
      }
    `
    );
    // 编译片元着色器
    gl.compileShader(fragmentShader);

    // 顶点和着色器都创建完毕好了 需要程序连接起来
    let program = gl.createProgram();

    // 连接顶点着色器和片元着色器
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // 连接程序
    gl.linkProgram(program);

    // 使用程序渲染
    gl.useProgram(program);

    // 传递数据上面说了在内部有 a_Position 所以需要传递数据
    let vertexBuffer = gl.createBuffer();
    // 绑定顶点缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 向顶点缓冲区对象中写入数据
    let vertices = new Float32Array([
      0.0, 0.5,

      -0.5, -0.5,

      0.5, 0.5,
    ]);

    // gl.STATIC_DRAW 标识数据不会变 gl.DYNAMIC_DRAW 标识数据会变
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // 获取顶点数据着色器的 a_Position 变量的位置
    let a_Position = gl.getAttribLocation(program, "a_Position");

    // 2个值做为一组数据 分配给 a_Position
    // 告诉opengl如何解析数据
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // 启用 a_Position 变量
    gl.enableVertexAttribArray(a_Position);

    // 画之前 清楚canvas
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div id="container">
        <canvas id="canvas" style={{ width: "100%", height: "100%" }}></canvas>
      </div>
    );
  }
}

export default Test12;
