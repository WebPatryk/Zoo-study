// pages/protected.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProtectedPage = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  return (
    <div>
      <h1>Protected Page</h1>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const response = await fetch('/api/auth/user', {
      headers: {
        Authorization: `Bearer ${context.req.cookies.token}`
      }
    });

    const user = await response.data;
    return {
      props: { user }
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
}

export default ProtectedPage;
