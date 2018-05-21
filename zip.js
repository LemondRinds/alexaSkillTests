var exec = require('child_process').exec,
spawn = require('child_process').spawn,
    tsk = {
		mkZip: [	
			'rm -rf alexaSkill',
			'rm -f alexaSkill.zip',
			'mkdir alexaSkill',
			'cp -r node_modules ./alexaSkill',
			'cp index.js ./alexaSkill',
			'cp appId.js ./alexaSkill',
			'cp package.json ./alexaSkill',
			'cd alexaSkill',
			'zip -r ../alexaSkill.zip *',
			'cd ..',
			'rm -rf alexaSkill'
		]
	}
function doCmd(pindx){
	console.log(tsk.mkZip[pindx]);
	console.log('wait...');
	if(tsk.mkZip[pindx].startsWith('zip')){
		var cmd = spawn('zip',['-r','alexaSkill.zip','node_modules','appId.js','index.js','package.json']);
		cmd.stdout.on('data', (data) => {
		  console.log('stdout: ' + data.toString());
		});
		cmd.stderr.on('data', (data) => {
		  console.log('stderr: ' + data.toString());
		});
		cmd.on('exit', (code) => {
		  console.log('child process exited with code ' + code.toString());
		  console.log('hack zip complete');
		  doCmd(pindx+1);
		});
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
