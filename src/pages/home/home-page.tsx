import { Link } from "react-router-dom";

  return (
    <>
      <div>Home Page</div>
      <PrimaryButton color="primary" onClick={handleClick} disabled={disabled} >Go to Todos</PrimaryButton>
    </>
  );
}

export default HomePage;
