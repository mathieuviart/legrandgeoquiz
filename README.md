# LeGrandGeoQuiz

🌍 **Play instantly:** The game is hosted on GitHub Pages and is available for all devices without any installation at:  
👉 **[mathieuviart.github.io/legrandgeoquiz/](https://mathieuviart.github.io/legrandgeoquiz/)**

LeGrandGeoQuiz is now available as a **Progressive Web App (PWA)**, meaning you can install it on your device and play it **100% offline**.

To play the game without an internet connection on your device:
## 📱 Installation & Offline Play

Thanks to the `manifest.json` integration, you can add the game to your home screen or desktop for a native app experience.

### 🍏 iOS (iPhone & iPad)
1. Open **Safari** and navigate to the game URL.
2. Tap the **Share** button (square with an up arrow).
3. Scroll down and select **"Add to Home Screen"**.
4. Open the new icon from your home screen while online once to cache the game.

### 🤖 Android
1. Open **Chrome** and navigate to the game URL.
2. Tap the **three dots (⋮)** in the top right corner.
3. Select **"Install app"** (or "Add to Home screen").
4. The game will now appear in your app drawer like a regular app.

### 💻 Desktop (Windows, Mac, Linux)
1. Open the game in **Chrome** or **Edge**.
2. Look at the right side of the **Address Bar** for a small icon that looks like a computer with an arrow (or a "plus" sign).
3. Click **"Install"**.
4. The game will open in its own standalone window and create a desktop shortcut.
A strategic geography quiz game — 8 countries, 8 categories, the lowest score wins.

**Languages:** FR | EN | UA | DE

## How to Play

1. Each round, a country is presented to the player
2. Assign it to one of the available statistical categories
3. Your score = the country's rank in that category (lower is better)
4. Each category can only be used **once**
5. You have **20 seconds** per country — otherwise: +200 penalty points!
6. **Goal:** minimize your total score

## Game Modes

| Mode | Description |
|------|-------------|
| **Normal** | Country name, flag and hints visible |
| **Hardcore** | Only the flag is visible — name and hints are hidden |
| **Reverse** | Choose the right country for a given category (instead of the other way around) |
| **Daily** | Same seed for all players, renewed daily at midnight. Leaderboard included |
| **Custom** | Configure time, number of countries, select specific countries/categories |

## Categories

40+ statistical categories sourced from official data, including:

- GDP (Total & per capita), Population, Population density
- Peace index, Corruption index, Happiness index
- FIFA rankings (M/F), Rugby ranking, Basketball ranking
- Life expectancy, Fertility rate, Median age, Suicide rate
- Ecological footprint, Forest cover, Gold production
- Olympic medals, Highest point, Alphabetical order
- and more...

## Data Sources

Country statistics are loaded from `country.json` containing rankings for 228 countries across all categories. Data sourced from World Bank, UN, FIFA, World Rugby, FIBA, and other official institutions.

## Technical Stack

- **Frontend:** Single-page HTML5/CSS3/Vanilla JS (no build step)
- **Data:** `country.json` (228 countries, 35+ statistical categories)
- **Fonts:** Syne + DM Mono (Google Fonts)
- **Emoji:** Twemoji for consistent flag rendering
- **Daily API:** Self-hostable Node.js REST API for daily mode (seed, leaderboard, anti-cheat)

## Self-Hosting with Docker Compose

The easiest way to self-host the game with the Daily API:

```bash
git clone https://github.com/joshii-h/legrandgeoquiz.git
cd legrandgeoquiz
cp config.example.js config.js
docker compose up -d
```

The game is available at `http://localhost:8080` and the API at `http://localhost:3000`.

### Custom Domain Setup

If hosting on a custom domain with HTTPS:

1. Edit `config.js` to set your API URL:
   ```js
   window.GEOQUIZ_API = "https://api.yourdomain.com";
   ```

2. Set the `CORS_ORIGINS` environment variable in `docker-compose.yml`:
   ```yaml
   environment:
     - CORS_ORIGINS=https://yourdomain.com
   ```

3. Place a reverse proxy (Traefik, nginx, Caddy) in front for TLS termination.

### Without Docker

```bash
# Serve the game (any static file server works)
python3 -m http.server 8080

# Run the Daily API
cd api && node server.js
```

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/seed` | Today's daily seed token |
| `GET` | `/api/played` | Check if current IP already played today |
| `POST` | `/api/score` | Submit a score `{pseudo, score, seed_date}` |
| `GET` | `/api/leaderboard?date=YYYY-MM-DD` | Top 20 scores for a given day |

## Credits

Original game by [Mathieu VIART](https://github.com/mathieuviart/legrandgeoquiz).
German translation, i18n improvements, and self-hosting setup by [joshii-h](https://github.com/joshii-h).
