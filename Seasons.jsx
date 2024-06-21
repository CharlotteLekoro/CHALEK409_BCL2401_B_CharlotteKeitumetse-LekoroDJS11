import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AllEpisodesPerSeason from "./AllEpisodesPerSeason";
import { setCurrentSeason } from "../globalState/reducers/podcastsReducer";
import { styled } from "styled-components";
const SeasonDetails = styled.p`
  font-size: 0.7rem;
  color: gray;
  margin: 0.2rem 0;
`;

const Select = styled.select`
  background-color: gray;
  padding: 0.2rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  color: #ffffff;
`;
const Seasons = () => {
  const { currentSeason, currentPodcast } = useSelector(
    (state) => state.podcastsReducer
  );
  const dispatch = useDispatch();
  const seasons = currentPodcast.seasons;

  const currentSeasonEpisodes = seasons[currentSeason - 1].episodes;

  return (
    <div>
      <p className="bolder">Seasons</p>
      <SeasonDetails>
        Season {currentSeason}/Episodes {currentSeasonEpisodes.length}
      </SeasonDetails>
      <Select
        name="seasons"
        id="seasons"
        value={currentSeason}
        onChange={(e) => {
          dispatch(setCurrentSeason(e.target.value));
        }}
      >
        {seasons
          .map((singleSeason, index) => {
            return (
              <option key={index} value={singleSeason.season}>
                season {singleSeason.season}
              </option>
            );
          })
          .reverse()}
      </Select>
      <p className="bolder">Episodes</p>
      <AllEpisodesPerSeason currentSeasonEpisodes={currentSeasonEpisodes} />
    </div>
  );
};

export default Seasons;
