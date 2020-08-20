/* global React, MobileSwitch, OS, MobileOS */
/* exported Site */
class Site extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		let desktopView = <OS />
		let mobileView = <MobileOS />
		return <MobileSwitch mobileComponent={mobileView} desktopComponent={desktopView} />
	}
}
