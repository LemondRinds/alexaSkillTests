var spawn = require('child_process').spawn,
    tsk = {
		getCoreModules: [	
			spawn('rm', ['-r', './node_modules']),
			spawn('git', ['stash'])
		]
	}
tsk.getCoreModules.forEach((cmd) => {
	cmd.stdout.on('data', (data) => {
	  console.log('stdout: ' + data.toString());
	});
	cmd.stderr.on('data', (data) => {
	  console.log('stderr: ' + data.toString());
	});
	cmd.on('exit', (code) => {
	  console.log('child process exited with code ' + code.toString());
	});
});
