/* global React, OSLogo, BOOT_TEXT, MONO_FONT */
/* exported BootSequence */
class BootSequence extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			bootStage: 0
		}

		this.logoOpacity = function(){
			switch(this.state.bootStage){
				case 0:
					return 0
				case 1:
					return 1
				case 7:
					return 0
				case 8:
					return 0
				default:
					return 0.3
			}
		}

		this.keyCapture = function(ev){
			if(ev.which === 27 || ev.keycode === 27){
				this.setState({bootStage: 8})
				this.props.completeBoot()
				this.props.completeBootFade()
				for (let i = 0; i < this.timers.length; i++) {
					clearTimeout(this.timers[i])
				}
			}
		}
	}

	componentDidMount(){
		// <script language="JavaScript" type="text/javascript" src="./js/boottext.js"></script>
		const boottext_script = document.createElement("script")
		boottext_script.src = "/js/boottext.js"
		boottext_script.async = true
		document.body.appendChild(boottext_script)

		window.addEventListener("keyup", this.keyCapture.bind(this))

		this.timers = []
		// 500 ms
		this.timers[0] = setTimeout(()=>{
			this.setState({bootStage: 1})
		}, 500)
		// 3s
		this.timers[1] = setTimeout(()=>{
			this.setState({bootStage: 2})
		}, 3000)
		// 3.5s
		this.timers[2] = setTimeout(()=>{
			this.setState({bootStage: 3})
		}, 3500)
		// 10s
		this.timers[3] = setTimeout(()=>{
			this.setState({bootStage: 4})
		}, 10000)
		//12s
		this.timers[4] = setTimeout(()=>{
			this.setState({bootStage: 5})
		}, 12000)
		//14s
		this.timers[5] = setTimeout(()=>{
			this.setState({bootStage: 6})
		}, 14000)
		//16s
		this.timers[6] = setTimeout(()=>{
			this.setState({bootStage: 7})
			this.props.completeBoot()
		}, 16000)
		//17s
		this.timers[7] = setTimeout(()=>{
			this.setState({bootStage: 8})
		}, 17000)
		// 19s
		this.timers[8] = setTimeout(()=>{
			this.props.completeBootFade()
		}, 19000)
	}

	componentWillUnmount(){
		for (let i = 0; i < this.timers.length; i++) {
			clearTimeout(this.timers[i])
		}
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
			transition: "opacity 1s linear, filter 1s linear",
			opacity: (this.state.bootStage<8)?"1":"0",
			filter: (this.state.bootStage<7)?"":"brightness(0)",
			zIndex: 200,
			position: "relative",
			fontSize: "1.5vw" //Fallback in case max+min are unsupported
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
			zIndex: 202,
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
			zIndex: 202,
			pointerEvents: "none",
			animation: "flicker 0.15s infinite",
		}
		let logoContainerStyle={
			transition: (this.state.bootStage > 1)?"opacity 1s linear":"opacity 2s linear",
			opacity: this.logoOpacity()
		}
		let logoStyle={
			width: "60vw",
			animation: "shiftShadow 1.6s infinite"
		}
		
		return(
			<div style={blackscreenStyle}>
				<div style={scanlineStyle} />
				<div style={flickerStyle} />
				<RandomSkew enabled={this.state.bootStage===5}>
					<div style={{margin: "auto"}}>
						<div style={logoContainerStyle}>
							<OSLogo style={logoStyle} color="#FFF"/>
						</div>
					</div>
					<BootSequenceText bootStage={this.state.bootStage}/>
					<BootSequenceBar bootStage={this.state.bootStage} width={80} />
				</RandomSkew>
			</div>
		)
	}
}

BootSequence.propTypes = {
	completeBoot: window.PropTypes.func.isRequired,
	completeBootFade: window.PropTypes.func.isRequired
}

class RandomSkew extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tick: 0
		}

		this.skew = function(){
			if(this.state.tick===0){return 0}
			let r = Math.random()
			if(r<0.8){return 0}
			else {
				return ((r-0.7)*60)*-1
			}
		}

		this.loop = function(){
			let uptick = () => {
				if(this.props.enabled){
					this.setState({tick: this.state.tick+1})
				} else if (this.state.tick){
					this.setState({tick: 0})
				}
				this.loop()
			}
			let randTimeout = Math.round(Math.random()*100+25)
			this.timer = setTimeout(uptick, randTimeout)
		}
	}

	componentDidMount(){
		this.loop()
	}

	componentWillUnmount(){
		clearTimeout(this.timer)
	}

	render() {
		let skew = {
			transform: `skewX(${this.skew()}deg)`,
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			transformOrigin: "bottom"
		}
		return (
			<pre style={skew}>
				{this.props.children}
			</pre>
		)
	}
}

RandomSkew.propTypes = {
	enabled: window.PropTypes.bool,
	children: window.PropTypes.node
}

class BootSequenceText extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tick: 0,
			scrambleTick: 0
		}

		this.logText = function(){
			if(typeof(BOOT_TEXT) == "undefined"){return ""}
			let e = Math.min(this.state.tick, BOOT_TEXT.length)
			return [...BOOT_TEXT].slice(Math.max(e-20,0), e).join("\n")
		}


		this.loop = function(){
			let uptick = () => {
				if(this.props.bootStage===3 || this.props.bootStage===4){
					this.setState({tick: this.state.tick+1})
				}
				if(this.props.bootStage===5){
					this.setState({tick: this.state.tick+1, scrambleTick: this.state.scrambleTick+10})
				}
				this.loop()
			}
			let randTimeout = Math.round(Math.random()*200+25)
			this.timer = setTimeout(uptick, randTimeout)
		}

		this.scramble = function(text){
			if(this.state.scrambleTick==0){return text}
			let scramble = "█+÷~.–<>/\\{}".split("")
			let output = []
			let scrambleCenter = Math.round(text.length*this.state.scrambleTick/100)
			for (let i = 0, n = text.length; i < n; i++) {
				output[i] = text[i]
			}
			for (let i = 0, n = scrambleCenter+(text.length*0.1); i < n; i++) {
				if(text[i]==="\n") {
					output[i]="\n"
				} else if(i<(scrambleCenter-(text.length*0.1))){
					output[i]=text[i]
				} else if(i>text.length){
					output[i]=""
				} else {
					output[i]=scramble[Math.floor(Math.random()*scramble.length)]
				}
			}
			return output.join("")
		}

		this.textShowing = function(){
			return this.scramble(this.logText())
		}
	}

	componentDidMount(){
		this.loop()
	}

	componentWillUnmount(){
		// clearInterval(this.interval)
		clearTimeout(this.timer)
	}

	render() {
		let textStyle = {
			position: "absolute",
			bottom: "2em",
			left: ".5em",
			color: "white",
			display:(this.props.bootStage>2)?"":"none",
			fontSize: "min(max(1.5vw, 3px), 12px)",
			transition: "opacity 1s linear",
			opacity: (this.props.bootStage<6)?"1":"0",
			...MONO_FONT
		}

		return (
			<pre style={textStyle}>
				{this.textShowing()}
			</pre>
		)
	}
}

BootSequenceText.propTypes = {
	bootStage: window.PropTypes.number.isRequired
}

class BootSequenceBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tick: 0,
			scrambleTick: 0
		}

		this.barText = function(){
			if(this.props.bootStage<4){return ""}
			let filled = Math.min(this.state.tick, this.props.width-2)
			let unfilled = this.props.width-(filled+2)
			let percent = Math.round(filled/(this.props.width-2)*100)
			return "["+("|".repeat(filled))+(" ".repeat(unfilled))+"]"+percent+"%"
		}

		this.scramble = function(text){
			if(this.state.scrambleTick==0){return text}
			let scramble = "█+÷~.–<>/\\{}".split("")
			let output = []
			let scrambleCenter = Math.round(text.length*this.state.scrambleTick/100)
			for (let i = 0, n = text.length; i < n; i++) {
				output[i] = text[i]
			}
			for (let i = 0, n = scrambleCenter+(text.length*0.1); i < n; i++) {
				if(text[i]==="\n") {
					output[i]="\n"
				} else if(i<(scrambleCenter-(text.length*0.1))){
					output[i]=text[i]
				} else if(i>text.length){
					output[i]=""
				} else {
					output[i]=scramble[Math.floor(Math.random()*scramble.length)]
				}
			}
			return output.join("")
		}

		this.textShowing = function(){
			return this.scramble(this.barText())
		}

		this.loop = function(){
			let uptick = () => {
				if(this.props.bootStage==4){
					this.setState({tick: this.state.tick+1})
				}
				if(this.props.bootStage==5){
					this.setState({tick: this.state.tick+1, scrambleTick: this.state.scrambleTick+2})
				}
				this.loop()
			}
			let randTimeout = Math.round(Math.random()*50)
			this.timer = setTimeout(uptick, randTimeout)
		}
	}

	componentDidMount(){
		this.loop()
	}

	componentWillUnmount(){
		// clearInterval(this.interval)
		clearTimeout(this.timer)
	}

	render() {
		let textStyle = {
			position: "absolute",
			bottom: "2px",
			left: ".5em",
			color: "white",
			display:(this.props.bootStage>3)?"":"none",
			fontSize: "min(max(1.5vw, 3px), 12px)",
			transition: "opacity 1s linear",
			opacity: (this.props.bootStage<6)?"1":"0",
			...MONO_FONT
		}

		return (
			<pre style={textStyle}>
				{this.textShowing()}
			</pre>
		)
	}
}

BootSequenceBar.propTypes = {
	bootStage: window.PropTypes.number.isRequired,
	width: window.PropTypes.number
}

BootSequenceBar.defaultProps = {
	width: 80
}