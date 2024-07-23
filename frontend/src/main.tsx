import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import NavBar from './NavBar/NavBar';

import AllPage from './pages/AllPage/AllPage';
import AboutPage from './pages/TodayPage/TodayPage';

import ErrorPage from './pages/ErrorPage/ErrorPage';


import './index.scss';
import DragAndDropDemoPage from './pages/DragAndDropDemoPage/DragAndDropDemoPage';
import ThreeDayPage from './pages/ThreeDayPage/ThreeDayPage';



ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Router>
			<NavBar />
			
			<main>
				<Routes>
					<Route path="/" element={<Navigate replace to='/all' />} />
					<Route path="/all" element={<AllPage />} />
					<Route path="/today" element={<AboutPage />} />
					<Route path="/demo" element={<DragAndDropDemoPage />} />
					<Route path="/three-day" element={<ThreeDayPage />} />
					
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</main>
				
		</Router>
	</React.StrictMode>,
)
