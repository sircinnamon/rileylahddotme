class BootSequence extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount(){
		setTimeout(()=>{
			this.props.completeBoot()
		}, 20000)
	}

	render() {
		let blackscreenStyle = {
			background: "rgb(31, 31, 31)",
			height: "100vh",
			width: "100vw",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			animation: "textShadow 1.6s infinite",
		}
		// These effects courtesy of http://aleclownes.com/2017/02/01/crt-display.html
		let scanlineStyle = {
			display: "block",
			position: "absolute",
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
			zIndex: 2,
			backgroundSize: "100% 2px, 3px 100%",
			pointerEvents: "none",
		}
		let flickerStyle = {
			display: "block",
			position: "absolute",
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			background: "rgba(18, 16, 16, 0.1)",
			opacity: 0,
			zIndex: 2,
			pointerEvents: "none",
			animation: "flicker 0.15s infinite",
		}
		return(
			<div style={blackscreenStyle}>
				<div style={scanlineStyle} />
				<div style={flickerStyle} />
				<div style={{margin: "auto"}}>
					<OSLogo style={{width: "60vw", animation: "shiftShadow 1.6s infinite",}} color="#FFF"/>
					<pre style={{color: "white"}}>test</pre>
				</div>
			</div>
		)
	}
}