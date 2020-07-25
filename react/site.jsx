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
				pos: { x: Math.random() * 200, y: Math.random() * 200 },
				id: id,
				title: counter % 2 == 0 ? "Terminal "+id:id,
				folded: false,
				hidden: false,
				type: counter % 2 == 0 ? "terminal" : "default"
			};
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
		};

		this.grabWindow = function (ev, id) {
			this.setState({
				heldWindow: id,
				windowPickupPos: { x: ev.pageX, y: ev.pageX }
			});
			this.makeWindowActive(ev, id);
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
			let newPos = { x: oldPos.x + ev.movementX, y: oldPos.y + ev.movementY };
			let newWindows = { ...this.state.windows };
			newWindows[this.state.heldWindow].pos = newPos;
			this.setState({
				windows: newWindows,
				windowPickupPos: { x: ev.screenX, y: ev.screenY }
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
		window.addEventListener("mouseup", () => {
			this.releaseWindow();
		});
		window.addEventListener("mousemove", (ev) => {
			if (this.state.heldWindow !== undefined) {
				this.moveWindow(ev);
			}
		});
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
				close: (ev) => {
					this.deleteWindow(ev, w[1].id);
				},
				toggleFold: (ev) => {
					this.toggleFoldWindow(ev, w[1].id);
				},
				hide: (ev) => {
					this.hideWindow(ev, w[1].id);
				}
			};
			if (w[1].type === "terminal") {
				let bodyChunks = [
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
				return <TerminalWindow bodyChunks={bodyChunks} {...globalProps} />;
			} else {
				return <Window {...globalProps}>{w[1].children}</Window>;
			}
		});
		return (
			<div>
				<div>
					<button onClick={this.newWindow.bind(this)}>+</button>
					<br />
					{windows}
				</div>
			</div>
		);
	}
}