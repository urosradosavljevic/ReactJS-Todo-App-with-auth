import {useHistory} from "react-router-dom"
import firebase from "../firebase";

export const HomePage = () => {
	const history = useHistory();

	if (!firebase.getCurrentUsername()) {
		// not logged in
		history.replace("/login");
		return null;
	  }else {
		  // logged in
		history.replace("/dashboard");
	  }

	  return null;
}

