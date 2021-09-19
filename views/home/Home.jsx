import Link from 'next/link';

import { useAuth } from '../../hooks';

const Home = () => {
  const { currentUser, isLoading, logout } = useAuth();

  return (
    <main>
      <div>Hello {currentUser?.fullName}</div>
      {!currentUser && (
        <Link href='/auth'>
          <a>Login</a>
        </Link>
      )}
      {/* <ul>
      {data?.length &&
        data.map((c) => (
          <li key={c.id}>
            {c.id} : level - {c.level}
          </li>
        ))}
    </ul> */}
      {currentUser && <button onClick={logout}>Logout</button>}
    </main>
  );
};

export default Home;
