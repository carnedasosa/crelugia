import './styles/main.css';
import { createApp } from './app.js';
import { playIntro } from './components/loader.js';

playIntro();
createApp(document.getElementById('app'));
