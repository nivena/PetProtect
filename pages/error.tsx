import { NextPageContext } from "next";

function Error({ statusCode }: { statusCode: number }) {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>⚠️ {statusCode} - An Error Occurred</h1>
      <p>Sorry, something went wrong. Please try again later.</p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
