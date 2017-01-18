# screenserver

A horrible hack to serve images across a network for display via screensaver.

## Never Asked Questions

_Why?_

I wanted to implement a screensaver setup that turned a multi-screen configuration into something like Razor and Blade's nightclub on the movie 'Hackers'. [Archillect](http://archillect.com/) has an excellent selection of cyberpunk-esque animated .gifs but the built-in screensavers on MacOS only show static images. Archillect itself has an excellent ["TV" mode](http://archillect.com/tv) but that pulls from a constantly updated stream of animated images and requires an active Internet connection.

screenserver allows you to run a number of independent displays from a curated list of images while being offline. It was written in less time than it took to write this README.

_Why is it written in NodeJS?_

Good point. I should have written it in Python but wanted to learn a little about NodeJS.

_What Operating Systems does it run on?_

Any system that has a NodeJS interpreter.

_What does it do?_

It runs a web server on a configured port and delivers a random image from a local directory, embedded in a simple HTML template and maximized to the screen size as much as possible.

## Installation

1. Install [NodeJS](https://nodejs.org).

2. Download a selection of images and place them in a directory.

3. Configure the ip address, port, and image directory in screenserver.js.

4. Run `node screenserver.js`.

5. Configure a screensaver to connect to the server and enjoy.

## Configuration for Mac OS

While there are many ways to use this simple tool, I used [webviewscreensaver](https://github.com/liquidx/webviewscreensaver) to display the output of screenserver.

screenserver is run as a daemon by putting the following in a file called `local.screenserver.plist` in `/Library/LaunchDaemons/` (root required), customizing "UserName" and "WorkingDirectory" as appropriate. 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>local.screenserver.plist</string>

    <key>UserName</key>
    <string>[USERNAME]</string>

    <key>WorkingDirectory</key>
    <string>[PATH_TO_SCRIPT_DIR]</string>

    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/node</string>
        <string>screenserver.js</string>
    </array>

    <key>RunAtLoad</key>
    <true/>

    <key>KeepAlive</key>
    <true/>

</dict>
</plist>
```

You can then load the service with:

`sudo launchctl load /Library/LaunchDaemons/local.screenserver.plist`

and start it with:

`sudo launchctl start local.screenserver.plist`

If you want to stop screenserver running, you can do so with `sudo launchctl unload /Library/LaunchDaemons/local.screenserver.plist`
