DevTinder-Web

DevTinder is a social platform designed specifically for developers to connect, collaborate, and share their passion for coding. 🤖💻

Done So Far-
# Installed React+Vite
# Installed Tailwind Css
# Setted Up Daisy UI
npm install tailwindcss@latest @tailwindcss/vite@latest daisyui@latest

# Created Routes 
# Created Header & Footer

- Installed axios
- CORS - Installed cors in backend => add middleware to with configurations: orgin, credentials: true
- Whenever  making API call so pass axios => { withCredentials: true }
- Installed react-redux + @reduxjs/toolkit 
- configureStore => Provider => createSlice => add reducer to store
- Addrd redux devtools in chrome
- Logined and seen my data is coming properly in the store
- NavBar should update as soon as user logs in
- Refactored our code to add constants file + create a components folder 
- If token is not present, redirect user to login page
- Build Logout Feature
- Get the feed and add the feed in th store
- Build the user card on feed
- Build Edit Profile Feature
- Show Toast Message on save of profile
- New Page - See all my connections
- New Page - See all my Conenction Requests



# Deployment

    - Signup on AWS 
    - Launch instance
    - chmod 400 <secret>.pem
    - ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com
    - Install Node version 16.17.0
    - Git clone
    - Frontend    
        - npm install  -> dependencies install
        - npm run build
        - sudo apt update
        - sudo apt install nginx
        - sudo systemctl start nginx
        - sudo systemctl enable nginx
        - Copy code from dist(build files) to /var/www/html/
        - sudo scp -r dist/* /var/www/html/
        - Enable port :80 of your instance
    - Backend
        - updated DB password
        - allowed ec2 instance public IP on mongodb server
        - npm intsall pm2 -g
        - pm2 start npm --name "devTinder-backend" -- start
        - pm2 logs
        - pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>
        - config nginx - sudo nano /etc/nginx/sites-available/default
        - restart nginx - sudo systemctl restart nginx
        - Modify the BASEURL in frontend project to "/api"



# Ngxinx config: 

        Frontend = http://13.232.171.142/
        Backend = http://13.232.171.142:3001/
    
        Domain name = devtinder.com => 13.232.171.142

        Frontend = devtinder.com
        Backend = devtinder.com:3001 => devtinder.com/api

        nginx config : 

        server_name 13.232.171.142;

        location /api/ {
            proxy_pass http://localhost:3000/;  # Pass the request to the Node.js app
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }


    location / {
    try_files $uri /index.html;
}location / {
    try_files $uri /index.html;
}