function localDate(date :string) {
	const dateObj = new Date(date);
	dateObj.getMinutes() === 0 && dateObj.setMinutes(dateObj.getMinutes() - 1);
	return dateObj.toLocaleDateString('pt-BR') //|| '00/00/0000';
}

export default localDate;
