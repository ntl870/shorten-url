import { GetServerSideProps, NextPage, GetServerSidePropsContext } from 'next'

const RedirectUrl: NextPage = () => {
  return <></>
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const { url } = context.query
    const res = await fetch(`http://localhost:4000/v1/url?url=${url}`)
    const { success, realUrl, message = '' } = await res.json()
    if (success) {
      return {
        redirect: {
          destination: `https://${realUrl}`,
          permanent: true
        },
        props: {
          redirectUrl: realUrl
        }
      }
    }
    throw new Error(message)
  } catch (e) {
    return {
      props: {},
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }
}

export default RedirectUrl
