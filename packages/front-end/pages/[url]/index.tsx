import { GetServerSideProps, NextPage, GetServerSidePropsContext } from "next";

const RedirectUrl: NextPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { url } = context.query;
    const res = await fetch(`http://localhost:4000/v1/url?url=${url}`);
    const data = await res.json();
    if (data.success) {
      return {
        redirect: {
          destination: `${data.realUrl}`,
          permanent: false,
        },
        props: {
          redirectUrl: data.realUrl,
        },
      };
    }
    throw new Error();
  } catch (e) {
    return {
      props: {},
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};

export default RedirectUrl;
