/* global React */
/* exported MobileSwitch */
class MobileSwitch extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.detectMobile = function(){
			//Url flag for disabling mobileSwitch
			let allowMobile = (new URLSearchParams(window.location.search).get("m")!==null)
			if(!allowMobile){return false}
			//Narrower than 769?
			if(window.innerWidth < 796){return true}
			return false
		}

		this.resizeHandler = function(){
			clearTimeout(this.timeout)
			//Delay handling to prevent rapid firing
			this.timeout = setTimeout(()=>{
				this.forceUpdate()
			}, 150)
		}
	}

	componentDidMount() {
		window.addEventListener("resize", this.resizeHandler.bind(this))
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.resizeHandler.bind(this))
		clearTimeout(this.timeout)
	}

	render() {
		if(this.detectMobile()){
			return this.props.mobileComponent
		} else {
			return this.props.desktopComponent
		}
	}
}

MobileSwitch.propTypes = {
	mobileComponent: window.PropTypes.node,
	desktopComponent: window.PropTypes.node
}