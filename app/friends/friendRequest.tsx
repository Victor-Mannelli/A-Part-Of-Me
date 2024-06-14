/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { FriendAsFData, FriendAsUData, FriendRequests, StrangersAndFRsType } from './types';
import { acceptFriendRequest, getFriendRequests, getStrangersAndFRs } from './functions';
import { FaUserFriends, FiUserPlus, GiCakeSlice, RxCross2 } from '@/utils/libs';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Filter, PopUp } from '@/components';
import { TokenContext } from '@/utils';

export function FriendRequestsElement({
  setShowFriendRequests,
  showFriendRequests,
  data,
}: {
  setShowFriendRequests: Dispatch<SetStateAction<boolean>>;
  showFriendRequests: boolean;
  data: any;
}) {
  const [friendRequestsLoading, setFriendRequestsLoading] = useState<StrangersAndFRsType>(null);
  const [friendRequestsFailed, setFriendRequestsFailed] = useState<boolean>(false);
  const [friendRequests, setFriendRequests] = useState<FriendRequests[]>([]);

  const [acceptFriendFilter, setAcceptFriendFilter] = useState<string>('');
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const { user } = useContext(TokenContext);

  useEffect(() => {
    getFriendRequests({ setData: setFriendRequests });
  }, []);

  const receivedFR = friendRequests.filter((e: FriendRequests) => e.requested_id === user?.user_id);
  // const usersList = allUsers.filter((e: any, i: number) => {
  //   return [];
  // e.username.includes(acceptFriendFilter) &&
  // e.username !== data.userData.username &&
  // !friends.some((friend) => friend.username === e.username) &&
  // i < 10,
  // });

  return (
    <div className="relative flex items-center gap-3">
      <h1 className="font-bold"> Friends </h1>
      {receivedFR.length > 0 ? (
        <>
          <FaUserFriends
            className="text-white text-2xl cursor-pointer animate-pulse"
            onClick={() => {
              setShowFriendRequests((prev) => !prev);
              setUpdate(!update);
            }}
          />
          <p className="absolute text-white text-sm -top-2 -right-2"> {receivedFR.length} </p>
          <PopUp show={showFriendRequests} setShow={setShowFriendRequests}>
            <div
              className="relative lg:w-[60rem] md:w-[70%] w-full md:h-[70%] h-screen bg-second md:rounded-xl md:border border-sixth flex flex-col items-center gap-3 p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <RxCross2
                className="absolute right-4 top-4 text-white text-3xl cursor-pointer hover:text-sixth"
                onClick={() => setShowFriendRequests((prev) => !prev)}
              />
              <h1> These people want to be your friend! </h1>
              <Filter onChange={(e) => setAcceptFriendFilter(e.target.value)} />
              <div className="overflow-auto w-full flex flex-col gap-3">
                {receivedFR.length === 0 ? (
                  <div className="flex justify-center items-center gap-2 text-white pt-16">
                    <h3> Yeah, I didn&#39;t think so either, have a cake instead</h3>
                    <GiCakeSlice className="text-3xl" />
                  </div>
                ) : (
                  receivedFR.map((e: FriendRequests) => (
                    <div
                      key={e.friend_request_id}
                      className="bg-fifth rounded-xl p-2 w-full flex items-center justify-between hover:bg-sixth hover:cursor-pointer"
                      onClick={() => acceptFriendRequest(e.friend_request_id)}
                    >
                      <div className="flex items-center">
                        <img className="rounded-full h-6 w-6 mr-2" src="/assets/dark_bg.jpg" alt="profile_pic" />
                        {/* <h1 className="cursor-pointer text-2xl">{usersList.find((user) => user.user_id === e.requester_id)?.username}</h1> */}
                      </div>
                      <div className="flex items-center gap-3">
                        {/* {data.friendRequests.some((friendRequest) => friendRequest.requested_id === e.user_id)
                              ? <h3 className='text-signature'> Friend Request Sent </h3>
                              : null
                            } */}
                        <FiUserPlus className="text-white text-2xl cursor-pointer hover:text-sixth pr-1" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </PopUp>
        </>
      ) : null}
    </div>
  );
}