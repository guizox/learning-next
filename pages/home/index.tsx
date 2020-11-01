import { GetStaticProps } from "next";

const Jonas = () => {
  return <div>teste</div>;
};

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items = [1, 2, 3];
  return { props: { items } };
};

export default Jonas;
