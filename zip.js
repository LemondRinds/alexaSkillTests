var exec = require('child_process').exec,
spawn = require('child_process').spawnSync,
    tsk = {
		mkZip: [	
			'rm -rf zipTmp',
			'rm -f alexa.zip',
			'node getnm',
			'mkdir zipTmp',
			'cp -r node_modules ./zipTmp',
			'cp index.js ./zipTmp',
			'cp appId.js ./zipTmp',
			'cp package.json ./zipTmp',
			'zip -r alexa.zip zipTmp',
		]
	}
function doCmd(pindx){
	console.log(tsk.mkZip[pindx]);
	console.log('wait...');
	if(tsk.mkZip[pindx].startsWith('zip')){
		var cmd = spawn('zip',['-r', 'alexa.zip', 'zipTmp']);
		cmd.stdout.on('data', (data) => {
		  console.log('stdout: ' + data.toString());
		});
		cmd.stderr.on('data', (data) => {
		  console.log('stderr: ' + data.toString());
		});
		cmd.on('exit', (code) => {
		  console.log('child process exited with code ' + code.toString());
		});
		console.log('hack zip complete');
	}else{
		exec(tsk.mkZip[pindx], (err, stdout, stderr) => {
			if(err){
				console.error('err: ' + err.toString());
				return;
			}
			console.log('stdout: ' + stdout.toString());
			console.log('stderr: ' + stderr.toString());
			if(pindx != tsk.mkZip.length - 1){
				doCmd(pindx+1);
			}
		});
	}
}
var indx = 0;
doCmd(indx);
