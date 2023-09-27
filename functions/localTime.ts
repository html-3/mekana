function localTime(date:string) {
	const dateObj = new Date(date);
	dateObj.getMinutes() === 0 && dateObj.setMinutes(dateObj.getMinutes() - 1);
	return dateObj.toLocaleTimeString(['pt-BR'], { hour: '2-digit', minute: '2-digit' }) //|| '00:00';
}

export default localTime;
