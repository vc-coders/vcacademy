import 'date-fns';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Typography, Button, Modal, TextField, CircularProgress, Paper } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FaceIcon from '@material-ui/icons/Face';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import firebase from '../../firebase';
import SimpleTable from './SimpleTable';
import { withRouter } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CounsellorTable from './CounsellorTable';

const drawerWidth = 240;

const styles = theme => createStyles({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  button: {
    padding: theme.spacing.unit ,
    float: 'right',
  },
  buttonInForm: {
    padding: theme.spacing.unit ,
    marginTop: '2%'
  },
  buttonInRole: {
    marginLeft: '2%',
    float: 'right',
  },
  customModel: {
    top: `40%`,
    left: `50%`,
    transform: `translate(-50%,-50%)`,
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  customModelInCounsellor: {
    width: `70%`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    top: '2%',
    bottom:'2%',
    left:theme.spacing.unit * 2 +'%',
    position:'fixed',
    overflowY:'scroll',
    overflowX:'hidden',
  },
  leftInCounsellorForm: {
    float: 'left',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    width: '49%',
  },
  rightInCounsellorForm: {
    float: 'right',
    width: '49%',
    marginLeft: '1%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  CounsellorForm: {
    marginTop: '2%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      marginRight: '0',
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  roleForm: {
    marginTop:'5%',
  },
  paperInRole: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  grid: {
    width: '100%',
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
  },
});

function Dashboard(props)  {
  const { classes } = props;
  const [open, setOpen] = useState(true)
  const [openRole, setOpenRole] = useState(false)
  const [openCounsellor, setOpenCounsellor] = useState(false)
  const [roleName, setRoleName] = useState('')
  const [roleData, setRoleData] = useState('')
  const [counsellorData, setCounsellorData] = useState('')
  const [CounsellorName, setCounsellorName] = useState('')
  const [CounsellorAddress, setCounsellorAddress] = useState('')
  const [CounsellorPassword, setCounsellorPassword] = useState('')
  const [CounsellorConfirmPassword, setCounsellorConfirmPassword] = useState('')
  const [CounsellorDateOfJoining, setCounsellorDateOfJoining] = useState(new Date())
  const [CounsellorDateOfBirth, setCounsellorDateOfBirth] = useState()
  const [CounsellorFatherName, setCounsellorFatherName] = useState('')
  const [CounsellorGender, setCounsellorGender] = useState('')
  const [labelRef, setLabelRef] = useState('')
  const [CounsellorIeltsBand, setCounsellorIeltsBand] = useState('')
  const [CounsellorStudy, setCounsellorStudy] = useState('')
  const [CounsellorEmail, setCounsellorEmail] = useState('')
  const [action, setAction] = useState('dashboard')
  const [selectedIndex, setSelectedIndex] = useState(0)

  function handleDrawerOpen () {
    setOpen(true);
  };

  function handleDrawerClose () {
    setOpen(false);
  };

  function logout() {
		firebase.logout().then(()=>props.history.replace('/'))
  }
  
  function getRoles(){
    setAction('loading');
    firebase.getRoll().then(data=>{
      // console.log(data.docs[0].ref.update({rolename:'hello'}))
      setRoleData(data);
      setAction('roles');
    });
  }
  
  async function getCounsellor(){
    setAction('loading');
    setCounsellorData(await firebase.getCounsellorDetails());
    setAction('Counsellor');
  }

  async function addCounsellorFun() {
		try {
      setOpenCounsellor(false);
      setAction('loading');
      if(CounsellorName === "")
      throw new Error('!! Please Enter Your Name !!');
      if(ValidateEmail(CounsellorEmail) !== true)
      throw new Error('!! Password Not Match !!');
      if(CounsellorPassword !== CounsellorConfirmPassword)
      throw new Error('!! Password Not Match !!');
			await firebase.counsellorRegister(CounsellorName, CounsellorEmail, CounsellorPassword, CounsellorAddress, CounsellorDateOfBirth, CounsellorDateOfJoining, CounsellorFatherName, CounsellorGender, CounsellorIeltsBand, CounsellorStudy)
      setCounsellorData(await firebase.getCounsellorDetails())
      setAction('Counsellor')
      setCounsellorName('')
      setCounsellorAddress('')
      setCounsellorPassword('')
      setCounsellorFatherName('')
      setCounsellorGender('')
      setCounsellorIeltsBand('')
      setCounsellorStudy('')
      setCounsellorEmail('')
      setCounsellorConfirmPassword('')
      setCounsellorDateOfJoining('')
      setCounsellorDateOfBirth('')
		} catch(error) {
      setAction('Counsellor');
      alert(error.message);
      setOpenCounsellor(true);
		}
	}

  function addRoleFun(){
      firebase.addRoll(roleName).then(()=>{
        setOpenRole(false);
        setRoleName('');
        getRoles();
      });
  }

  function removeRoleFun(e){
    setAction('loading');
    firebase.removeRoll(e.currentTarget.id).then(()=>getRoles())
  }

  function ValidateEmail(mail)
  {
    if (/^(([^<>()[\]\\.,;:\s@\n"]+(\.[^<>()[\]\\.,;:\s@\n"]+)*)|(\n".+\n"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(mail).toLowerCase()))
      return true
    else
      return false
  }

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches)
    setOpen(false);
  },[])

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button selected={selectedIndex === 0} onClick={ ()=>{setAction('dashboard');setSelectedIndex(0);} }>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Students"/>
            </ListItem>
            <ListItem button selected={selectedIndex === 1} onClick={ ()=>{setSelectedIndex(1);getRoles();} }>
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary="Roles"/>
            </ListItem>
            <ListItem button selected={selectedIndex === 2} onClick={ ()=>{setSelectedIndex(2);getCounsellor();} }>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Counsellor" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Integrations" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListSubheader inset>Saved reports</ListSubheader>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Current month" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Last quarter" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Year-end sale" />
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {action === "dashboard" &&
            <div>
              <Typography variant="h4" gutterBottom component="h2">
                Students Details
              </Typography>
              <div className={classes.tableContainer}>
                <SimpleTable />
              </div>
            </div>
        }
        {action === "roles" &&
            <div>
              <Typography variant="h4" gutterBottom component="h2">
                Roles
                <Button onClick={()=>setOpenRole(true)} variant="outlined" color="primary" className={classes.button} >
                  Add Roles
                </Button>
                <Modal
                open={openRole}
                onClose={()=>setOpenRole(false)}
              >
                <div className={classes.customModel}>
                  <Typography variant="h6" id="modal-title">
                    Add Roles
                  </Typography>
                  <Typography className={classes.roleForm} color="primary" variant="subtitle1" id="simple-modal-description">
                  <form className={classes.container} onSubmit={(e)=>{e.preventDefault();addRoleFun();}}>
                      Enter Role Name
                    <TextField
                      id="outlined-with-placeholder1"
                      label="Role Name"
                      placeholder="Enter Role Name"
                      className={classes.textField}
                      value={roleName}
                      onChange={(e)=>setRoleName(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    <Button variant="outlined" color="primary" className={classes.buttonInForm} fullWidth onClick={addRoleFun}>
                      Add Roles
                    </Button>
                    </form>
                  </Typography>
                </div>
              </Modal>
              </Typography>
              <div className={classes.tableContainer}>
                <Typography variant="h4" component="h1">
                  {roleData.docs.map(doc=>(
                <Paper key={doc.id} className={classes.paperInRole} elevation={1}>
                  <Typography variant="h5" component="h3">
                    {doc.data().rolename}
                    <Button variant="outlined" color="secondary" id={doc.id} className={classes.buttonInRole} onClick={(e)=>{ removeRoleFun(e) }}>
                    Delete Role
                    </Button>
                  </Typography>
                </Paper>
                  ))}
                </Typography>
              </div>
            </div>
        }
        {action === "Counsellor" &&
        <div>
          <Typography variant="h4" gutterBottom component="h2">
                Counsellor Management
                <Button onClick={()=>setOpenCounsellor(true)} variant="outlined" color="primary" className={classes.button} >
                  Add Counsellor
                </Button>
                <CounsellorTable data={counsellorData}/>
                <Modal
                open={openCounsellor}
                onClose={()=>setOpenCounsellor(false)}
              >
                <div className={classes.customModelInCounsellor}>
                  <Typography variant="h6" id="modal-title">
                    Add Counsellor
                  </Typography>
                  <Typography className={classes.CounsellorForm} color="primary" variant="subtitle1" id="simple-modal-description">
                  <form className={classes.container} onSubmit={(e)=>{e.preventDefault();addCounsellorFun();}}>
                  <div className={classes.leftInCounsellorForm}>
                    <TextField
                      id="outlined-with-placeholder2"
                      label="Name"
                      placeholder="Enter Name"
                      className={classes.textField}
                      value={CounsellorName}
                      onChange={(e)=>setCounsellorName(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      error={CounsellorName === ""}
                      helperText={CounsellorName === "" ? 'Empty field!' : ''}
                    />
                    </div>
                    <div className={classes.rightInCounsellorForm}>
                    <TextField
                      id="outlined-with-placeholder3"
                      label="Email"
                      placeholder="Enter Email"
                      className={classes.textField}
                      value={CounsellorEmail}
                      onChange={(e)=>setCounsellorEmail(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      type="email"
                      required
                      error={CounsellorEmail === "" ? true : ValidateEmail(CounsellorEmail ) !== true ? true : false}
                      helperText={CounsellorEmail === "" ? 'Empty field!' : ValidateEmail(CounsellorEmail ) === true ? '' : 'An Invalid Email Address!' }
                    />
                    </div>
                  <div className={classes.leftInCounsellorForm}>
                    <TextField
                      id="outlined-with-placeholder4"
                      label="Password"
                      placeholder="Enter Password"
                      className={classes.textField}
                      value={CounsellorPassword}
                      onChange={(e)=>setCounsellorPassword(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      type="password"
                      required
                      error={CounsellorPassword === "" ? true : CounsellorPassword === CounsellorConfirmPassword ? false : true }
                      helperText={CounsellorPassword === "" ? 'Empty field!' :  CounsellorPassword === CounsellorConfirmPassword ? '' : '!! Password Not Match !!'  }
                    />
                    </div>


                    <div className={classes.rightInCounsellorForm}>
                    <TextField
                      id="outlined-with-placeholder5"
                      label="Confirm Password"
                      placeholder="Enter Confirm Password"
                      className={classes.textField}
                      value={CounsellorConfirmPassword}
                      onChange={(e)=>setCounsellorConfirmPassword(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      type="password"
                      required
                      error={CounsellorConfirmPassword === "" ? true : CounsellorConfirmPassword === CounsellorPassword ? false : true }
                      helperText={CounsellorConfirmPassword === "" ? 'Empty field!' :  CounsellorConfirmPassword === CounsellorPassword ? '' : '!! Password Not Match !!'  }
                    />
                    </div>

                    <div className={classes.leftInCounsellorForm}>
                    <TextField
                      id="outlined-with-placeholder6"
                      label="Address"
                      placeholder="Enter Address"
                      className={classes.textField}
                      value={CounsellorAddress}
                      onChange={(e)=>setCounsellorAddress(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    </div>


                    <div className={classes.rightInCounsellorForm}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container className={classes.grid} justify="space-around">
                        <DatePicker
                          format="dd/MM/yyyy"
                          variant="outlined"
                          margin="normal"
                          label="Date Of Birth"
                          disableFuture
                          openTo="year"
                          views={["year", "month", "day"]}
                          value={CounsellorDateOfBirth}
                          onChange={setCounsellorDateOfBirth}
                          fullWidth
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    </div>
                    <div className={classes.leftInCounsellorForm}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container className={classes.grid} justify="space-around">
                        <DatePicker
                          format="dd/MM/yyyy"
                          variant="outlined"
                          margin="normal"
                          disableFuture
                          openTo="year"
                          views={["year", "month", "day"]}
                          label="Date Of Joining"
                          value={CounsellorDateOfJoining}
                          onChange={setCounsellorDateOfJoining}
                          fullWidth
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    </div>
                    <div className={classes.rightInCounsellorForm}>
                    <TextField
                      id="outlined-with-placeholder7"
                      label="Father Name"
                      placeholder="Enter Father Name"
                      className={classes.textField}
                      value={CounsellorFatherName}
                      onChange={(e)=>setCounsellorFatherName(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    </div>
                    <div className={classes.leftInCounsellorForm}>
                      <FormControl variant="outlined" fullWidth className={classes.formControl}>
                      <InputLabel 
                      htmlFor="Counsellor-gender"
                      ref={ref => setLabelRef(ReactDOM.findDOMNode(ref))}>
                      Gender
                      </InputLabel>
                      <Select
                        value={CounsellorGender}
                        onChange={(e)=>setCounsellorGender(e.target.value)}
                        input={
                          <OutlinedInput
                          labelWidth={labelRef ? labelRef.offsetWidth : 0}
                          id="Counsellor-gender" />
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value='female'>Female</MenuItem>
                        <MenuItem value='male'>Male</MenuItem>
                      </Select>
                    </FormControl>
                    </div>
                    <div className={classes.rightInCounsellorForm}>
                    <TextField
                      id="outlined-with-placeholder8"
                      label="Ielts Band"
                      placeholder="Enter Ielts Band"
                      className={classes.textField}
                      value={CounsellorIeltsBand}
                      onChange={(e)=>setCounsellorIeltsBand(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    </div>
                    <div className={classes.leftInCounsellorForm}>
                      <FormControl variant="outlined" fullWidth className={classes.formControl}>
                      <InputLabel 
                      htmlFor="Counsellor-study"
                      ref={ref => setLabelRef(ReactDOM.findDOMNode(ref))}>
                      Study
                      </InputLabel>
                      <Select
                        value={CounsellorStudy}
                        onChange={(e)=>setCounsellorStudy(e.target.value)}
                        input={
                          <OutlinedInput
                          labelWidth={labelRef ? labelRef.offsetWidth : 0}
                          id="Counsellor-study" />
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value='academy'>Academy</MenuItem>
                        <MenuItem value='gt'>GT(General Training)</MenuItem>
                      </Select>
                    </FormControl>
                    </div>
                    <Button variant="outlined" color="primary" className={classes.buttonInForm} fullWidth onClick={addCounsellorFun}>
                      Add Counsellor
                    </Button>
                    </form>
                  </Typography>
                </div>
              </Modal>
              </Typography>
            </div>
        }
        {action === "loading" &&
        <div id="loader"><CircularProgress /></div>
        }
        </main>
      </div>
    );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Dashboard));
