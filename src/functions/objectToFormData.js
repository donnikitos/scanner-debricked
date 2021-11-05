function objectToFormData(input) {
	const data = new FormData();

	Object.entries(input).forEach(([key, value]) => {
		data.append(key, value);
	});

	return data;
}

export default objectToFormData;
