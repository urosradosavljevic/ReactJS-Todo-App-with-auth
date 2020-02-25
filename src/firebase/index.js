import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  isInitialized() {
    return new Promise(resolve => this.auth.onAuthStateChanged(resolve));
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  getCurrentUserTasks() {
    return this.db
      .collection(`tasks`)
      .where("userId", "==", this.auth.currentUser.uid);
  }
  getCurrentUserProjects() {
    return this.db
      .collection("projects")
      .where("userId", "==", this.auth.currentUser.uid)
      .orderBy("projectId")
      .get();
  }
  deleteCurrentUserProject(docId) {
    return this.db
      .collection("projects")
      .doc(docId)
      .delete();
  }

  addCurrentUserTask(projectId, title, date) {
    return this.db.collection("tasks").add({
      archived: false,
      projectId,
      title,
      date,
      userId: this.auth.currentUser.uid
    });
  }
  archiveTask(id) {
    return this.db
      .collection("tasks")
      .doc(id)
      .update({
        archived: true
      });
  }

  addCurrentUserProject(projectId, name) {
    return this.db.collection("projects").add({
      projectId,
      name,
      userId: this.auth.currentUser.uid
    });
  }
}

export default new Firebase();
