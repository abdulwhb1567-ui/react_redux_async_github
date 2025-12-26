import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from './features/user/userSlice.js';
import { useGetUserByUsernameQuery } from './features/github/githubApi.js';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.user);

  const { data: rtkData, error: rtkError, isLoading: rtkLoading } = useGetUserByUsernameQuery(username, {
    skip: !username,
  });

  const handleFetchWithThunk = () => {
    if (username) {
      dispatch(fetchUserProfile(username));
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Profile App</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleFetchWithThunk}>Fetch with Redux Thunk</button>

      <h2>Using Redux Thunk</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {profile && (
        <div>
          <img src={profile.avatar_url} alt={profile.login} width="100" />
          <h3>{profile.name}</h3>
          <p>{profile.bio}</p>
          <p>Followers: {profile.followers}</p>
        </div>
      )}

      <h2>Using RTK Query</h2>
      {rtkLoading && <p>Loading...</p>}
      {rtkError && <p>Error: {rtkError.message}</p>}
      {rtkData && (
        <div>
          <img src={rtkData.avatar_url} alt={rtkData.login} width="100" />
          <h3>{rtkData.name}</h3>
          <p>{rtkData.bio}</p>
          <p>Followers: {rtkData.followers}</p>
        </div>
      )}
    </div>
  );
}

export default App;
