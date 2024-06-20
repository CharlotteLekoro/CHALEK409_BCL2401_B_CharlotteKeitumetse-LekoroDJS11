import React from 'react';
import Episode from './Episode';
import { useSelector } from 'react-redux';
const AllEpisodesPerSeason = ({ currentSeasonEpisodes }) => {
  const { currentPodcast, currentSeason } = useSelector(
    (state) => state.podcastsReducer
  );

  return (
    <div>
      <div>
        {currentSeasonEpisodes.map((item) => {
          const id = `Show:${currentPodcast.id} Season:${currentSeason} Episode:${item.episode}`;

          return (
            <Episode
              showTitle={currentPodcast.title}
              image={currentPodcast.image}
              id={id}
              key={item.episode}
              item={item}
              showId={currentPodcast.id}
              currentSeason={currentSeason}
              updated={currentPodcast.updated}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllEpisodesPerSeason;
