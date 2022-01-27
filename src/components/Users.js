import { useState, useEffect } from 'react';
import axios from 'axios';

import User from './User';

function Users(props) {
  const [users, setUsers] = useState([]);
  const [edits, setEdits] = useState({});
  const [editingUser, setEditingUser] = useState(null);

  // TODO: Move url to a settings location or env variable?
  const backendUrl = 'https://arcane-plateau-58687.herokuapp.com';

  // On initial mount
  useEffect(() => {
    // IIFE to make it async
    (async () => {
      try {
        const response = await axios.get(`${backendUrl}/users`);
        setUsers(response.data);
      } catch (error) {
        // TODO: Handle errors for user
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Change editing user state if no other editing is happening
  function handleRowClick(userID) {
    if (!editingUser) {
      setEditingUser(userID);
      const userToEdit = users.find((user) => user._id === userID);
      setEdits({ ...userToEdit });
    } // else do nothing
  }

  function handleChange(e) {
    setEdits({ ...edits, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(edits);
    axios.put(`${backendUrl}/users/${edits._id}`);
  }

  return (
    <div>
      <div className='settings-users'>
        <h3>Manage Users</h3>
        <form id='edit-users' action='' onSubmit={handleSubmit}>
          <table className='users-table'>
            <thead>
              {/* Render the <th></th> from User component so that all logic for table columns lives in User.js */}
              <User user='header' />
            </thead>
            <tbody>
              {users.map((user) => (
                <User
                  key={user._id}
                  user={user}
                  editingUser={editingUser}
                  edits={edits}
                  handleRowClick={handleRowClick}
                  handleChange={handleChange}
                />
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default Users;
