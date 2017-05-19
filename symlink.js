// -----------------------------------------------------------
// version 1.1.0
// @author Nathan Walker
// @author Sean Perkins
// -----------------------------------------------------------
"use strict";

var debugging = true;

var fs = require('fs');
var cp = require('child_process');
var path = require('path');
var base = process.env.PWD;
// The main folder path of the project
var main = {
    app: './src/app',
    assets: './src/assets'
};

// The accessory integrations (Nativescript, Electron, etc.)
var paths = [
    {
        app: './nativescript/src/app',
        assets: './nativescript/src/assets'
    },
    {
        app: './electron/src/app',
        assets: './electron/src/assets'
    }
];

// Root SymLink Code for Windows
if (process.argv.length > 2) {
    if (process.argv[2] === 'symlink') {
        createRootSymLink();
        console.log('Created Symlink');
    }
    return 0;
}

console.log('Configuring...', base);

// remove previous symlinks if they exist
try {
    for (let _path of paths) {
        for (let key of Object.keys(_path)) {
            if (fs.existsSync(resolve(_path[key]))) {
                if (debugging) {
                    console.log('Unlinking', _path[key]);
                }
                fs.unlinkSync(resolve(_path[key]));
            }
        }
    }
} catch (err) {}

// We need to create a symlink
try {
    createSymLink();
} catch (err) {
    if (debugging) {
        console.log('Symlink error: ', err);
    }
    // Failed, and doesn't exist which means they weren't running root; so lets try to get root
    err.code === 'EEXIST' ? console.log('A symlink already exists.') : AttemptRootSymlink();
}

for (let _path of paths) {
    if (!fs.existsSync(resolve(_path.app))) {
        console.log('We were unable to create a symlink  - from -');
        console.log('  ', resolve(main.app), '    - to - ');
        console.log('  ', resolve(_path.app));
        console.log('If you don\'t create this symlink, you will have to manually copy the code each time you change it.');
    }
}
return 0;

/**
 * This will attempt to run the install script as root to make a symlink
 *
 */
function AttemptRootSymlink() {
    if (process.platform === 'win32') {
        var curPath = resolve('./');
        if (debugging) {
            console.log('RootSymlink Base path is', curPath);
        }
        cp.execSync("powershell -Command \"Start-Process 'node' -ArgumentList '" + curPath + "/symlink.js symlink' -verb runas\"");
    } else {
        console.log('Grant root access to create required SymLinks for the Angular Native Seed.');
        cp.execSync(`sudo ln -s ${process.argv[0]} ${process.argv[1]}`);
        //  cp.execSync(`sudo find ${base}${process.argv[0]} -iname '*.ts' -exec ln -s '{}' ${base}${process.argv[1]} \\;`);
    }
}

/**
 * Create the symlink when running as root
 */
function createRootSymLink() {
    var li1 = process.argv[1].lastIndexOf('\\'),
        li2 = process.argv[1].lastIndexOf('/');
    if (li2 > li1) {
        li1 = li2;
    }
    var AppPath = process.argv[1].substring(0, li1);
    var p2 = resolve(`${AppPath}/${main.app}`);

    for (let _path of paths) {
        var p1 = resolve(`${AppPath}/${_path.app}`);
        if (debugging) {
            console.log('Path: ', p1, p2);
        }
        fs.symlinkSync(p2, p1, 'junction');
    }

}

/**
 * Create Symlink
 */
function createSymLink() {
    for (let _path of paths) {
        for (let key of Object.keys(_path)) {
            if (key in main) {
                if (debugging) {
                    console.log('Attempting to Symlink', main[key], _path[key]);
                }
                // cp.execSync(`find ${base}${main[key]} -iname '*.ts' -exec ln -vs '{}' ${base}${_path[key]} \\;`);
                fs.symlinkSync(resolve(main[key]), resolve(_path[key]), 'junction');
            }
        }
    }
}

function splitPath(v) {
    var x;
    if (v.indexOf('/') !== -1) {
        x = v.split('/');
    } else {
        x = v.split("\\");
    }
    return x;
}

function resolve(v) {
    var cwdPath = splitPath(process.argv[1]);
    // Kill the Script name
    cwdPath.length = cwdPath.length - 1;

    var resolvePath = splitPath(v);

    // Eliminate a trailing slash/backslash
    if (cwdPath[cwdPath.length - 1] === "") {
        cwdPath.pop();
    }

    if (v[0] === '/' || v[0] === "\\") {
        cwdPath = [];
    }
    for (var i = 0; i < resolvePath.length; i++) {
        if (resolvePath[i] === '.' || resolvePath[i] === "") {
            continue;
        }
        if (resolvePath[i] === '..') {
            cwdPath.pop();
        } else {
            cwdPath.push(resolvePath[i]);
        }
    }
    if (process.platform === 'win32') {
        var winResult = cwdPath.join("\\");
        if (winResult[winResult.length - 1] === "\\") {
            winResult = winResult.substring(0, winResult.length - 1);
        }
        return winResult;
    } else {
        var result = cwdPath.join('/');
        if (result[0] !== '/') {
            result = '/' + result;
        }
        if (result[result.length - 1] === '/') {
            result = result.substring(0, result.length - 1);
        }
        return result;
    }

}
