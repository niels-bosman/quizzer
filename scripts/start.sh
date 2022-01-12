chmod +x ./start.sh

cd ../server/
gnome-terminal --tab -- npm run start

cd ../client/quizmaster/
gnome-terminal --tab -- npm run start

cd ../scoreboard/
gnome-terminal --tab -- npm run start

cd ../team/
gnome-terminal --tab -- npm run start
