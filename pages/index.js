import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { checkUser, signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/RegisterForm';

function Home() {
  const { user } = useAuth();
  const [checkedUser, setCheckedUser] = useState();

  // const chckUser = () => {
  //   checkUser(user.uid).then((data) => {
  //     console.log('testing log data', data);
  //     setCheckedUser(data);
  //   });
  // };

  // useEffect(() => {
  //   chckUser();
  // }, []);

  // // Log the updated value of checkedUser after the state update
  // useEffect(() => {
  //   console.log('this is the user:', checkedUser);
  // }, [checkedUser]); // Only runs when checkedUser changes

  useEffect(() => {
    checkUser(user.uid).then((data) => setCheckedUser(data));
  }, []);

  return (
    <>
      {checkedUser?.fBkey === user?.uid ? (
        <div
          className="text-center d-flex flex-column justify-content-center align-content-center"
          style={{
            height: '90vh',
            padding: '30px',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <h1>Hello {user.fbUser.displayName}! </h1>
          <p>Your Bio: {user.bio}</p>
          <p>Click the button below to logout!</p>
          <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      ) : (<RegisterForm user={user} updateUser={() => {}} />)}
    </>
  );
}

export default Home;
