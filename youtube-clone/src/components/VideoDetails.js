import React ,{useState,useEffect,useContext} from 'react';
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike , AiOutlineDislike ,AiFillLike,AiFillDislike,AiOutlineEllipsis,AiOutlineDollar} from "react-icons/ai";
import {RiShareForwardLine} from "react-icons/ri";
import {abbreviateNumber} from "js-abbreviation-number";
import { useParams } from "react-router-dom";
import {fetchDataFromApi} from "../utils/api";
import {Context} from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";

const VideoDetails = () => {
  const [video,setVideo]=useState();
  const [relatedVideos,setRelatedVideos]=useState();
  const {id}=useParams();
  const {setLoading}=useContext(Context);
  const [liked,setLiked]=useState(false);
  const [unliked,setUniked]=useState(false);
  useEffect(()=>{
    fetchVideoDetails();
    fectchRelatedVideos();
  },[id]);

  const fectchRelatedVideos =()=>{
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res)=>{
      // console.log(res);
      setRelatedVideos(res);
      setLoading(false);
    })
  }

  const fetchVideoDetails =()=>{
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res)=>{   
      // console.log(res)   
      setVideo(res);
      setLoading(false);
    })
  }
  let dates = video?.publishedDate.split('-');
  let month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let displayDate = dates?(` ${month[Number(dates[1])-1]} ${dates[2]} , ${dates[0]}`):'';

  let hastags = video?.superTitle?.items?[...video.superTitle.items]:'';

  // let ht=hastags?[...hastags]:'';


  // console.log(hastags)
  
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0, 
  });
  return (
    <div className='flex justify-center flex-row-h-[calc(100%-56px)] bg-black '>
      <div className='w-full max-w-[1280px] flex flex-col lg:flex-row '>
        <div className='flex flex-col lg:w-[calc(100%-0px)] xl:w-[calc(100%-0px)] px-2 py-3 lg:py-6 overflow-y-auto overflow-x-hidden'>
        <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[400px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
         <ReactPlayer
           url={`https://www.youtube.com/watch?v=${id}`}
           controls
           width="100%"
           height="100%"
           style={{background: "#000000"}}
           playing={true}
         />
        </div>
        <div className='text-white font-bold text-sm md:text-xl mt-4 line-clamp-2'>
              {video?.title}
         </div>
         
         <div className='flex justify-between flex-col md:flex-row mt-4'>
          <div className='flex'>
            <div className='flex items-start'>
            <div className=' flex h-11 w-11 rounded-full overflow-hidden '>
              <img
                 className='h-full w-full object-cover'
                 src={video?.author?.avatar[0]?.url}
                 alt=''
              />
            </div>
            </div>
          
          <div className='flex flex-col ml-3'>
              <div className='text-white text-md font-semibold flex items-center'>
                   {video?.author?.title}
                   {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className='text-white/[0.5] text-[12px] ml-1'/>
                   )}
              </div>
              <div className='text-white/[0.7] text-sm'>
                {video?.author?.stats?.subscribersText}
              </div>
          </div>
          <div className='flex'>
            <button className='bg-white h-11 w-16 justify-center  mx-1 ml-2  md:mx-7 rounded-3xl font-semibold hover:bg-white/[0.8]'>Join</button>
            <button className='bg-white/[0.3] h-11 w-24 justify-center  ml-0.5 md:ml-0 rounded-3xl font-semibold hover:bg-white/[0.4] text-white'>Subscribe</button>
          </div>
        </div>
        <div className=' flex text-white mt-4 md:mt-0'>
          <div className='flex items-center justify-center h-11 px-2 rounded-l-3xl bg-white/[0.15] hover:bg-white/[0.2]'
          onClick={()=>setLiked(!liked)}>
          {liked?(<AiFillLike className='text-xl text-white mr-2'/>):(<AiOutlineLike className='text-xl text-white mr-2'/>)}
          {
            `${abbreviateNumber(video?.stats?.likes,0)}`
          }
          </div>
          <div className='flex items-center justify-center h-11 px-2 rounded-r-3xl bg-white/[0.15] hover:bg-white/[0.2]'
          onClick={()=>setUniked(!unliked)}>
          {unliked?(<AiFillDislike className='text-xl text-white mr-2 mt-1'/>):(<AiOutlineDislike className='text-xl text-white mr-2 mt-1'/>)}
          </div>

          <div className='flex items-center h-11 w-24 justify-center rounded-3xl bg-white/[0.15] ml-2 hover:bg-white/[0.2]'>
             <RiShareForwardLine className='text-xl text-white mr-2 mt-1'/>
             Share
          </div>

          <div className='flex items-center h-11 w-32 md:hidden justify-center rounded-3xl bg-white/[0.15] ml-2 hover:bg-white/[0.2]'>
             <AiOutlineDollar className='text-2xl text-white mr-2 mt-1'/>
             Thanks
          </div>

          <div className='flex items-center h-9 w-9 mt-1 justify-center rounded-full bg-white/[0.15] ml-2 hover:bg-white/[0.2]'>
             <AiOutlineEllipsis className='text-2xl text-white mt-1'/>
          </div>          
        </div>
          </div>
         <div className='text-white bg-white/[0.15] mt-5 rounded-lg hidden md:flex flex-wrap'>
          <div className='flex-col'>
          <div className='flex ml-5 mt-4 '>
          <div className='text-white font-semibold text-sm'>
          {`${formatter.format(video?.stats?.views).split('$')[1]} views`}
          </div >
          
          <div className='text-white font-semibold text-sm ml-3 '>
          {displayDate}
          </div>
          {/* <div className='whitespace-normal'> */}
          <div className=' ml-3 text-blue-500 mr-2'>
            {hastags?hastags.map((item)=>{
            return (
              <div className='ml-7'>{item}</div>
            ); 
          }):''}        
          
          </div>
          {/* </div> */}
          </div>
          <div className='flex  ml-5 mt-2 mr-5 h-auto mb-4'>
              <div className='justify-items-center '>
              <div className='whitespace-pre-wrap'>
              {video?.description}
              </div>
              </div>            
          </div>
          </div> 
         </div>
      </div>       
      <div className='text-white'>
      { relatedVideos?.contents?.map((item,index)=>{
        if(item?.type != 'video') return false;
        return(
          <SuggestionVideoCard key={index} video={item?.video}/>
        )
      })      
      }
    </div>
    </div>
  </div>     
  )
}

export default VideoDetails