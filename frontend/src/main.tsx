import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './NavBar/NavBar';

import AllPage from './pages/AllPage/AllPage';
import AllPageOld from './pages/AllPageOld/AllPageOld';

import ErrorPage from './pages/ErrorPage/ErrorPage';

import CalendarPageOld from './pages/CalendarPageOld/CalendarPageOld';
import TodoProvider from './providers/TodoProvider';

import './index.scss';


import ThreeDayPageOld from './pages/ThreeDayPageOld/ThreeDayPageOld';
import TodayPageOld from './pages/TodayPageOld/TodayPageOld';
import TodayPage from './pages/TodayPage/TodayPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import ThreeDayPage from './pages/ThreeDayPage/ThreeDayPage';



export default function App() {
	
	
	return (
		<TodoProvider>
			<Router>
				<NavBar />
				
				<main>
					<Routes>
						<Route path="/" element={<Navigate replace to='/all' />} />
						
						<Route path="/all-old" element={<AllPageOld />} />
						<Route path="/all" element={<AllPage />} />
						
						<Route path="/today-old" element={<TodayPageOld />} />
						<Route path="/today" element={<TodayPage />} />
						
						<Route path="/three-day-old" element={<ThreeDayPageOld />} />
						<Route path="/three-day" element={<ThreeDayPage />} />
						
						<Route path="/calendar-old" element={<CalendarPageOld />} />
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
