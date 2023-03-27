import React from "react";
import moment from "moment";

const VideoLength=({time})=>{
    const VideoLengthInSeconds=time>=3600?moment()?.startOf("day")?.seconds(time)?.format("H:mm:ss"):moment()?.startOf("day")?.seconds(time)?.format("mm:ss");
    return (
        <span className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
            {VideoLengthInSeconds}
        </span>
    )
}

export default VideoLength;