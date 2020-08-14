class OSLogo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let badgeColor = this.props.badgeColor || this.props.color || "#000000";
		let textColor = this.props.textColor || this.props.color || "#000000";
		return (
			<svg style={this.props.style} width="512mm" height="120mm" version="1.1" viewBox="0 0 512 100">
			 <metadata>
				<rdfRDF>
				 <ccWork>
					<dcFormat>image/svg+xml</dcFormat>
				 </ccWork>
				</rdfRDF>
			 </metadata>
			 <path fill={badgeColor} stopColor="#000000" transform="matrix(.26458 0 0 .26458 0 -10)" d="m1142.2 9.957c-39.359 0-71.047 31.686-71.047 71.045v297.85c0 39.359 31.688 71.045 71.047 71.045h486.64c39.359 0 71.045-31.686 71.045-71.045v-297.85c0-39.359-31.686-71.045-71.045-71.045h-486.64zm89.771 36.781c40.707 0 71.486 15.722 92.336 47.162 21.181 31.44 31.77 75.787 31.77 133.04 0 57.585-10.589 102.26-31.77 134.04-20.85 31.44-51.629 47.16-92.336 47.16-40.707 0-71.651-15.72-92.832-47.16-20.85-31.771-31.275-76.45-31.275-134.04 0-57.254 10.426-101.6 31.275-133.04 21.181-31.44 52.125-47.162 92.832-47.162zm302.13 0c50.635 0 91.673 14.894 123.11 44.68l-38.225 44.182c-11.583-9.5976-24.16-16.714-37.728-21.348-13.238-4.9643-26.972-7.4453-41.203-7.4453-15.886 0-28.462 2.9784-37.728 8.9356-8.9357 5.6262-13.402 13.899-13.402 24.82 0 7.2809 1.9857 13.405 5.9571 18.369 4.3023 4.9643 11.252 9.598 20.85 13.9 9.5975 4.3024 23.994 9.4316 43.189 15.389 35.081 10.59 61.059 24.325 77.938 41.203 17.209 16.548 25.814 39.714 25.814 69.5 0 21.512-5.6266 40.54-16.879 57.088s-27.468 29.456-48.648 38.723c-20.85 8.9357-45.672 13.402-74.465 13.402-56.924 0-102.26-16.548-136.02-49.643l41.203-45.672c26.145 23.167 57.089 34.75 92.832 34.75 17.209 0 30.944-3.639 41.203-10.92 10.59-7.6119 15.885-18.037 15.885-31.275 0-12.576-4.4667-22.339-13.402-29.289-8.6048-7.2809-24.822-14.563-48.65-21.844-40.376-12.245-69.004-26.64-85.883-43.188-16.878-16.548-25.316-37.894-25.316-64.039 0-20.519 5.6266-38.392 16.879-53.615 11.583-15.224 27.138-26.807 46.664-34.75 19.857-7.9428 41.864-11.914 66.024-11.914zm-302.13 57.09c-16.548 0-28.794 9.5978-36.736 28.793-7.6118 18.864-11.418 50.304-11.418 94.32 0 45.34 3.8062 77.442 11.418 96.307 7.9428 18.864 20.189 28.297 36.736 28.297 16.878 0 28.957-9.4327 36.238-28.297 7.6119-18.864 11.418-50.966 11.418-96.307 0-44.678-3.9712-76.283-11.914-94.816-7.6118-18.864-19.526-28.297-35.742-28.297zm-0.496 92.336c9.2666 0 17.044 3.1436 23.332 9.4316 6.288 6.2881 9.4316 13.9 9.4316 22.836 0 9.2666-3.1436 17.044-9.4316 23.332-6.2881 6.2881-14.065 9.4316-23.332 9.4316s-17.044-3.1436-23.332-9.4316c-5.9571-6.2881-8.9355-14.065-8.9355-23.332 0-8.9357 2.9784-16.548 8.9355-22.836 6.2881-6.2881 14.066-9.4316 23.332-9.4316z"/>
			 <g strokeWidth="3.0784" fill={textColor}>
				<path d="m13.867 39.357q7.5114-9.851 18.594-9.851 12.437 0 18.347 8.8659t5.9106 24.874q0 15.269-6.7725 24.627-6.7725 9.2353-18.963 9.2353-11.205 0-17.609-8.127l-0.73882 6.7725h-9.1121v-90.998l10.344-1.2314zm14.776 49.378q8.127 0 12.437-6.4031 4.4329-6.4031 4.4329-19.086 0-12.56-3.9404-18.963-3.8172-6.4031-11.452-6.4031-4.9255 0-9.1121 2.9553-4.0635 2.9553-7.1419 7.3882v32.139q2.5859 3.9404 6.4031 6.1568 3.8172 2.2165 8.3733 2.2165z"/>
				<path d="m101.98 0.56846q3.4478 0 5.5412 2.0933 2.0933 1.9702 2.0933 5.1718t-2.0933 5.2949q-2.0933 1.9702-5.5412 1.9702-3.3247 0-5.418-1.9702-1.9702-2.0933-1.9702-5.2949t1.9702-5.1718q2.0933-2.0933 5.418-2.0933zm8.2502 86.935h18.224v8.2502h-48.516v-8.2502h19.948v-48.393h-19.333v-8.2502h29.676z"/>
				<path d="m189.49 3.5237q9.2353 0 17.609 3.4478l-3.3247 7.7576q-6.1568-2.709-13.914-2.709-13.545 0-13.545 10.713v13.176h21.918l-1.1082 8.2502h-20.81v51.594h-10.467v-51.594h-15.392v-8.2502h15.392v-12.929q0-8.7427 6.6494-14.038 6.7725-5.418 16.993-5.418z"/>
				<path d="m268.86 29.506q3.9404 0 9.1121 1.3545l-1.4776 22.042h-8.3733v-13.914h-0.61569q-15.023 0-21.303 21.426v27.336h13.176v8.0039h-33.74v-8.0039h10.22v-48.885h-10.22v-8.0039h17.978l1.9702 15.392q3.9404-8.3733 9.3584-12.56 5.5412-4.1867 13.914-4.1867z"/>
				<path d="m507.97 92.429q-3.3247 2.2165-8.127 3.4478-4.6792 1.2314-9.3584 1.2314-10.22 0-16.008-5.2949-5.7874-5.418-5.7874-14.161v-38.665h-14.9v-8.127h14.9v-14.653l10.344-1.2314v15.885h22.534l-1.3545 8.127h-21.18v38.542q0 5.5412 2.9553 8.2502 2.9553 2.709 9.4816 2.709 6.6494 0 12.437-3.0784z"/>
			 </g>
			</svg>
		)
	}
}