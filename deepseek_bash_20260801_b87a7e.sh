# Navigate to the backend folder
cd solitaire-finz-mart-backend

# Install dependencies
npm install

# Create uploads folder
mkdir uploads

# Start MongoDB (in another terminal)
mongod

# Seed sample leads
npm run seed

# Start the server
npm start
# or for development
npm run dev