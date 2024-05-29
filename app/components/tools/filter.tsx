"use client"

import { airingStatusOptions, animeYearOptions, genres } from '@/utils/consts';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { ShowFollowedAnime } from '@/home/showFollowedAnime';
import { PomeSelect } from '../utilities/pomeSelect';
import { useDebounceCallback } from 'usehooks-ts';
import { GiMagnifyingGlass } from '@/utils/libs';
import { FilterType } from '@/utils/types';
import { TokenContext } from '@/utils';

export function Filter({ setFilter, filter, setShowFollowedAnime, showFollowedAnime, toast }: {
  setShowFollowedAnime: Dispatch<SetStateAction<boolean>>;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  showFollowedAnime: boolean;
  filter: FilterType;
  toast: any;
}) {
  const [showSelectStatus, setShowSelectStatus] = useState<boolean>(false);
  const [showSelectGenres, setShowSelectGenres] = useState<boolean>(false);
  const [showSelectYear, setShowSelectYear] = useState<boolean>(false);
  const setSearchDebounced = useDebounceCallback(setFilter, 1000)
  const { user } = useContext(TokenContext)

  return (
    <div className='flex flex-wrap items-center justify-center md:flex-row gap-5 py-3'>
      <div
        className="relative w-48 h-10 rounded-sm"
        style={{ boxShadow: "0 0 2px rgb(204, 204, 204)" }}
      >
        <GiMagnifyingGlass className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-eigth" />
        <input
          className="h-10 w-full rounded-md outline-none bg-third pl-3 pr-10 text-sm text-white"
          onChange={(e) => setSearchDebounced(prevState => ({ ...prevState, search: e.target.value }))}
          placeholder='Search'
        />
      </div>
      <PomeSelect
        title={filter.status ? airingStatusOptions[filter.status] : null}
        options={Object.keys(airingStatusOptions)}
        setShow={setShowSelectStatus}
        show={showSelectStatus}
        selectionOf={"status"}
        setFilter={setFilter}
      />
      <PomeSelect
        title={filter.genres}
        options={genres}
        setShow={setShowSelectGenres}
        show={showSelectGenres}
        selectionOf={"genres"}
        setFilter={setFilter}
      />
      <PomeSelect
        title={filter.year === 0 ? null : filter.year.toString()}
        options={animeYearOptions}
        setShow={setShowSelectYear}
        show={showSelectYear}
        selectionOf={"year"}
        setFilter={setFilter}
      />
      {!showFollowedAnime ? (
        <ShowFollowedAnime
          setShowFollowedAnime={setShowFollowedAnime}
          showFollowedAnime={showFollowedAnime}
          toast={toast}
          user={user}
          mobile={true}
        />
      ) : null}
    </div >
  );
}
