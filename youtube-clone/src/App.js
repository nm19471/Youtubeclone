import React from "react";
import {BrowserRouter , Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import { AppContext } from "./context/contextApi";
import styles from "./index.css"
const App =()=>{
    return (
      <div className="flex flex-col h-full"> 
     
        <AppContext>
            <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Feed/>}/>
                <Route path="/searchResult/:searchQuery" element={<SearchResult/>}/>
                <Route path="/video/:id" element={<VideoDetails/>}/>
            </Routes>         
            </BrowserRouter>
        </AppContext>  
        </div>
    )
};

export default App;
