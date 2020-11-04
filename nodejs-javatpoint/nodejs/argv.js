const args = process.argv.slice(2);
args.forEach((value, index, array) => {
	console.log(`${index}: ${value}`);
});
