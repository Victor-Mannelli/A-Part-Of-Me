"use client";

import { PopUp, AnimePageSkeleton, ErrorFeedback } from "@/components";
import { getAnimeDataForSlug, maximizeTrailer } from "./functions";
import { LiaExpandArrowsAltSolid } from "@/utils/libs/reactIcons";
import { SingleAnimeDataForSlug } from "@/utils/types";
import { UserAnimeSettings } from "./animeUserSettings";
import { useEffect, useState } from "react";
import { AnimeInfo } from "./animeInfo";
import { Sinopse } from "./sinopse";
import React from "react";

export default function AnimePage({ params }: { params: { id: string; }; }) {
  const [showAnimeSettings, setShowAnimeSettings] = useState<boolean>(false);
  const [trailerFullScreen, setTrailerFullScreen] = useState<boolean>(false);
  const [data, setData] = useState<SingleAnimeDataForSlug | null>(null);
  const [dataLoad, setDataLoad] = useState<boolean>(true);
  const [dataFailed, setDataFailed] = useState<boolean>(false);

  useEffect(() => {
    getAnimeDataForSlug({
      setFailed: setDataFailed,
      setLoading: setDataLoad,
      animeId: params.id,
      setData,
    });
  }, [params.id]);

  return (
    <>
      {dataFailed ? (
        <div className='flex justify-center items-center w-full h-screen'>
          <ErrorFeedback
            refreshFunction={() => {
              getAnimeDataForSlug({ animeId: params.id, setData, setFailed: setDataFailed, setLoading: setDataLoad });
            }}
            setFailed={setDataFailed}
            loading={dataLoad}
          />
        </div>
      ) : dataLoad ? (
        <AnimePageSkeleton />
      ) : (
        <div className="flex flex-col items-center w-full mb-5">
          {data.bannerImage ? (
            <div
              className={"w-full h-80 bg-cover bg-center"}
              style={{ backgroundImage: `url(${data.bannerImage})` }}
            > </div>
          ) : null}
          <AnimeInfo
            toggleShowAnimeSettings={() => setShowAnimeSettings(!showAnimeSettings)}
            setAnimeData={setData}
            animeData={data}
          />
          <PopUp show={showAnimeSettings} setShow={setShowAnimeSettings} bg={true}>
            {showAnimeSettings ?
              <UserAnimeSettings
                setShowAnimeSettings={setShowAnimeSettings}
                setAnimeData={setData}
                animeData={data}
              /> : null
            }
          </PopUp>
          <Sinopse animeData={data} inAnimeInfo={false} />
          {data.trailer && data.trailer.site === "youtube" ? (
            <div className="relative bg-fourthAndAHalf rounded-xl w-[calc(100%-40px)] mt-5 p-5">
              <h1 className="text-xl font-bold pb-3"> Trailer </h1>
              <div className="relative flex justify-center">
                <iframe
                  className={`${trailerFullScreen ? "w-[94%] h-[calc(100vh-7.5rem)]" : "h-[25rem] w-[40rem]"}`}
                  src={`https://www.youtube.com/embed/${data.trailer.id}`}
                  allowFullScreen
                />
              </div>
              <div
                className='absolute right-3 top-[0.6rem] md:bottom-4 md:top-[inherit] p-3 rounded-full bg-fourth cursor-pointer hover:bg-fifth'
                onClick={() => maximizeTrailer({ setToggle: setTrailerFullScreen, toggle: trailerFullScreen })}
              >
                <LiaExpandArrowsAltSolid className='text-white text-xl' />
              </div>
            </div>
          ) : null}
        </div >
      )}
    </>
  );
}
