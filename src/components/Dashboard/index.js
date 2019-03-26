import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'
import DashboardForAdmin from './dashboard/Dashboard'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,//theme.spacing.unit=8
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	button: {
		margin: theme.spacing.unit,
	},
})
function Dashboard(props) {
	const { classes } = props
	const [quote, setQuote] = useState('')
	const [superAdmin, setSuperAdmin] = useState(null)

	useEffect(
		() => {
			if(firebase.getAuth().getUid()){
				firebase.getCurrentUserQuote().then(setQuote)
				firebase.getDb().doc(`super_admin/${firebase.getAuth().getUid()}`).get().then(setSuperAdmin)
			}
			else
			props.history.replace('/')
		},
		[] 
	  );

	return (
		<div>
			{superAdmin !== null ? (
				<div>
			{superAdmin.exists === true ? (
				<div>
				{/*<main className={classes.main}>
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<VerifiedUserOutlined />
					</Avatar>
					<Typography component="h1" variant="h5">
						Hello { firebase.getCurrentUsername() }
					</Typography>
					<Typography component="h1" variant="h5">
					<Button color="secondary" className={classes.button} onClick={handleClickOpen}>
						Add Roles
					</Button>
					<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
					>
					<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
					<DialogContent>
						<DialogContentText>
						To subscribe to this website, please enter your email address here. We will send
						updates occasionally.
						</DialogContentText>
						<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Email Address"
						type="email"
						fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
						Cancel
						</Button>
						<Button onClick={handleClose} color="primary">
						Subscribe
						</Button>
					</DialogActions>
					</Dialog>
					</Typography>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						onClick={logout}
						className={classes.submit}>
						Logout
					</Button>
				</Paper>
			</main>*/}
			<DashboardForAdmin/>
			</div>
			):(
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<VerifiedUserOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Hello { firebase.getCurrentUsername() }
				</Typography>
				<Typography component="h1" variant="h5">
					Your quote: {quote ? `"${quote}"` : <CircularProgress size={20} />}
				</Typography>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={logout}
					className={classes.submit}>
					Logout
          		</Button>
			</Paper>
		</main>
			)}
			</div>
			):(
				<div id="loader"><CircularProgress /></div>
			)}
			</div>
	)

	function logout() {
		firebase.logout().then(()=>props.history.replace('/'))
	}
}

export default withRouter(withStyles(styles)(Dashboard))