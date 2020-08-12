/* global React, Dock */
/* exported Site */
class Site extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			windows: {},
			heldWindow: undefined,
			windowZOrder: [],
			activeWindow: undefined,
			windowCounter: 0
		};

		this.newWindow = function () {
			let winSet = this.state.windows;
			let counter = this.state.windowCounter;
			let id = "" + (counter + 1);
			let newWindow = {
				pos: {
					x: Math.random() * (window.innerWidth * 0.9),
					y: Math.random() * (window.innerHeight - 200)
				},
				id: id,
				title: counter % 2 == 0 ? "Terminal " + id : id,
				folded: false,
				hidden: false,
				type: counter % 2 == 0 ? "terminal" : "default",
				props: {}
			};
			if (newWindow.type === "terminal") {
				newWindow.props.bodyChunks = [
					{ string: "pi@thor", bold: true, color: 0 },
					{ string: ":" },
					{ string: "~/rileylahddotme ", bold: true, color: 1 },
					{ string: "python3 -m http.server\n" },
					{
						string: "Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...\n"
					},
					{
						string: '10.0.0.117 - - [24/Jul/2020 15:12:40] "GET / HTTP/1.1" 200 -\n'
					},
					{
						string:
							'10.0.0.117 - - [24/Jul/2020 15:12:40] "GET /js/main.js HTTP/1.1" 200 -\n'
					},
					{
						string:
							'10.0.0.117 - - [24/Jul/2020 15:12:40] "GET /js/rileylahddotme-react.min.js HTTP/1.1" 200 -\n'
					},
					{
						string:
							"10.0.0.117 - - [24/Jul/2020 15:12:40] code 404, message File not found\n"
					},
					{
						string:
							'10.0.0.117 - - [24/Jul/2020 15:12:40] "GET /favicon.ico HTTP/1.1" 404 -\n'
					}
				];
			}
			newWindow.children = (
				<div
					style={{
						backgroundColor: "rgba(0,0,0,0.5)",
						height: "250px",
						width: "200px",
						color: "rgb(75,75,75)"
					}}
				>
					Test
				</div>
			);
			winSet[id] = newWindow;
			this.setState({ windows: winSet, windowCounter: counter + 1 });
			this.makeWindowActive(new Event("dummy"), id);
		};

		this.eduWindow = function () {
			let winSet = this.state.windows;
			let counter = this.state.windowCounter;
			let id = "edu";
			if (winSet[id]) {
				winSet[id].folded = false;
				winSet[id].hidden = false;
				this.setState({ windows: winSet });
				this.makeWindowActive(new Event("dummy"), id);
				return;
			}
			let newWindow = {
				pos: { x: Math.random() * 200, y: Math.random() * 200 },
				id: id,
				title: "",
				folded: false,
				hidden: false,
				type: "terminal",
				props: {}
			};
			newWindow.props.bodyChunks = EDU_HISTORY_TERMINAL;
			winSet[id] = newWindow;
			this.setState({ windows: winSet });
		};

		this.ideWorkHistoryWindow = function () {
			let winSet = this.state.windows;
			let counter = this.state.windowCounter;
			let id = "ideWork";
			if (winSet[id]) {
				winSet[id].folded = false;
				winSet[id].hidden = false;
				this.setState({ windows: winSet });
				this.makeWindowActive(new Event("dummy"), id);
				return;
			}
			let newWindow = {
				pos: { x: Math.random() * 200, y: Math.random() * 200 },
				id: id,
				title: "",
				folded: false,
				hidden: false,
				type: "ide",
				props: {}
			};
			newWindow.props.windowHeight = "500px";
			newWindow.props.windowWidth = "700px";
			newWindow.props.defaultCurrentTab = "README.md";
			newWindow.props.files = WORK_HISTORY_IDE;
			winSet[id] = newWindow;
			this.setState({ windows: winSet });
		};

		this.ideSkillsWindow = function () {
			let winSet = this.state.windows;
			let counter = this.state.windowCounter;
			let id = "ideSkills";
			if (winSet[id]) {
				winSet[id].folded = false;
				winSet[id].hidden = false;
				this.setState({ windows: winSet });
				this.makeWindowActive(new Event("dummy"), id);
				return;
			}
			let newWindow = {
				pos: { x: Math.random() * 200, y: Math.random() * 200 },
				id: id,
				title: "",
				folded: false,
				hidden: false,
				type: "ide",
				props: {}
			};
			newWindow.props.windowHeight = "500px";
			newWindow.props.windowWidth = "700px";
			newWindow.props.defaultCurrentTab = "README.md";
			newWindow.props.files = SKILLS_IDE;
			winSet[id] = newWindow;
			this.setState({ windows: winSet });
		};

		this.browserWindow = function () {
			let winSet = this.state.windows;
			let counter = this.state.windowCounter;
			let id = "browser";
			if (winSet[id]) {
				winSet[id].folded = false;
				winSet[id].hidden = false;
				this.setState({ windows: winSet });
				this.makeWindowActive(new Event("dummy"), id);
				return;
			}
			let newWindow = {
				pos: { x: Math.random() * 200, y: Math.random() * 200 },
				id: id,
				title: "",
				folded: false,
				hidden: false,
				type: "browser",
				props: {
					startUrl: "rileylahd.me"
				},
				children: (<FakeSite />)
			};
			// links: github, linkedin, codepen, email, keybase
			winSet[id] = newWindow;
			this.setState({ windows: winSet });
		};

		this.fileExplorerWindow = function () {
			let winSet = this.state.windows;
			let counter = this.state.windowCounter;
			let id = "fileexplorer";
			if (winSet[id]) {
				winSet[id].folded = false;
				winSet[id].hidden = false;
				this.setState({ windows: winSet });
				this.makeWindowActive(new Event("dummy"), id);
				return;
			}
			let newWindow = {
				pos: { x: Math.random() * 200, y: Math.random() * 200 },
				id: id,
				title: "",
				folded: false,
				hidden: false,
				type: "fileexplorer",
				props: {
					startPath: "/home/rlahd",
					fileTree: FILE_TREE_HOBBIES
				}
			};
			winSet[id] = newWindow;
			this.setState({ windows: winSet });
		};

		this.grabWindow = function (ev, id) {
			ev.preventDefault();
			this.makeWindowActive(ev, id);
			if (ev.targetTouches) {
				ev = ev.targetTouches[0];
			}
			this.setState({
				heldWindow: id,
				windowPickupPos: { x: ev.pageX, y: ev.pageY }
			});
		};

		this.releaseWindow = function () {
			this.setState({ heldWindow: undefined });
		};

		this.moveWindow = function (ev) {
			ev.preventDefault();
			if (!this.state.windows[this.state.heldWindow]) {
				this.releaseWindow();
				return;
			}
			let oldPos = this.state.windows[this.state.heldWindow].pos;
			if (ev.targetTouches) {
				ev = ev.changedTouches[0];
				console.log("MOVE", { x: ev.pageX, y: ev.pageX });
				ev.movementX = ev.pageX - this.state.windowPickupPos.x;
				ev.movementY = ev.pageY - this.state.windowPickupPos.y;
			}
			let newPos = { x: oldPos.x + ev.movementX, y: oldPos.y + ev.movementY };
			let newWindows = { ...this.state.windows };
			newWindows[this.state.heldWindow].pos = newPos;
			this.setState({
				windows: newWindows,
				windowPickupPos: { x: ev.pageX, y: ev.pageY }
			});
		};

		this.makeWindowActive = function (ev, id) {
			ev.stopPropagation();
			let zOrder = this.state.windowZOrder;
			zOrder = zOrder.filter((x) => {
				return x !== id;
			});
			zOrder = [...zOrder, id];
			this.setState({
				windowZOrder: zOrder,
				activeWindow: id
			});
		};

		this.startDeleteWindow = function (ev, id) {
			ev.stopPropagation();
			let winSet = this.state.windows;
			winSet[id].closing = true;
			this.setState({
				windows: winSet
			});
			setTimeout(
				(ev, id) => {
					this.deleteWindow(ev, id);
				},
				200,
				ev,
				id
			);
		};

		this.deleteWindow = function (ev, id) {
			ev.stopPropagation();
			let winSet = this.state.windows;
			delete winSet[id];
			let zOrder = this.state.windowZOrder;
			zOrder = zOrder.filter((x) => {
				return x !== id;
			});
			this.setState({
				windows: winSet,
				heldWindow: undefined,
				windowZOrder: zOrder
			});
		};

		this.toggleFoldWindow = function (ev, id) {
			ev.stopPropagation();
			let winSet = this.state.windows;
			winSet[id].folded = !winSet[id].folded;
			this.setState({
				windows: winSet
			});
		};

		this.hideWindow = function (ev, id) {
			ev.stopPropagation();
			let winSet = this.state.windows;
			winSet[id].hidden = true;
			this.setState({
				windows: winSet
			});
		};

		this.showWindow = function (ev, id) {
			ev.stopPropagation();
			let winSet = this.state.windows;
			winSet[id].hidden = false;
			this.setState({
				windows: winSet
			});
		};
	}

	componentDidMount() {
		let releaseWindow = function () {
			this.releaseWindow();
		}.bind(this);
		window.addEventListener("mouseup", releaseWindow);
		window.addEventListener("touchend", releaseWindow);
		let mvWindow = function (ev) {
			if (this.state.heldWindow !== undefined) {
				this.moveWindow(ev);
			}
		}.bind(this);
		window.addEventListener("mousemove", mvWindow);
		window.addEventListener("touchmove", mvWindow);
	}

	render() {
		let windows = Object.entries(this.state.windows).map((w) => {
			let globalProps = {
				title: w[1].title,
				topPos: w[1].pos.y,
				leftPos: w[1].pos.x,
				grabWindow: (ev) => {
					this.grabWindow(ev, w[1].id);
				},
				isHeld: w[1].id === this.state.heldWindow,
				isHidden: w[1].hidden,
				isFolded: w[1].folded,
				makeActive: (ev) => {
					this.makeWindowActive(ev, w[1].id);
				},
				isActive: w[1].id === this.state.activeWindow,
				layer: this.state.windowZOrder.indexOf(w[1].id),
				closing: w[1].closing,
				close: (ev) => {
					this.startDeleteWindow(ev, w[1].id);
				},
				toggleFold: (ev) => {
					this.toggleFoldWindow(ev, w[1].id);
				},
				hide: (ev) => {
					this.hideWindow(ev, w[1].id);
				}
			};
			if (w[1].type === "terminal") {
				return <TerminalWindow {...globalProps} {...w[1].props} />;
			} else if (w[1].type === "ide") {
				return <IDEWindow {...globalProps} {...w[1].props} />;
			} else if (w[1].type === "browser") {
				return (
					<BrowserWindow {...globalProps} {...w[1].props}>
						{w[1].children}
					</BrowserWindow>
				);
			} else if (w[1].type === "fileexplorer") {
				return (
					<FileExplorerWindow {...globalProps} {...w[1].props}></FileExplorerWindow>
				);
			} else {
				return <Window {...globalProps}>{w[1].children}</Window>;
			}
		});
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
				<div>
					<br />
					{windows}
					<Desktop
						clearSelected={() => {
							this.setState({ selectedShortcut: undefined });
						}}
					>
						<DesktopShortcut
							name="Education"
							imgUrl="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/terminal-512.png"
							isSelected={this.state.selectedShortcut === "EducationShortcut"}
							setSelected={() => {
								this.setState({ selectedShortcut: "EducationShortcut" });
							}}
							onDoubleClick={this.eduWindow.bind(this)}
						/>
						<DesktopShortcut
							name="Work History"
							imgUrl="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/terminal-512.png"
							isSelected={this.state.selectedShortcut === "WorkShortcut"}
							setSelected={() => {
								this.setState({ selectedShortcut: "WorkShortcut" });
							}}
							onDoubleClick={this.ideWorkHistoryWindow.bind(this)}
						/>
						<DesktopShortcut
							name="Skills"
							imgUrl="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/terminal-512.png"
							isSelected={this.state.selectedShortcut === "SkillsShortcut"}
							setSelected={() => {
								this.setState({ selectedShortcut: "SkillsShortcut" });
							}}
							onDoubleClick={this.ideSkillsWindow.bind(this)}
						/>
						<DesktopShortcut
							name="Browser"
							imgUrl="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/terminal-512.png"
							isSelected={this.state.selectedShortcut === "BrowserShortcut"}
							setSelected={() => {
								this.setState({ selectedShortcut: "BrowserShortcut" });
							}}
							onDoubleClick={this.browserWindow.bind(this)}
						/>
						<DesktopShortcut
							name="Files"
							imgUrl="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/terminal-512.png"
							isSelected={this.state.selectedShortcut === "FileShortcut"}
							setSelected={() => {
								this.setState({ selectedShortcut: "FileShortcut" });
							}}
							onDoubleClick={this.fileExplorerWindow.bind(this)}
						/>
					</Desktop>
					<Dock>
						<DockButton onClick={this.newWindow.bind(this)}>
							<img
								src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/terminal-512.png"
								style={{
									height: "55px"
								}}
							/>
						</DockButton>
						<DockButton
							onClick={this.eduWindow.bind(this)}
							isOpen={this.state.windows.edu}
						>
							<img
								src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/terminal-512.png"
								style={{
									height: "55px"
								}}
							/>
						</DockButton>
						<DockButton
							onClick={this.ideWorkHistoryWindow.bind(this)}
							isOpen={this.state.windows.ideWork}
						>
							<img
								src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/terminal-512.png"
								style={{
									height: "55px"
								}}
							/>
						</DockButton>
						<DockButton
							onClick={this.ideSkillsWindow.bind(this)}
							isOpen={this.state.windows.ideSkills}
						>
							<img
								src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/terminal-512.png"
								style={{
									height: "55px"
								}}
							/>
						</DockButton>
						<DockButton
							onClick={this.browserWindow.bind(this)}
							isOpen={this.state.windows.browser}
						>
							<img
								src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/terminal-512.png"
								style={{
									height: "55px"
								}}
							/>
						</DockButton>
						<DockButton
							onClick={this.fileExplorerWindow.bind(this)}
							isOpen={this.state.windows.fileexplorer}
						>
							<img
								src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/terminal-512.png"
								style={{
									height: "55px"
								}}
							/>
						</DockButton>
					</Dock>
				</div>
			</div>
		);
	}
}