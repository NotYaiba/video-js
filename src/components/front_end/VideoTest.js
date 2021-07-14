import React, { Component } from 'react'
import "./Video.scss"
import "../video.js/video-js-min.css"
import Video from './Video'

export default class VideoTest extends Component {

    render() {
        return (
            <div className="test-cont">
               <Video videoPoster="//vjs.zencdn.net/v/oceans.png" videoSrs="https://vjs.zencdn.net/v/oceans.mp4?HD" isLive={true} autoPlay={false} isMute={true} ></Video>
               
            
            </div>
        )
    }
}


// function playVideo(videoSource, type) {
//     var videoElm = document.getElementById('testVideo');
//     var videoSourceElm = document.getElementById('0testVideoSource'); 
//      if (!videoElm.paused) {
//           videoElm.pause();
//        }
      
//      videoSourceElm.src = videoSource;
//      videoSourceElm.type = type;
    
//       videoElm.load();
//       videoElm.play();
//     }