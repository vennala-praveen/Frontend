import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Wallpaper = () =>{
    const [wallpaper, setWallpaper] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5000/wallpapers").then((response)=>{
            setWallpaper(response.data);
        });
    }, []);

    const handleDownload = (url, name)=>{
        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return(
        <div className="gallery">
            <h1 className="get">Anime Wallpapers</h1>
            <div className="wallpapers">
                {wallpaper.map((wallpaper)=>(
                    <div key={wallpaper.id} className="wallpaper-item">
                        <img src={wallpaper.url} alt={wallpaper.name}/>
                        <button onClick={()=> handleDownload(wallpaper.url, wallpaper.name)}> Download </button>
                    </div>
                ))}
            </div>
        </div>

    )
};

export default Wallpaper;