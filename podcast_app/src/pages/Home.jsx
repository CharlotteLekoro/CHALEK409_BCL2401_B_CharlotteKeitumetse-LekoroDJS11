import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { styled } from 'styled-components';
import { HomePodcast, Navbar } from '../components';
import { setHomePageDisplayedPodcasts } from '../globalState/reducers/podcastsReducer';

const Main = styled.main`
  padding: 0.25rem 1rem;
  margin-top: 20px;
`;

const PodcastsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const Home = () => {
  const {
    allPodcasts,
    searchInput,
    homePageDisplayedPodcasts,
    isLoading,
    sorting,
    isLoggedIn,
  } = useSelector((state) => state.podcastsReducer);
  return (
    <>
      <Navbar
        podcastArray={homePageDisplayedPodcasts}
        defaultArray={allPodcasts}
        setDisplayAction={setHomePageDisplayedPodcasts}
      />
      <Main>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <PodcastsContainer>
            {homePageDisplayedPodcasts.map((item, index) => {
              const { description, image, id, title, genres } = item;

              return <HomePodcast key={id} item={item} />;
            })}
          </PodcastsContainer>
        )}
      </Main>
    </>
  );
};

export default Home;
