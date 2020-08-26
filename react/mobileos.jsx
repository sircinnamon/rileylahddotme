/* global React, Desktop, BootSequence, MobileHome, MobileHomeBar, FakeSite, BrowserApp */
/* exported MobileOS */
class MobileOS extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			booted: false,
			view: "home",
			appList: {}
		}

		this.newApp = function(content){
			let appSet = this.state.appList
			appSet[content.id] = content
			this.setState({ appList: appSet })
			this.setState({view: content.id})
		}

		this.browserApp = function () {
			let appSet = this.state.appList
			let id = "browser"
			if (appSet[id]) {
				this.setState({view: id})
				return
			}
			let newApp = {
				id: id,
				type: "browser",
				props: {
					startUrl: "rileylahd.me"
				},
				children: (<FakeSite mobile={true} />)
			}
			this.newApp(newApp)
		}

		this.completeBoot = function() {
			this.setState({booted: true, bootFaded: false})
			document.cookie = "bifr0st_booted=true;max-age=86400;"
		}

		this.checkBootCookie = function() {
			if (document.cookie.split(";").some((item) => item.includes("bifr0st_booted=true"))) {
				return true
			}
			return false
		}

		this.clearBootCookie = function() {
			document.cookie = "bifr0st_booted=;"
		}
	}

	componentDidMount() {
		let forceBoot = (new URLSearchParams(window.location.search).get("b")!==null)
		if(forceBoot){
			this.clearBootCookie()
		} else if(this.checkBootCookie()){
			console.log("SKIP BOOT")
			this.setState({booted: true, bootFaded: true})
		}
	}

	render() {
		//Show boot sequence on first visit
		let bootSeq = ""
		if(!this.state.booted || !this.state.bootFaded){
			bootSeq = (
				<BootSequence
					completeBoot={this.completeBoot.bind(this)}
					completeBootFade={()=>{this.setState({bootFaded: true})}}
				/>
			)
		}
		let apps = Object.entries(this.state.appList).map((a) => {
			let globalProps = {}
			if(a[1].type === "browser"){
				return (
					<BrowserApp {...globalProps} {...a[1].props} key={a[1].id} isHidden={this.state.view!=a[1].id}>
						{a[1].children}
					</BrowserApp>
				)
			}
		})
		apps = apps.concat([
			<div key="dummyapp" style={{display: (this.state.view=="test")?"":"none", background: "white", flex: "1 1 auto"}}>
				APP
			</div>
		])
		let iconset = [
			{key: "browser", name: "Browser", image: "/img/browserlogo.svg", open: this.browserApp.bind(this)}
		]
		// console.log(apps)
		return (
			<div
				style={{
					width: "100vw",
					height: "100vh",
					overflow: "hidden",
					position: "absolute",
					top: 0,
					left: 0,
					zIndex: 0
				}}
			>
				{bootSeq}
				<div hidden={this.state.booted===false}>
					<div style={{display: "flex", flexDirection: "column", height: "100%"}}>
						<MobileHome
							open={this.state.view==="home"}
							setView={(id)=>{this.setState({view: id})}}
							icons={iconset}
						/>
						{apps}
						<MobileHomeBar 
							setView={(id)=>{this.setState({view: id})}}
						/>
					</div>
					<Desktop />
				</div>
			</div>
		)
	}
}