dockerize -wait tcp://mysql:3306 -timeout 120s

echo "Start server"

npm start