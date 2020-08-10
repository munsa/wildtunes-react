import React, {useEffect, useState} from 'react';
import {InfoWindow, Marker} from '@react-google-maps/api';
import MarkerIcon from '../../../shared/assets/icon/icons8-marker-trim.png';
import {getArtistsString} from '../../../shared/utils/StringUtils';
import './RecordingMarker.css';

const RecordingMarker = ({openedRecordingId, recording, onMarkerClickCallback}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    closeInfoWindowById();
  }, [openedRecordingId]);

  const onMarkerClick = () => {
    openMarker();
    onMarkerClickCallback(recording);
  }

  const openMarker = () => {
    setIsOpen(true);
  }

  const closeMarker = () => {
    setIsOpen(false);
  }

  const closeInfoWindowById = () => {
    if(openedRecordingId !== recording._id) {
      closeMarker();
    }
  }

  const Source = source => {
    return (
      <div>
        <div className='track-label'>{source.source.track?.name}</div>
        <div className='artists-label'>{getArtistsString(source.source.artists)}</div>
      </div>
    )
  }

  return (
    <Marker
      onClick={onMarkerClick}
      position={{
        lat: Number(recording.geolocation.latitude),
        lng: Number(recording.geolocation.longitude)
      }}
      icon={MarkerIcon}
    >
      {isOpen &&
      <InfoWindow
        onCloseClick={closeMarker}
        // @ts-ignore
        visible={true}
        options={{closeBoxURL: ``, enableEventPropagation: true}}
      >
        <div className='info-box-container'>
          {recording.spotify ?
            <Source source={recording.spotify}/>
            : (recording.deezer ?
              <Source source={recording.deezer}/>
              : (recording.acrCloud ?
                <Source source={recording.acrCloud}/>
                : ''))}
        </div>
      </InfoWindow>
      }
    </Marker>
  );
}

RecordingMarker.defaultProps = {
  text: 'Song'
};

export default RecordingMarker;