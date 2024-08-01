import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './NavBar/NavBar';

import AllPage from './pages/AllPage/AllPage';
import TodayPage from './pages/TodayPage/TodayPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ThreeDayPage from './pages/ThreeDayPage/ThreeDayPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import TodoProvider from './providers/TodoProvider';

import './index.scss';
import ThreeDayPageV2 from './pages/ThreeDayPageV2/ThreeDayPageV2';


export default function App() {
	
	
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
						
						<Route path="/three-day-v2" element={<ThreeDayPageV2 />} />
						
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
