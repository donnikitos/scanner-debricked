function objectToArray(input, parent = '') {
	let output = [];

	Object.entries(input).forEach(([key, value]) => {
		if (typeof value === 'object' && value !== null) {
			output = [...output, ...objectToArray(value, key)];
		} else {
			const name = parent ? `${parent}[${key}]` : key;

			output.push([name, `${value}`]);
		}
	});

	return output;
}

function objectToFormData(input) {
	const data = new FormData();

	objectToArray(input).forEach(([key, value]) => {
		data.append(key, value);
	});

	return data;
}

export default objectToFormData;
