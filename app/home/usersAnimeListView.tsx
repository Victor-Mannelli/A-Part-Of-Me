"use client"

import { useObserveElementWidth } from "@/utils/hooks/useResizeHook";
import { calculatePadding } from "@/utils/functions";
import { UsersAnimeList } from "@/utils";
import { useLayoutEffect } from "react";

export function UsersAnimeListView({ usersAnimeList, router }: {
  usersAnimeList: UsersAnimeList[] | null;
  router: any;
}) {
  const { width, ref } = useObserveElementWidth<HTMLDivElement>();

  useLayoutEffect(() => {
    calculatePadding({ parentWidth: width, childWidth: 128 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex lg:flex-col gap-5 lg:w-2/5 w-full h-fit rounded-md">
      <div className="flex flex-col bg-third w-full gap-4 rounded-md overflow-auto">
        <h1 className="font-bold text-center pt-5"> You are following </h1>
        <div
          style={{ paddingLeft: calculatePadding({ parentWidth: width, childWidth: 128 }) }}
          className="wrapper-container"
          ref={ref}
        >
          {usersAnimeList.map((e: UsersAnimeList) => (
            <div
              className="flex flex-col justify-end w-32 h-40 bg-fifth rounded-md bg-cover cursor-pointer hover:shadow-black hover:shadow-inner"
              onClick={() => router.push(`/anime/${e.anime.anime_id}`)}
              style={{ backgroundImage: `url(${e.anime.cover_image})` }}
              key={e.anime.anime_id}
            >
              {/* <div className='flex flex-col justify-center items-center h-fit w-full bg-black bg-opacity-50 rounded-b-md border-b-8 border-signature cursor-default'>
                {e.anime.next_airing_episode.episode - 1 - e.progress > 0 ?
                  <div className='flex items-center gap-5'>
                    <BiMinus
                      className='text-white text-xl cursor-pointer hover:text-eigth'
                      onClick={(event) => {
                        event.stopPropagation();
                        updateFollowedAnime({ progress: e.progress - 1, animeId: e.anime.anime_id, toggle, setToggle })
                      }}
                    />
                    <h3 className='text-white'> {e.anime.next_airing_episode.episode - 1 - e.progress} </h3>
                    <BiPlus
                      className='text-white text-xl cursor-pointer hover:text-eigth'
                      onClick={(event) => {
                        event.stopPropagation();
                        updateFollowedAnime({ progress: e.progress + 1, animeId: e.anime.anime_id, toggle, setToggle })
                      }}
                    />
                  </div>
                  : null
                }
                <h3 className={`text-white ${e.anime.next_airing_episode.episode - 1 - e.progress > 0 ? '' : 'py-1'}`}>
                  {
                    Math.floor(e.anime.next_airing_episode.timeUntilAiring / 86400)
                  }d {
                    Math.floor((e.anime.next_airing_episode.timeUntilAiring % 86400) / 3600)
                  }h {
                    Math.floor((e.anime.next_airing_episode.timeUntilAiring % 3600) / 60)
                  }m
                </h3>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}