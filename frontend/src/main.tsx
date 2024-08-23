import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import NavBar from './NavBar/NavBar';

import AllPage from './pages/AllPage/AllPage';
import TodayPage from './pages/TodayPage/TodayPage';
import ThreeDayPage from './pages/ThreeDayPage/ThreeDayPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';

import ErrorPage from './pages/ErrorPage/ErrorPage';

import TodoProvider from './providers/TodoProvider';

import './index.scss';


export default function App() {
	
	useEffect(() => {
		
		let title = "Andrey's Todos";
		
		const env = import.meta.env.VITE_ENV;
		if( env ){
			title += ` (${env})`
		}
		document.title = title;
	}, []);
	
	return (
		<TodoProvider>
			<Router>
				<NavBar />
				
				<main>
					<Routes>
						<Route path="/" element={<Navigate replace to='/all' />} />
						
						<Route path="/all" element={<AllPage />} />
						<Route path="/today" element={<TodayPage />} />
						<Route path="/three-day" element={<ThreeDayPage />} />
						<Route path="/calendar" element={<CalendarPage />} />
						
						<Route path="*" element={<ErrorPage />} />
						
					</Routes>
				</main>
					
			</Router>
		</TodoProvider>
	)
}


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
