import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

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

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_quote/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_quote/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()