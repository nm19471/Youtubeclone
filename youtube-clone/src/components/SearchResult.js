import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav"; 
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {

  const [result,setResult]=useState();
  const { searchQuery } = useParams();
  const { setLoading ,mobileMenu} = useContext(Context);
  // console.log(searchQuery)
  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
},[searchQuery]);


const fetchSearchResults = () => {
  setLoading(true);
  fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      // console.log(res);
      setResult(res?.contents);
      setLoading(false);
  });
 }
  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
     <div className='md:hidden'>{mobileMenu?<LeftNav />:''}</div>
     <div className='invisible md:visible'><LeftNav /></div>
      <div className=" w-[calc(100%-240px)] bg-black overflow-y-scroll scrollbar grow">
      <div className=" grid grid-cols-1 gap-2 p-5">
        {result?.map((item)=>{
          if (item?.type !== 'video') return false;
          let video = item?.video;
          return(
            <SearchResultVideoCard key={video.videoId} video={video}/>
          )
        })}
      </div>
      </div>
    </div>
  )
}
export default SearchResult