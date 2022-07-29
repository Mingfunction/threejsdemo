import "./App.css";
import { Link, Navigate, useRoutes } from "react-router-dom";

const requireApi = require.context("./page", true, /\.jsx?$/);
// console.log(requireApi.keys());
const fileArr = requireApi.keys().map(requireApi);
// console.log(fileArr);
console.log(fileArr[0].default.name);

const navList = fileArr.map((Item) => {
  return {
    title: Item.default.name,
    to: "/" + Item.default.name,
    blogUrl: "",
  };
});

function App() {
  const router = [
    {
      path: "/",
      element: <Navigate to={"/test1"}></Navigate>,
    },
    ...fileArr.map((Item) => {
      return {
        path: "/" + Item.default.name,
        // eslint-disable-next-line react/jsx-pascal-case
        element: <Item.default></Item.default>,
      };
    }),
  ];

  const element = useRoutes(router);

  return (
    <div className="App">
      <div className="nav">
        <ul>
          {navList.map((item, i) => (
            <li key={i}>
              <Link to={item.to}>{item.title}</Link>
              &nbsp;&nbsp;
              <a href={item.blogUrl} target="_blank" rel="noreferrer">
                blog
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="element">{element}</div>
    </div>
  );
}

export default App;
