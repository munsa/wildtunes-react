import React from 'react';
import PropTypes from 'prop-types';

const SongTable = ({songs}) => {

  function openSpotifyTrackLink(spotifyTrackId) {
    let win = window.open('https://open.spotify.com/track/' + spotifyTrackId, '_blank');
    win.focus();
  }

  return (
    <div>
      <table className="table table-dark">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Artist</th>
          <th scope="col">Track</th>
          <th scope="col">Date</th>
          <th scope="col"/>
        </tr>
        </thead>
        <tbody>
        {songs.map((s, i) => (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{s.artists}</td>
            <td>{s.track}</td>
            <td>{(new Date(s.date)).toLocaleString()}</td>
            <td>
              {s.spotifyTrackId ?
                <a href='#' onClick={() => openSpotifyTrackLink(s.spotifyTrackId)} className='btn-link'>
                  <i className='fa fa-spotify' title='Spotify'/>
                </a>
                : ''}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
};

SongTable.propTypes = {
  songs: PropTypes.array
};

export default SongTable;