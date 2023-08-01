# Start mongodb service (port: 27018 --> config in /usr/local/etc/mongod.conf)
brew services start mongodb-community@6.0

# Wait for it to be up before loading data
./utils/wait-for-it.sh 127.0.0.1:27018 --strict --timeout=10 -- echo "MongoDB is up"

# Load data inside mongodb
mongorestore --host=127.0.0.1:27018 -d aws-project-db -c users ./db-data/aws-project-db/users.bson
mongorestore --host=127.0.0.1:27018 -d aws-project-db -c fields ./db-data/aws-project-db/fields.bson
mongorestore --host=127.0.0.1:27018 -d aws-project-db -c bookings ./db-data/aws-project-db/bookings.bson