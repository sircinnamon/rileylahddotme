class Window extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let windowStyle = {
			display: this.props.isHidden ? "none" : "inline-block",
			minWidth: "40px",
			minHeight: "20px",
			position: "absolute",
			top: Math.min(Math.max(this.props.topPos, 0), window.innerHeight-20) || 0,
			left: Math.min(Math.max(this.props.leftPos, 0), window.innerWidth-40) || 0,
			zIndex: this.props.layer + 100
		};
		let headerStyle = {
			backgroundColor: "rgba(0,0,0,0.9)",
			userSelect: "none",
			color: "rgb(75,75,75)",
			padding: "4px 4px 0px",
			borderRadius: "5px 5px 0px 0px",
			height: "20px"
		};
		if (this.props.isHeld) {
			headerStyle.backgroundColor = "rgba(255,0,0,0.7)";
		}
		let closeButtonStyle = {
			background: "rgba(200, 30, 30, 0.5)"
		};
		let foldButtonStyle = {
			background: "rgba(150, 150, 30, 0.5)"
		};
		let hideButtonStyle = {
			background: "rgba(30, 200, 30, 0.5)"
		};
		let bodyStyle = {
			maxHeight: this.props.isFolded ? "0px" : "",
			overflow: this.props.isFolded ? "hidden" : ""
		};
		return (
			<div style={windowStyle} onMouseDown={this.props.makeActive} onKeyDown={this.props.onKeyDown}>
				<div style={headerStyle} onMouseDown={this.props.grabWindow}>
					{this.props.title}
					<WindowHeaderBtn style={closeButtonStyle} onMouseDown={this.props.close} />
					<WindowHeaderBtn
						style={foldButtonStyle}
						onMouseDown={this.props.toggleFold}
					/>
					<WindowHeaderBtn style={hideButtonStyle} onMouseDown={this.props.hide} />
				</div>
				<div style={bodyStyle}>{this.props.children}</div>
			</div>
		);
	}
}

class WindowHeaderBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let style = {
			height: "10px",
			width: "10px",
			float: "right",
			padding: 0,
			fontSize: "5px",
			margin: "2px",
			borderRadius: "10px",
			background: "rgba(200, 30, 30, 0.7)",
			...this.props.style
		};
		return <div style={style} onMouseDown={this.props.onMouseDown} />;
	}
}

class TerminalWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ""
		};
		
		this.keyPress = function(ev){
			if (ev.which == 13 || ev.keyCode == 13) {
        		this.submitInput()
			}
   		}
		this.submitInput = function(){
			let input = this.state.input
			if(this.props.updateBody){
				let newBody = this.props.bodyChunks
				newBody.push({ string: " $ ", bold: true, color: 0 })
				newBody.push({ string: this.state.input+"\n" })
				this.props.updateBody(newBody)
			}
			this.setState({input: ""})
		}
	}
	
	componentDidUpdate(prevProps) {
		if(this.props.isActive && document.activeElement !== this.termInput){
			this.termInput.focus({preventScroll: true})
		}
	}

	render() {
		let colors = ["#20872b", "#205c87"];
		let prompt = " $ "
		let body = [];
		for (let i = 0; i < this.props.bodyChunks.length; i++) {
			let s = {};
			let c = this.props.bodyChunks[i];
			if (c.color !== undefined) {
				s.color = colors[c.color];
			}
			if (c.bold) {
				s.fontWeight = "bold";
			}
			body.push(<span style={s}>{c.string}</span>);
		}
		let preStyle = {
			backgroundColor: "rgba(0,0,0,0.7)",
			color: "rgb(200,200,200)",
			margin: 0
		};
		let promptStyle = {
			color: colors[0],
			fontWeight: "bold"
		}
		let inputStyle = {
			fontFamily: "monospace",
			color: "rgb(200,200,200)",
		}
		let textboxStyle = {
			display: "block",
			position: "absolute",
			top: 0,
			left: 0,
			opacity: 0,
			pointerEvents: "none"
		}
		return (
			<Window
				title={this.props.title}
				topPos={this.props.topPos}
				leftPos={this.props.leftPos}
				grabWindow={this.props.grabWindow}
				isHeld={this.props.isHeld}
				isHidden={this.props.isHidden}
				isFolded={this.props.isFolded}
				makeActive={this.props.makeActive}
				layer={this.props.layer}
				close={this.props.close}
				toggleFold={this.props.toggleFold}
				hide={this.props.hide}
			>
				<pre style={preStyle}>
					{body}
					<span style={promptStyle}>{prompt}</span>
					<span style={inputStyle}>{this.state.input}</span>
					<input
						type="text"
						value={this.state.input}
						onChange={(ev)=>{this.setState({input: ev.target.value})}}
						style={textboxStyle}
						ref={(input) => { this.termInput = input; }}
						onKeyPress={this.keyPress.bind(this)}
					/>
				</pre>
			</Window>
		);
	}
}