import { useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedProps {
  Component: any
}

const Protected: FC<ProtectedProps> = ({ Component }) => {
  const Islogin = sessionStorage.getItem('token')
  const nevigate = useNavigate()
  // console.log(Islogin)
  useEffect(() => {
    if (!Islogin) {
      nevigate('/')
    }
    // eslint-disable-next-line
  }, [Islogin])

  return (
    <>
      <div>
        {Component}
      </div>
    </>
  );
}

export default Protected;

