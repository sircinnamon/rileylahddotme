/* global React */
/* exported MobileHomeBar */
class MobileHomeBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			buttonHeld: ""
		}

		this.trianglePress = function(){
			console.log("T")
		}
		this.circlePress = function(){
			console.log("C")
			this.props.setView("home")
		}
		this.squarePress = function(){
			console.log("S")
		}
	}

	render() {
		let containerStyle = {
			flex: "0 0 5vh",
			display: "flex",
			width: "100%",
			height: "5vh",
			maxHeight: "50px",
			minHeight: "40px",
			background: "black",
			justifyContent: "space-evenly"
		}
		return (
			<div style={containerStyle}>
				<MobileHomeBarButton
					icon="triangle"
					isHeld={this.state.buttonHeld==="triangle"}
					onTouchStart={()=>{this.setState({buttonHeld: "triangle"})}}
					onTouchEnd={()=>{this.setState({buttonHeld: ""}); this.trianglePress()}}
				>
					<span style={{width: "100%"}}>◀</span>
				</MobileHomeBarButton>
				<MobileHomeBarButton
					icon="circle"
					isHeld={this.state.buttonHeld==="circle"}
					onTouchStart={()=>{this.setState({buttonHeld: "circle"})}}
					onTouchEnd={()=>{this.setState({buttonHeld: ""}); this.circlePress()}}
				>
					<span style={{width: "100%"}}>◉</span>
				</MobileHomeBarButton>
				<MobileHomeBarButton
					icon="square"
					isHeld={this.state.buttonHeld==="square"}
					onTouchStart={()=>{this.setState({buttonHeld: "square"})}}
					onTouchEnd={()=>{this.setState({buttonHeld: ""}); this.squarePress()}}
				>
					<span style={{width: "100%"}}>◼</span>
				</MobileHomeBarButton>
			</div>
		)
	}
}

MobileHomeBar.propTypes = {
	setView: window.PropTypes.func
}

class MobileHomeBarButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		let containerStyle = {
			flex: "1 1 auto",
			color: "white",
			fontSize: "30px",
			lineHeight: "100%",
			textAlign: "center",
			userSelect: "none"
		}
		let bgDiv = {
			width: "40%",
			height: "100%",
			margin: "auto",
			transition: "background .2s, width .2s",
			borderRadius: "5vh",
			display: "flex",
			alignItems: "center"
		}
		if(this.props.isHeld){
			bgDiv.background = "rgba(255, 255, 255, .25)"
			bgDiv.width = "60%"
		}
		return (
			<div
				style={containerStyle}
				onTouchStart={this.props.onTouchStart}
				onTouchEnd={this.props.onTouchEnd}
			>
				<div style={bgDiv}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

MobileHomeBarButton.propTypes = {
	isHeld: window.PropTypes.bool,
	onTouchStart: window.PropTypes.func,
	onTouchEnd: window.PropTypes.func,
	children: window.PropTypes.node
}

MobileHomeBarButton.defaultProps = {
	isHeld: false,
	onTouchStart: ()=>{},
	onTouchEnd: ()=>{}
}