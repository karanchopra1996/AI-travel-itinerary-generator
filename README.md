# AI Travel Intinerary Generator
This project is a **Travel AI Generator** app built with **Next.js** and **OpenAI**. The app allows users to generate a 3-day travel itinerary based on their selected state and city in the USA. The app uses dynamic data from OpenAI's GPT-3.5 model to generate an itinerary based on the user's input.

### Features
- **State and City Selection**: Users can select a state and city from a dropdown list of cities in the USA.
- **Number of Days**: Users can specify the number of days for the trip.
- **AI-Generated Itinerary**: Once the user selects their desired trip details, the app generates a customized travel itinerary using OpenAI’s GPT-3.5 model.
- **Client-Side Rendering**: Dynamic data such as cities are rendered only after the component mounts to avoid hydration issues.

### Tech Stack
- **Frontend**: React, Next.js, `react-select` for dropdown menus
- **Backend**: OpenAI's GPT-3.5 API to generate itineraries
- **Styling**: Tailwind CSS (optional, for styling)

## Installation

### 1. Clone the Repository

  First, clone the repository to your local machine:
  git clone https://github.com/yourusername/travel-ai-generator.git
  #### cd travel-ai-generator
### 2. Install Dependencies
Run the following command to install the required dependencies:
#### npm install
### 3. Set up .env.local
Create a .env.local file at the root of the project to store your OpenAI API key:
env
#### OPENAI_API_KEY=your_openai_api_key_here
You can get your OpenAI API key by signing up at OpenAI.

## Development
### 1. Run the Development Server
After installing the dependencies and setting up the environment variables, start the development server:
#### npm run dev
You can now visit the app at http://localhost:3000 to start using it.

### 2. Using the App
- Select state: Choose a state from the dropdown list.
- Select city: Once the state is selected, choose a city from the corresponding list of cities in that state.
- Enter number of days: Input the number of days for your trip.
- Generate your itinerary: Click on the "Generate My Trip" button to generate a travel itinerary using OpenAI's GPT-4 model.

## Structure
### 1. Frontend (React + Next.js)
- pages/index.js: The main UI where users can select a state, city, and number of days for their trip.
- components/Select.js: The react-select dropdown components for selecting the state and city.
- pages/api/generate-itinerary.js: The API route that handles generating the travel itinerary using OpenAI's GPT-3 model.
### 2. Backend (OpenAI GPT-3.5)
- lib/openai.js: The OpenAI client that interacts with the GPT-3.5 API.
pages/api/generate-itinerary.js: The API route that sends the trip details to the OpenAI API and returns the generated itinerary.
