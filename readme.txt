1.	Definition
A chrome extension that collects pointer behavior inside a web page, saves them locally during an active session, and sends them to a server to be saved permanently for analysis.
What does PINATA stand for? Pointing Interaction Notifications and AdapTAtions. 

2.	What does Pinata do?
a.	Gathering: Pinata collects in-browser cursor movement and behaviors (see section 4). 
b.	Time: The concept of time in Pinata. What this document refers to as a session is the time when a page is loaded until the browser navigates away from it, going to another link or even refreshing that page. “User Session” is the time from when the user starts using Pinata until they either reload the extension, clear the local storage, or use the “reset” function on the options page (see img-2).   
c.	Stats: Current version of Pinata shows the number of clicks made, and slips made under the “See my stats” option in the popup window (see img-1). 
d.	Options: The options page (see img-2) 
i.	Sliders: the user has 2 sliders to set the threshold of slips/ clicks. The first one is for when they want the extension to notify them, the second is for when they want the extension to deploy an adaptation (in this version the adaptation is a zoom adaptation) to aid them with their pointing. 
ii.	Notifications: The user can select which notification design(s) they would to be used to notify them when the click/slip threshold is passed. 
iii.	Download: Download the current session data as .JSON file.
iv.	Reset: Clear all saved data and settings including the user ID.

3.	Installation Instructions 
a.	Open chrome
b.	Go to this URL: chrome://extensions/
c.	Enable Developer mode
d.	Load unpacked extensions
e.	Choose the the Pinata folder (Wherever you have it saved)
