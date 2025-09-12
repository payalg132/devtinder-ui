# React + Vite

create project : 
# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

tailwing css: 
https://v3.tailwindcss.com/docs/guides/vite

install daisy UI : 
npm i -D daisyui@latest
in tailwind.config.js:
plugins: [
    require("daisyui")
  ],

npm install react-router-dom


deployment : 
node installation : 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
nvm install 22.19.0
sudo nano /etc/nginx/sites-available/default
 location /api/ {
        proxy_pass http://localhost:7777/;
        
        # Extra useful headers
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }


  