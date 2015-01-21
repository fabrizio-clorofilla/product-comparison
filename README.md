# Product Comparison Tool

- Author: <fabrizio.clorofilla@gmail.com>
- Date Created: 19/01/2015

# DEMO URL
http://tinyurl.com/prod-compare
URL parameters available:
- boxes (Integer)
- category (String)

# Git Repo creation
- git init

# Setting up project
1.	Install all required libraries/components/modules

		cd [project folder]
		npm install
		bower install

	If node says "bower ENOGIT git is not installed or not in the PATH"
	Just add git to your path:

		set PATH=%PATH%;c:\Program Files (x86)\Gir\bin\

2.	Start node.js/express.js server

	Go into the server folder and run

		node server.js

3.	Start Grunt server

		grunt serve

4.	Browse the page

	The web application will be available at this link

		http://localhost:9000

# Building project

Building for production (no UAT or other environment set up)

	grunt build

Generated files are:

	/dist/scripts/XXXXXvendor.js
	/dist/scripts/XXXXXscript.js
	/dist/style/XXXXXXmain.css
	/dist/index.html

The generated js files include the HTML template cached into the Angular application

# Technical Specifications

Being a single page application I've chosen to use Angular.js as framework to develop the Product Comparison Tool.

The generator-angulare-feature helped me to set up the project on my machine, creating folder structure, and javascript/css/html files.

I'm using Grunt to handle the dev/build workflow, allowing me to build the template cache, concatenate and minify (as well as a whole set of other tasks) in order to prepare a build for production.

The 'built' version of the tool (link is available on top of this readme) uses a static JSON served via Ajax call, while the dev version gets the JSON from an API held on a Node.js/Express.js platform.
The API is serving the whole config JSON at once (I included two categories of products in this JSON, for demo purposes), but it could be easily configured to serve just one product, if a parameter is sent to the API (not implemented in the current version).

During development, Browersynch has been used to test the app on mobile phones.

# Mobile Version Features

Swipe capabilities have been implemented in the mobile version. You can swipe with your finger on the specs tab (or the selec a product message box) to switch the view into the next or previous tab.
Clicking the arrows will select the next product available for comparison (a product that hasen't been chosen in other tabs).

Some styling issues on Android mobiles, while iPhone should render correctly. Sorry about this but I haven't had time to address this styling issues, I will do so as soon as I can.

























