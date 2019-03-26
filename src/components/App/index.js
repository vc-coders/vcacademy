import React, { useState, useEffect } from 'react'
import './styles.css'
import Login from '../Login'
import Register from '../Register'
import Dashboard from '../Dashboard'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import firebase from '../firebase'

const theme = createMuiTheme({
	typography: {
	  useNextVariants: true,
	},
  })

export default function App() {

	const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})


	return firebaseInitialized !== false ? (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>
					<Route exact path="/" render={() => (
						firebase.getCurrentUsername()!==null ? (
							<Redirect to="/dashboard"/>
						) : (
							<Login/>
						)
						)}/>
					<Route path="/dashboard" render={() => (
						firebase.getCurrentUsername()!==null ? (
							<Dashboard/>
						) : (
							<Redirect to="/"/>
						)
						)}/>
					<Route path="/register" component={Register} />
				</Switch>
			</Router>
		</MuiThemeProvider>
	) : <div id="loader"><CircularProgress /></div>
}