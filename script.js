const command = document.getElementById('command');
const button_copy = document.getElementById('copy');

document.querySelectorAll('input').forEach(input => {
	input.addEventListener('input', () => {
		//Scan values
		let input_url = document.getElementById('url').value;
		const formats = [document.getElementById('format1').value, document.getElementById('format2').value];
		const input_filename = document.getElementById('filename').value;
		const check_cookies = document.getElementById('cookies').checked;

		//Set Name
		let extension = '%(ext)s';
		let title = input_filename;
		const last = input_filename.lastIndexOf('.')
		if (last != -1) {
			title = input_filename.slice(0, last);
			
			if (input_filename.slice(1 + last) != '')
				extension = input_filename.slice(1 + last);
		}

		//Command for user
		command.textContent = `yt-dlp${check_cookies ? ' -c \"cookies.txt\"' : ''} -f "${formats[0] != '' ? formats[0] : ''}${formats[1] != '' ? ' + ' + formats[1] : ''}"${input_filename != '' ? ` -o "${title}${extension != '' ? '.' + extension : ''}"` : ''} "${input_url}"`;

		//Button activation
		if ([input_url, formats[0]].includes('')) { button_copy.disabled = true; }
		else if (button_copy.disabled) { button_copy.disabled = false; }
	});
});

button_copy.addEventListener('click', () => {
	navigator.clipboard.writeText(command.textContent)
		.then(() => { console.log("Copied to clipboard"); })
		.catch(err => { console.error("Failed to copy text: " + err); });
})