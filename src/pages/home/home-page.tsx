import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div>Home Page</div>
      <Link to="/todos">go to Todos</Link>
    </>
  );
}

export default HomePage;
