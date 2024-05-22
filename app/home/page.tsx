"use client"

import { ErrorFeedback, FollowedAnimeSkeleton, HomePageAnimesSkeleton } from '@/components';
import { AnimeCatalogData, UsersAnimelist } from '@/utils/types';
import { UsersAnimeListView } from './usersAnimelistView';
import { AnimelistWrap } from './animelistWrap';
import { useEffect, useState } from 'react';
import { getUsersAnimeList } from '@/utils';
import { useRouter } from 'next/navigation';
import { getAnimes } from './functions';

export default function Home() {
  const [usersAnimeList, setUsersAnimeList] = useState<UsersAnimelist[] | null>(null);
  const [usersAnimeListFailed, setUsersAnimeListFailed] = useState<boolean>(false);
  const [usersAnimeListLoad, usersAnimeListSetLoad] = useState<boolean>(true);

  const [animeData, setAnimeData] = useState<AnimeCatalogData | null>(null);
  const [animeDataLoad, setAnimeDataLoad] = useState<boolean>(true);
  const [animeDataFailed, setAnimeDataFailed] = useState<boolean>(false);

  // const [filter, setFilter] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    getUsersAnimeList({
      setData: setUsersAnimeList,
      setLoading: usersAnimeListSetLoad,
      setFailed: setUsersAnimeListFailed,
    })
  }, [])
  useEffect(() => {
    getAnimes({
      setAnimeData,
      setFailed: setAnimeDataFailed,
      setLoading: setAnimeDataLoad,
      page,
      quantity: 30
    });
  }, [page]);

  return (
    <div className="flex flex-col-reverse justify-center items-center lg:items-start lg:flex-row m-5 gap-10">
      {/* <div className='flex flex-col gap-5 w-[20%]'>
        <h1 className="text-center"> Filters </h1>
        <Filter
          placeholder='search'
          onChange={(e) => setFilter(e.target.value)}
        />
      </div> */}
      {animeDataFailed ? (
        <ErrorFeedback refreshFunction={() =>
          getAnimes({
            setAnimeData,
            setFailed: setAnimeDataFailed,
            setLoading: setAnimeDataLoad,
            page,
            quantity: 30
          })}
          setFailed={setAnimeDataFailed}
          loading={animeDataLoad}
        />
      ) : animeDataLoad ? (
        <HomePageAnimesSkeleton page={page} />
      ) : (
        <AnimelistWrap animeData={animeData} setPage={setPage} page={page} usersAnimeListFailed={usersAnimeListFailed} />
      )}
      {usersAnimeListFailed ? null : usersAnimeListLoad ? (
        <FollowedAnimeSkeleton />
      ) : (
        <UsersAnimeListView usersAnimeList={usersAnimeList} router={router} />
      )}
    </div>
  )
}
