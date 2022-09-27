
// 这里用child_process会报错，暂未找到原因。改用shelljs
const shell = require("shelljs");
const fs = require("fs");
const appsPath = "./apps";



// 安装所有主应用和子应用的依赖
function allInstall() {
  shell.exec(`cd main && cnpm i`, { async: true });
  fs.readdir(appsPath, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      files.forEach(function (file) {
        shell.exec(`cd ${'apps/'+file} && cnpm i`, { async: true });
      });
    }
  });
}

// 安装所有主应用和子应用的依赖
function allInstall() {
  shell.exec(`cd main && cnpm i`, { async: true });
  fs.readdir(appsPath, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      files.forEach(function (file) {
        shell.exec(`cd ${'apps/'+file} && cnpm i`, { async: true });
      });
    }
  });
}

// 启动所有主应用和子应用的服务
function allStart() {
  shell.exec(`cd main && npm run serve`, { async: true });
  fs.readdir(appsPath, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      files.forEach(function (file) {
        shell.exec(`cd ${'apps/'+file} && npm run serve`, { async: true });
      });
    }
  });
}




// 这里根据命令行参数来执行对应的函数
for (var i=0; i<process.argv.length;i++) {
  switch (process.argv[i]) {
    case 'allStart':
      allStart();
      break;
    case 'allInstall':
      allInstall();
      break;
  }
}

module.exports.allStart = allStart
module.exports.allInstall = allInstall