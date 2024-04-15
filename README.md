[![Netlify Status](https://api.netlify.com/api/v1/badges/33858cad-917e-4b25-ac35-c23157bc7e7d/deploy-status)](https://app.netlify.com/sites/agroreach/deploys)
# Overview
This web app is to monitor the health of the plants by gathering data from sensors connected to Raspberry Pi 4. The web app will also notify the users if any of the plants can be harvested. This web app is suitable for mobile devices only.

# Link
1. The web app can be accessed [here](https://agroreach.netlify.app)
2. The Express Js can be accessed [here](https://github.com/Stygian84/CapstoneAWSNodeJs/tree/main)

# Versions
**Windows:** 10 Version 22H2 (OS Build 19045.4170)  
**Node :** v20.11.0  
**npm :** v10.2.3

### Browsers Tested
1. Opera GX : LVL5 (core: 107.0.5045.86)
2. Chrome : Version 123.0.6312.106 (Official Build) (64-bit)
3. Edge : Version 123.0.2420.81 (Official build) (64-bit)

# Getting Started for Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How To Run Development
### 1. Install Node.js and npm
Node.js can be downloaded from [here](https://nodejs.org/en/download).  
Installation guide can be found in this [blog](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac).
### 2. Check if Node.js and npm are installed properly
Go to command prompt (press `Win Key + X` , then press `a`). 

```
node -v  
npm -v
```
It should output the installed versions
```
v20.11.0
10.2.3
```
### 3. Git Clone and Install Necessary Modules
Git clone this repo  
Go to the root project directory and run `npm install`
```shell
git clone https://github.com/Stygian84/CapstoneWebApp.git
cd CapstoneWebApp
npm install
```
### 4. Place `.env` file in root directory and Run `npm start`
Place `.env` file in the root project directory (inside BookSwap folder).  
Then, to start development process, run 
```
npm start
```
This should be the expected output
```
Compiled successfully!

You can now view BookSwap in the browser.        

  Local:            http://localhost:3000        
  On Your Network:  http://10.32.50.156:3000     

Note that the development build is not optimized.
To create a production build, use npm run build. 

webpack compiled successfully
```
### 5. Finish
The web app should open automatically on your default browser.  
If it doesn't open automatically, 
open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# IMPORTANT

1. Create `.env` file with `REACT_APP_RENDER_URL` parameter ( which is the link to site that can host Node JS / Express JS )

# Devices

Targeted Device : IPhone 13 & 14 (390px x 844px)

# Demo

![](https://github.com/Stygian84/CapstoneWebApp/blob/master/docs/image/Desktop%202023.11.22%20-%2011.27.21.01.gif)

# Notable Features

1. Recent visited pages in the homepage.
2. Real-time Weather.  
3. Notifaction when plants are ready to harvest.
4. Data of the past days.
5. Real-time images.

# How to Host on Netlify
1. Link this Github Link to Netlify.
2. Insert `CI= npm run build` as the build command.
3. Insert value for `REACT_APP_RENDER_URL` in the environment variables.
