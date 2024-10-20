type SpotifyFrameProps = {
	trackId: string,
	visible: boolean
}

export const SpotifyFrame = ({ trackId, visible }: SpotifyFrameProps ) => {
	// if (!visible) return null
	
	return (
		<iframe 
            style={{ 
				borderRadius: "12px", 
				border: "0px", 
				height: visible ? '80px' : '0px',
				width: visible ? '300px': '0px', 
				position: 'fixed', 
				bottom: '30px',
				right: '30px',
				boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.30)',
				transition: 'height 0.3s ease, width 0.3s ease',
				overflow: 'hidden'
			}} 
            src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator` }
            allow="
				autoplay; 
				clipboard-write; 
				encrypted-media; 
				fullscreen; 
				picture-in-picture
			" 
			loading="lazy"
			scrolling="no"
		/>
	)
};

export default SpotifyFrame; 