# 🚀 Live Production Deployment Guide

This guide provides step-by-step instructions for deploying the **Nexus CRM** full-stack application (Laravel Backend + React SPA Frontend + Redis + WebSockets) on a production Linux server (Ubuntu 22.04 / 24.04 LTS).

---

## 📋 System Requirements

* **Operating System**: Ubuntu 22.04 LTS or 24.04 LTS
* **Web Server**: Nginx
* **PHP**: PHP 8.2 or 8.3 with extensions: `php8.2-fpm`, `php8.2-cli`, `php8.2-mysql`, `php8.2-redis`, `php8.2-mbstring`, `php8.2-xml`, `php8.2-curl`, `php8.2-zip`
* **Database**: MySQL 8.0+ / MariaDB 10.11+
* **Cache**: Redis (`redis-server`)
* **Node.js**: Node v20 LTS + npm
* **Process Manager**: Supervisor

---

## 🛠️ Step 1: Server Setup & Dependencies

Connect to your VPS via SSH and install the required packages:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx mysql-server redis-server supervisor git curl unzip

# Add PHP PPA and install PHP 8.2 & extensions
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install -y php8.2-fpm php8.2-cli php8.2-mysql php8.2-redis php8.2-mbstring php8.2-xml php8.2-curl php8.2-zip php8.2-bcmath

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

---

## 🗄️ Step 2: Database Setup

Log in to MySQL and create the database and user:

```sql
CREATE DATABASE nexuscrm_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'nexuscrm_user'@'localhost' IDENTIFIED BY 'StrongProductionPassword123!';
GRANT ALL PRIVILEGES ON nexuscrm_prod.* TO 'nexuscrm_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## ⚙️ Step 3: Deploy Backend (Laravel API)

1. **Clone project to web root**:
   ```bash
   sudo mkdir -p /var/www/nexuscrm
   sudo chown -R $USER:www-data /var/www/nexuscrm
   cd /var/www/nexuscrm
   git clone <YOUR_REPOSITORY_URL> .
   ```

2. **Setup Backend Environment**:
   ```bash
   cd /var/www/nexuscrm/backend
   cp .env.example .env
   ```

3. **Edit `.env` for production**:
   ```ini
   APP_NAME="Nexus CRM"
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://crm.yourdomain.com

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nexuscrm_prod
   DB_USERNAME=nexuscrm_user
   DB_PASSWORD=StrongProductionPassword123!

   CACHE_STORE=redis
   QUEUE_CONNECTION=database
   BROADCAST_CONNECTION=reverb

   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379

   REVERB_APP_ID=nexuscrm-app-id
   REVERB_APP_KEY=nexus_crm_ws_key
   REVERB_APP_SECRET=nexus_crm_ws_secret
   REVERB_HOST=crm.yourdomain.com
   REVERB_PORT=443
   REVERB_SCHEME=https
   ```

4. **Install PHP Dependencies & Run Migrations**:
   ```bash
   composer install --no-dev --optimize-autoloader
   php artisan key:generate
   php artisan migrate --force
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

5. **Set Directory Permissions**:
   ```bash
   sudo chown -R www-data:www-data /var/www/nexuscrm/backend/storage /var/www/nexuscrm/backend/bootstrap/cache
   sudo chmod -R 775 /var/www/nexuscrm/backend/storage /var/www/nexuscrm/backend/bootstrap/cache
   ```

---

## 🎨 Step 4: Build & Deploy Frontend (React SPA)

1. **Configure Environment**:
   Edit `/var/www/nexuscrm/frontend/src/config/appConfig.ts`:
   ```typescript
   export const USE_DEMO_AUTH = false;
   export const API_BASE_URL = 'https://crm.yourdomain.com/api';
   export const APP_NAME = 'NexusCRM';

   export const WS_ENABLED = true;
   export const WS_HOST = 'crm.yourdomain.com';
   export const WS_PORT = 443;
   export const WS_APP_KEY = 'nexus_crm_ws_key';
   export const WS_SCHEME = 'wss';
   ```

2. **Build Production Assets**:
   ```bash
   cd /var/www/nexuscrm/frontend
   npm install
   npm run build
   ```
   The compiled static dist output will be in `/var/www/nexuscrm/frontend/dist`.

---

## 🔄 Step 5: Configure Supervisor for Queue & Reverb WebSockets

Create `/etc/supervisor/conf.d/nexuscrm.conf`:

```ini
[program:nexuscrm-reverb]
command=php /var/www/nexuscrm/backend/artisan reverb:start --port=8080
numprocs=1
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/var/log/supervisor/reverb.log

[program:nexuscrm-worker]
command=php /var/www/nexuscrm/backend/artisan queue:work --sleep=3 --tries=3 --max-time=3600
numprocs=2
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/var/log/supervisor/worker.log
```

Start Supervisor:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start all
```

---

## 🌐 Step 6: Configure Nginx & SSL Certificate

Create `/etc/nginx/sites-available/nexuscrm`:

```nginx
server {
    listen 80;
    server_name crm.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name crm.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/crm.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/crm.yourdomain.com/privkey.pem;

    root /var/www/nexuscrm/frontend/dist;
    index index.html;

    # Frontend Single Page App Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Laravel REST API Proxy
    location /api {
        alias /var/www/nexuscrm/backend/public;
        try_files $uri $uri/ @backend;

        location ~ \.php$ {
            fastcgi_split_path_info ^(.+\.php)(/.+)$;
            fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
            fastcgi_index index.php;
            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME /var/www/nexuscrm/backend/public/index.php;
        }
    }

    location @backend {
        rewrite /api/(.*)$ /api/index.php?/$1 last;
    }

    # WebSocket Proxy for Reverb
    location /app/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }
}
```

Enable site & install SSL with Certbot:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d crm.yourdomain.com
sudo ln -s /etc/nginx/sites-available/nexuscrm /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## ✅ Step 7: Verification

1. Access `https://crm.yourdomain.com` in browser.
2. Log in with admin credentials.
3. Open browser DevTools Network tab -> WS filter: verify WebSocket connection to `wss://crm.yourdomain.com/app/nexus_crm_ws_key` is **101 Switching Protocols**.
