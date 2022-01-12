chmod +x ./install.sh

cd ../server/
npm install
cp .env.example .env

cd ../client/quizmaster/
npm install
cp .env.example .env

cd ../scoreboard/
npm install
cp .env.example .env

cd ../team/
npm install
cp .env.example .env
