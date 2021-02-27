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

1. Clone the repository
2. If node and npm are not installed, install them here: https://nodejs.org/en/download/. (Run `node -v` and `npm -v` to check if they are installed.)
3. Navigate to the directory containing the cloned repository (`.../BadgerBytes/`)
4. In the BadgerBytes directory, run `npm install`
5. Move into the `BadgerBytes/client/` directory
6. Run `npm install` again
7. Move back into the `BadgerBytes` directory
8. Run `npm run dev`
9. If the above steps were successful, a browser window should open at `localhost:3000`

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
