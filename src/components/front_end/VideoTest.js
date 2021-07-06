import React, { Component } from 'react'
import "./Video.scss"
import "../video.js/video-js-min.css"
import playButtonIcon from "../../media/play.svg"
import pauseButtonIcon from "../../media/pause.svg"
import volume_mid from "../../media/volume-mid-icon.svg"
import settingsIcon from "../../media/settings-icon.svg"
import fullscreenIcon from "../../media/full-screen.svg"
import muteIcon from "../../media/mute-icon.svg"
import bigPlayIcon from "../../media/big_pause.svg"
import bigPauseIcon from "../../media/big_play_icon.svg"
import styled from "styled-components";
import volumeMax from "../../media/volumeMax.svg"
const white = "#FFFFFF"

const LiveIcon = styled.div`
position: absolute;
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
top: 24px;
left: 35px;
width: 46px;
height: 18px;
background: #EE4C50;
color: ${white};
// font-family: Poppins; // to doo change hh
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 72%;
text-align: center;
border-radius: 4px;
`;
const BigPlayPause = styled.div`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
width: 85px;
height: 85px;

border-radius: 50%;
background-color: rgba(0,0,0,0.7);
display: flex; // to do
justify-content: center;
align-items: center;
-webkit-box-shadow: 0px 0px 11px 5px rgba(0,0,0,0.43); 
box-shadow: 0px 0px 11px 5px rgba(0,0,0,0.43);
opacity: 0;
transition: all 500ms;
img{
    width: 35px;
    height: 35px;
    max-width: 35px;
    max-height: 35px;
    min-width: 35px;
    min-height: 35px;
    padding: 20px;
}
`;
const ControlBar = styled.div`
position: absolute;
bottom: 0;
background-color: transparent;
display: flex;
width: 100%;
height: 50px;


justify-content: space-between;
flex-direction: row;
align-items: start;
`;
const PauseVolumeSection = styled.div`
width: auto;
margin-left: 35px;
 display: flex;
justify-content: flex-start;
flex-direction: row;
align-items:  center;
#volume-icon{
    margin-right: 10px;
}
#play-pause{
    margin-right: 25px;
}
`;
const FullSettingSection = styled.div`
width: 65px;
margin-right: 35px;
display: flex;
justify-content: space-between;
flex-direction: row;
align-items: start;
`;
const VolumeCont = styled.div`
margin-right: 25px;
display: flex;
width: 100px;
height: 30px;
align-items: center;
justify-content: center;
overflow: hidden;
`;
export default class VideoTest extends Component {



    constructor(props) {
        super(props);
        this.vid = React.createRef();
        this.state = {
            play : false,
            ismute  : true,
            volume : 0
          };
      }

_handleKeyDown = (event) => {
   if (event.keyCode === 32)
   {
    if (this.refs.vidRef.paused === true)
        this.refs.vidRef.play();
    else
        this.refs.vidRef.pause();
    this.setState({ play: !this.state.play })
    this._togglePlay()
   }
   else if (event.keyCode === 77)
   {
        this.state.volume = 0;
        this.refs.vidRef.muted = !this.refs.vidRef.muted
        this.setState({ ismute: !this.state.ismute })
   }
   else if (event.keyCode === 70)
   {
        this.refs.vidRef.requestFullscreen();
    }

}
componentDidMount()
{

    document.addEventListener("click", this._handleDocumentClick, false);
    document.addEventListener("keydown", this._handleKeyDown);
}
      play() {
        if (this.refs.vidRef.paused === true)
            this.refs.vidRef.play();
        else
            this.refs.vidRef.pause();
        this.setState({ play: !this.state.play })
        this._togglePlay()
      }
      pause() {
        this.refs.vidRef.pause();
      }
      fullscreen() {
        this.refs.vidRef.requestFullscreen();
      }
      volumeclick()
      {
            this.refs.vidRef.muted = !this.refs.vidRef.muted

        this.setState({ ismute: !this.state.ismute })
      }
       _togglePlay()
      {

          var button = document.getElementById("bigplay")

          button.classList.add("test")

          const timer = setTimeout(() => {
            button.classList.remove("test")
          }, 500);
          return () => clearTimeout(timer);
      }

    
    render() {
        return (
            <div className="test-cont">
                <div className="card">
                <video onClick={this.play.bind(this)}
                    ref={this.vid}
                    ref="vidRef"      
                    id="my-player"
                    className="video-js"
                    controls={false}
                    preload="auto"
                    muted={this.state.ismute}
                    autoPlay={true}
                    poster="//vjs.zencdn.net/v/oceans.png"
                    data-setup='{}'>
                <source src="https://vjs.zencdn.net/v/oceans.mp4?HD" type="video/mp4" res={this.state.res} label={this.state.label} ></source>
                </video>
                <LiveIcon  >LIVE</LiveIcon>
                <BigPlayPause id="bigplay">
                    <img alt="big-pause"  src={this.state.play === true ? bigPlayIcon : bigPauseIcon}/>
                </BigPlayPause>
                <ControlBar >
                    <PauseVolumeSection >
                        <img alt="play" id="play-pause" className="play-pause-button control-bar-buttons" src={this.state.play === true ? playButtonIcon : pauseButtonIcon} onClick={this.play.bind(this)} />
                        <img alt="volume" id="volume-icon" className="play-pause-button control-bar-buttons" src={this.state.ismute === false ? (this.state.volume > 0.9 ? volumeMax : volume_mid) : muteIcon}  onClick={this.volumeclick.bind(this)}/>
                       

                        <VolumeCont >
                        <input className="e-range"
                            type="range"
                            min={0}
                            max={1}
                            step={0.02}
                            value={this.state.volume}
                            onChange={event => {
                                this.refs.vidRef.volume = this.state.volume
                                if (event.target.valueAsNumber === 0)
                                    this.setState({ismute : true})
                                else if (event.target.valueAsNumber < 0.9)
                                    this.setState({ismute : false})
                                else
                                {
                                    this.setState({ismute : false})
                                }
                                this.setState({volume : event.target.valueAsNumber})
                            }}
                        />
                        </VolumeCont>
                    </PauseVolumeSection>
                    <FullSettingSection >
                        <img alt="settings" className="play-pause-button control-bar-buttons" src={settingsIcon} onClick={this.play.bind(this)} />
                        <img alt="full-screen" className="play-pause-button control-bar-buttons" src={fullscreenIcon}  onClick={this.fullscreen.bind(this)}/>
                    </FullSettingSection>
                    {/* <img className="play-pause-button" src={playButtonIcon}  onClick={this.quality.bind(this)}/> */}
                </ControlBar>
                </div>
               
                
                
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