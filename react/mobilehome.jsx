/* global React */
/* exported MobileHome */
class MobileHome extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	render() {
		let containerStyle = {
			flex: "1 1 auto",
			display: (this.props.open)?"grid":"none",
			width: "100%",
			background: "rgba(0,0,0,0.2)",
			gridTemplateRows: "5vh 11.25vh 11.25vh 11.25vh 11.25vh 11.25vh 11.25vh 5vh",
			gridTemplateColumns: "5vw 18vw 18vw 18vw 18vw 18vw 5vw"
		}
		let icons = []
		for (let i = 0; i < this.props.icons.length; i++) {
			let icon = this.props.icons[i]
			let gridX = i%5 + 2
			let gridY = Math.floor(i/5) + 2
			icons = icons.concat([(
				<AppIcon
					key={icon.key}
					gridX={gridX}
					gridY={gridY}
					name={icon.name}
					imgUrl={icon.image}
					onClick={icon.open}
				/>
			)])
		}
		for (let i = icons.length; i < 30; i++) {
			let gridX = i%5 + 2
			let gridY = Math.floor(i/5) + 2
			icons = icons.concat([(
				<AppIcon
					key={i}
					gridX={gridX}
					gridY={gridY}
					name="Terminal"
					imgUrl="/img/terminalicon.svg"
					onClick={()=>{console.log("LAUNCH")}}/>
			)])
		}
		return (
			<div style={containerStyle}>
				{icons}
			</div>
		)
	}
}

MobileHome.propTypes = {
	open: window.PropTypes.bool,
	icons: window.PropTypes.arrayOf(
		window.PropTypes.shape({
			key: window.PropTypes.string.isRequired,
			name: window.PropTypes.string.isRequired,
			image: window.PropTypes.string.isRequired,
			open: window.PropTypes.func.isRequired
		})
	)
}

MobileHome.defaultProps = {
	icons: []
}

class AppIcon extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			held: false
		}

		this.tap = function(){
			this.setState({held: true})
		}

		this.release = function(){
			this.setState({held: false})
			if(this.props.onClick){
				setTimeout(()=>{this.props.onClick()}, 200)
			}
		}
	}

	render() {
		let iconDivStyle = {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "space-evenly"
		}
		let imgStyle = {
			objectFit: "contain",
			margin: "auto",
			display: "block",
			userSelect: "none",
			width: "65%",
			flex: "1 1 auto",
			transition: "transform 0.1s",
			transform: (this.state.held)?"scale(1.2)":""
		}
		let labelStyle = {
			color: "white",
			fontSize: "10px",
			flex: "1 1 auto",
			maxWidth: "100%",
			overflow: "hidden"
		}
		return (
			<div
				style={{...iconDivStyle, gridColumnStart: this.props.gridX, gridRowStart: this.props.gridY}}
				onMouseDown={()=>{this.tap()}}
				onTouchStart={()=>{this.tap()}}
				onMouseUp={()=>{this.release()}}
				onTouchEnd={()=>{this.release()}}
			>
				<img style={imgStyle} src={this.props.imgUrl} draggable="false" />
				<label style={labelStyle}>{this.props.name}</label>
			</div>
		)
	}
}

AppIcon.propTypes = {
	onClick: window.PropTypes.func,
	gridX: window.PropTypes.number,
	gridY: window.PropTypes.number,
	imgUrl: window.PropTypes.string,
	name: window.PropTypes.string
}

AppIcon.defaultProps = {
	imgUrl: "/img/terminalicon.svg",
	name: "App"
}
