import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentPodcast,
  setIsLoading,
  setCurrentSeason,
} from '../globalState/reducers/podcastsReducer';

const PodcastContainer = styled.div`
  flex-grow: 1;
  width: 10rem;
  margin-bottom: 2rem;
  background-color: #D2B48C;
  display: flex;
  justify-content: center;
  border-radius: 0.5rem;
`;
const Podcast = styled.div`
  color: #fff;
  width: 10rem;
`;
const Image = styled.img`
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.5rem
`;
const Title = styled.p`
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.2rem;
  color:ffffff
`;
const Details = styled.p`
  font-size: 0.7rem;
  color:#000000 ;
`;
const Description = styled.p`
  font-size: 0.7rem;
  margin-bottom: 0.2rem;
  color:#000000
`;
const Genre = styled.span`
  margin-right: 1rem;
`;
const GenreContainer = styled.div`
  font-size: 0.7rem;
  color:
`;
const HomePodcast = ({ item }) => {
  const genreNames = {
    1: 'Personal Growth',
    2: 'True Crime and Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family}',
  };
  const { isLoading } = useSelector((state) => state.podcastsReducer);
  const {
    description,
    image,
    id: podcastId,
    title,
    seasons,
    updated,
    genres,
  } = item;
  const dispatch = useDispatch();
  const lastUpdateDate = new Date(updated);

  const day = lastUpdateDate.getDate();
  const month = lastUpdateDate.getMonth();
  const year = lastUpdateDate.getFullYear();

  const date = `${day}/${month + 1}/${year}`;
  const getSinglePodcast = async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(
        `https://podcast-api.netlify.app/id/${podcastId}`
      );
      const result = await response.json();
      if (result) {
        dispatch(setCurrentPodcast(result));
        dispatch(setCurrentSeason(result.seasons.length));
        dispatch(setIsLoading(false));
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PodcastContainer>
      <Link
        to={`/podcast/${podcastId}`}
        onClick={() => getSinglePodcast()}
        className="link"
      >
        <Podcast>
          <Image src={image} alt={`${title}`} />
          <Title>{title}</Title>
          <Description>{description.substring(0, 50)}...</Description>
          <Details>Seasons: {seasons}</Details>
          <Details>Last update: {date}</Details>
          <GenreContainer>
            Genres:
            <Details>
              {genres.map((genre, index) => {
                return <Genre key={index}>{genreNames[genre]}</Genre>;
              })}
            </Details>
          </GenreContainer>
        </Podcast>
      </Link>
    </PodcastContainer>
  );
};

export default HomePodcast;
