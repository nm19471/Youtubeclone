
import React ,{useContext, useEffect} from 'react'
import ReactPlayer from "react-player/youtube";
import { Context } from '../context/contextApi'
import LeftNav from './LeftNav'
import VideoCard from "./VideoCard";
import styles from "../index.css"
const Feed = () => {
  const { loading, searchResults,mobileMenu } = useContext(Context);
  
  

  useEffect(() => {
      document.getElementById("root").classList.remove("custom-h");
  }, []);

  return (
      <div className="flex flex-row h-[calc(100%-56px)]">
        <div className='md:hidden'>{mobileMenu?<LeftNav />:''}</div>
        <div className='invisible md:visible'><LeftNav /></div>
        <div className="grow w-[calc(100%-240px)] h-full bg-black overflow-y-auto scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-5">
            {!loading &&
              searchResults.map((item) => {
                // console.log(item);
                if (item.type !== "video") return false;
                  return (
                      <VideoCard
                        key={item?.video?.videoId}
                        video={item?.video}
                      />                  
                      );
                      })}
              </div>
          </div>
      </div>
  );
};

export default Feed