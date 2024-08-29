'use client';

import { bufferToBase64, FriendShip, wsRoomAndFriendType } from '@/utils';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { deleteFriend } from './functions';
import { Avatar } from '@chakra-ui/react';
import { RxCross2 } from '@/utils/libs';
import Link from 'next/link';

export function FriendElement({
  setWsRoomAndFriend,
  wsRoomAndFriend,
  refreshFL,
  friend,
}: {
  setWsRoomAndFriend: Dispatch<SetStateAction<wsRoomAndFriendType>>;
  wsRoomAndFriend: wsRoomAndFriendType;
  refreshFL: () => void;
  friend: FriendShip;
}) {
  const [showRemoveFriend, setShowRemoveFriend] = useState<boolean>(false);
  const removeFriendRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(removeFriendRef, () => setShowRemoveFriend(false));

  return (
    <div
      className={`flex justify-between items-center rounded-xl p-2 sm:px-2 sm:py-1 w-full cursor-pointer group ${friend.friendship_id === wsRoomAndFriend?.wsRoom ? 'bg-sixth' : 'bg-fourth'}`}
      onClick={() => setWsRoomAndFriend({ wsRoom: friend.friendship_id, friend_id: friend.user_id, friend })}
    >
      <div className="flex items-center">
        <Link href={`profile/${friend.user_id}`}>
          <Avatar
            className="rounded-full mr-3"
            size="sm"
            src={friend.avatar ? `data:image/png;base64, ${bufferToBase64(friend.avatar.data)}` : null}
          />
        </Link>
        <h1 className="cursor-pointer"> {friend.username} </h1>
      </div>
      <RxCross2
        className="sm:hidden group-hover:block text-2xl transition-all hover:text-signature text-white"
        onClick={(e) => {
          e.stopPropagation();
          setShowRemoveFriend(true);
        }}
      />
      <div
        className={`fixed z-10 inset-0 flex items-center justify-center bg-opacity-40 h-screen w-full bg-black cursor-default ${showRemoveFriend ? 'block' : 'hidden'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={removeFriendRef} className="flex flex-col gap-3 bg-fourth rounded-md cursor-default">
          <div className="flex flex-col gap-3 px-5 py-3">
            <h1> Remove Friend </h1>
            <p className="text-sm text-center">
              Are you sure you want to remove <span className="font-bold">{friend.username}</span> from your friendlist?
            </p>
          </div>
          <div className="flex justify-end w-full h-fit rounded-b-md bg-third p-3 gap-3">
            <button
              className="text-sm px-3 py-2 text-white bg-fourthAndAHalf rounded-md hover:brightness-110 hover:shadow-[0px_0px_3px_#fff]"
              onClick={() => setShowRemoveFriend(false)}
            >
              Cancel
            </button>
            <button
              className="text-sm px-3 py-2 text-white bg-red-500 rounded-md hover:brightness-110 hover:shadow-[0px_0px_3px_#fff]"
              onClick={() => deleteFriend(friend.friendship_id, refreshFL)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}