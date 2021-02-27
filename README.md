# Badger Bytes Spike Exercies

Group: Madison Retaurant COVID-19 Information System  
Team Members: Cecelia Peterson, Harry Le, Matthew McJoynt, Prasoon Sinha, Walt Boettge  

## Project:  
Website allowing customers to order food for pickup. Customers can select food items to build an order, staff can view and prioritize orders, and administrators can update menu items, among other features.  

## Features
* Accounts
    - Customer, Admin, Restaurant Staff **(Completed)**
    - Save/ModifyUsername, Password, Phone number, and Address in Customer account **(Completed)**
* Customer Actions 
    - View Menu **(Completed)**
    - Creating the order **(Completed)**
    - Compile into receipt pdf **(Completed)**
* Admin Actions
    - Add / Modify new menu items (including name, picture, cost, availability) **(Completed)**
    - Print usage reports (byday, week, month, year,fooditem, etc..) **(Not Completed)**
* Restaurant Staff Actions
    - Update menu item from available to sold out / out-of-stock **(Completed)**
    - Print/Prioritize orders **(Completed)**
    - Mark order as complete **(Completed)**
* Customer Payment
    - Save payment type in customer account **(Completed)**
    - “pretend” to use PayPal, Stripe, or Apple Pay transaction **(Completed)**
    - Pick Up Information **(Completed)**
    - Time to pick up order **(Completed)**
    - Car description **(Completed)**
  
## Installation (local development):
Note: some users (especially MacOS users) may run into a dependency issue with fsevents. If running `npm install` results in errors in either step 4 or 6, try the steps listed in the following section

1. Install Git/GitBash (https://git-scm.com/downloads), Node.js (https://nodejs.org/en/) (preferably Node 10.18.x)
2. Reach out to Harry and provide GitHub username for repository access. Accept the invitation for GitHub repo after that.
3. Clone the repository.  
Run: `git clone https://github.com/khoa165/BadgerBytes.git`
4. Change directory to project (either use command or open VSCode at the project folder)  
Run: `cd BadgerBytes`
5. On terminal, check you are on the right working directory by running the following
	Run: `pwd`
	You should see `[whatever path leading up to this]/BadgerBytes`
6. Create .env file for secret information
Run: `touch .env`
7. Paste this in .env  
`MONGO_URI_DEV="..."`  
Reach out to Harry for this URI  
8. Remove the package-lock.json  
Run: `rm package-lock.json`
9. Run: `npm install`  
This will download the packages of the backend to your node_modules folder.
10. Change directory to client  
Run: `cd client`
11. Run: `npm install`
This will download the packages of frontend to your node_modules folder.
12. Change directory back to project
cd ..
13. Launch both the server and client (both backend and frontend) by running:
Run: `npm run dev`
14. If you only want to launch backend (not recommended)
Run: `npm run server`


## Fsevents dependency workaround
Note: the following instructions assume a MacOS environment. Running the brew commands is only necessary if homebrew is installed.  

1. `brew uninstall node` (if this doesn’t work, that means brew was unable to find the path to where your node program lives, which means you probably didn’t use brew to install node either, so you will have to manually uninstall node). Follow the sub steps to do so…
    * `cd /usr/local/bin`
    * `ls` (make sure node, npm, npx are all in this directory)
    * `rm -rf node npm npx`
    * Now you’ve manually removed the binaries for these programs, continue with step 2
2. `brew cleanup`
3. `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash`
4. Check if you have nvm (run `nvm --version`), if you don’t see a number, keep going otherwise skip to step 10
5. Try running nvm (node version manager) --version (if something shows up, skip to step 10, otherwise keep reading)
6. Open up your `.bash_profile` (unless you’ve already redirected your `.bash_profile` to read from your `.bashrc`, in which case open up your `.bashrc file`, if you have no idea what I’m talking about you probably haven’t so just open up your `.bash_profile`). You can do this with by running the following command: `vim ~/.bash_profile` or vim `~/.bashrc`
7. Add the following two lines to your opened dot file…
    * `export NVM_DIR=~/.nvm`
    * `source ~/.nvm/nvm.sh`
8. Now save your dot file, close out of terminal, and re-open terminal
9. Now check your nvm version (`nvm --version`) because by now, you should have nvm installed…
10. Now run nvm ls-remote to see the different node versions you can download
11. `nvm install 10.18`
12. Now go to the client directory in the repo and run npm install (and you should be able to see no errors, maybe vulnerabilities but that is okay)
13. Now go up a directory (`cd ..`) and run `npm run dev` and the client-application should be working for you! 
