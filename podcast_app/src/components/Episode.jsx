import React, { useState, useEffect } from 'react';
import { setFavouriteSwitch } from '../globalState/reducers/podcastsReducer';
import { useSelector, useDispatch } from 'react-redux';
import supabase from '../supabase/client';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { styled } from 'styled-components';
const EpisodeContainer = styled.div`
  background-color: #242424;
  margin: 1rem 0;
  padding: 0.8rem;
  border-radius: 0.25rem;
`;
const ImageDescriptionContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;
const Description = styled.p`
  font-size: 0.8rem;
  margin: 0.7rem 0;
`;
const Image = styled.img`
  width: 40%;
`;
const Episode = ({
  item,
  id,
  showId,
  currentSeason,
  image,
  showTitle,
  updated,
}) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { favourites } = useSelector((state) => state.podcastsReducer);
  const { description, episode, file, title } = item;
  const dispatch = useDispatch();
  const episodeWithId = {
    ...item,
    id,
    showId,
    currentSeason,
    image,
    showTitle,
    updated,
  };

  const addToFavorites = async (ep) => {
    if (favourites !== null) {
      for (const fav of favourites) {
        if (fav.episodeId === id) return;
      }
    }
    const { data, error } = await supabase
      .from('userFavourites')
      .insert([
        { episodeId: id, episodeDetails: JSON.stringify(ep), showId: showId },
      ])
      .select();
    // dispatch(setFavourites({ name: showId, value: ep }));
    setIsFavourite(!isFavourite);
    dispatch(setFavouriteSwitch());
  };

  const removeFromFavourites = async () => {
    const { error } = await supabase
      .from('userFavourites')
      .delete()
      .eq('episodeId', id);
    setIsFavourite(!isFavourite);
    dispatch(setFavouriteSwitch());
  };
  return (
    <EpisodeContainer>
      <h4>{`${episode}: ${title}`}</h4>
      <ImageDescriptionContainer>
        <Image src={image} alt={title} />
        <div>
          <Description>{description}</Description>
          {isFavourite ? (
            <button onClick={removeFromFavourites}>
              Remove from favourites <AiFillHeart />
            </button>
          ) : (
            <button onClick={() => addToFavorites(episodeWithId)}>
              Add to favourites <AiOutlineHeart />
            </button>
          )}
        </div>
      </ImageDescriptionContainer>
      <audio controls>
        <source src={file} type="audio/mp3" />
      </audio>
    </EpisodeContainer>
  );
};

export default Episode;
