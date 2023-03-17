import ReactHlsPlayer from 'react-hls-player';

const DemoVideo = () =>{
    return (
        <ReactHlsPlayer
            src="https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8" 
            autoPlay={true}
            controls={true}
            hlsConfig={{
                maxLoadingDelay: 4,
                minAutoBitrate: 0,
                lowLatencyMode: true,
              }}
        />
    )
}

export default DemoVideo