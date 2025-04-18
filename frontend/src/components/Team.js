import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Team.css';
import { useNavigate } from 'react-router-dom';

function Team() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [editingPlayer, setEditingPlayer] = useState(null);
  const navigate = useNavigate();

  const fetchPlayers = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/players', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPlayers(res.data);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (editingPlayer) {
      await axios.put(`http://localhost:5000/api/players/${editingPlayer._id}`, { name, position }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingPlayer(null);
    } else {
      await axios.post('http://localhost:5000/api/players', { name, position }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    setName('');
    setPosition('');
    fetchPlayers();
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
    setName(player.name);
    setPosition(player.position);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/players/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchPlayers();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="team-container">
      <h2>Team Manager</h2>
      <form className="player-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Player Name" value={name} onChange={(e) => setName(e.target.value)} className="player-input" />
        <input type="text" placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} className="player-input" />
        <button type="submit" className="submit-button">{editingPlayer ? 'Update' : 'Add'} Player</button>
      </form>

      <div className="players-list">
        {players.map((player) => (
          <div key={player._id} className="player-item">
            <h3>{player.name}</h3>
            <p>{player.position}</p>
            <div className="button-group">
              <button onClick={() => handleEdit(player)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(player._id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Team;
