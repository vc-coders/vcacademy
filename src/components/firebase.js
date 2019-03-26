import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
// import * as admin from 'firebase-admin'

// var serviceAccount = require('../vcacademy-d5bc0-firebase-adminsdk-n5v8v-3226a9f623.json');


const config = {
	apiKey: "AIzaSyAbd426iVbdNO6GRPjtLlTGjeOg12NUv9g",
    authDomain: "vcacademy-d5bc0.firebaseapp.com",
    databaseURL: "https://vcacademy-d5bc0.firebaseio.com",
    projectId: "vcacademy-d5bc0",
    storageBucket: "vcacademy-d5bc0.appspot.com",
    messagingSenderId: "206470953848"
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	async logout() {
		return await this.auth.signOut()
	}

	async counsellorRegister(name, email, password, address, dateOfBirth, dateOfJoining, fatherName, gender, ieltsBand, study) {
		return await this.db.collection('counsellorUsers').add({
      userName: name,
      userEmail: email,
	  userPassword: password,
	  address,
	  dateOfBirth,
	  dateOfJoining,
	  fatherName,
	  gender,
	  ieltsBand,
	  study
		})
	}

	addCounsellorDetails(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_quote/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	async addRoll(rolename) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}
		return await this.db.collection('roles').add({
			rolename
		})
	}
	
	async getRoll(){
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}
		return await this.db.collection('roles').get()
	}

	async getCounsellorDetails(){
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}
		return await this.db.collection('counsellorUsers').get()
	}

	async removeRoll(uid){
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}
		return await this.db.doc(`roles/${uid}`).delete()
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	getAuth(){
		return this.auth
	}

	getDb(){
		return this.db
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_quote/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()