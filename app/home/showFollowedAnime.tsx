import { Dispatch, SetStateAction } from "react";
import { User } from "@/utils"

export function ShowFollowedAnime({ user, showFollowedAnime, setShowFollowedAnime, toast, mobile }: {
  setShowFollowedAnime: Dispatch<SetStateAction<boolean>>;
  showFollowedAnime: boolean;
  mobile: boolean;
  toast: any;
  user: User;
}) {
  return (
    <label
      className={`items-center bg-third text-white w-[10.5rem] h-8 px-3 cursor-pointer active:bg-fifth hover:bg-fourth 
        ${mobile ? "flex xl:hidden rounded-sm" : "absolute top-0 right-0 xl:flex hidden rounded-md"}
      `}
      style={{ boxShadow: "0 0 2px rgb(204, 204, 204)" }}
    >
      <input
        className=''
        type='checkbox'
        placeholder=''
        checked={!user || !showFollowedAnime ? false : true}
        onChange={() => {
          if (user) {
            setShowFollowedAnime(true)
          } else {
            toast({
              title: 'Log in first!',
              status: 'error',
              isClosable: true,
            })
          }
        }}
      />
      <span className='pl-3 text-sm'> Show My Animes! </span>
    </label>
  )
}