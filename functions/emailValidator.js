export default function emailValidator(email) {
  // Are there better regex for e-mail?
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (String(email).match(re)) return true;
	else return false;
}
