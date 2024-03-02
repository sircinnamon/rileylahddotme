import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './modules/App'

// Other deps
import css from "./public/styles.css"
import ico from "./public/img/favicon.ico"

const root = createRoot(document.getElementById('root'))
root.render(<App/>);