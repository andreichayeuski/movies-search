# Movie Search Application

## Description

The purpose of this application is to provide users with a platform to manage their personal movie collection. Users can add, view, update and delete movies, as well as track their watched status, personal notes and ratings.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Functionality
- Implementation of a search function to quickly find movies by title, director, or release year.
- Ability to add found movies to a collection.
- Displaying a list of all movies in the collection with their details, including title, director, genre, and watched status.
- View details about a particular movie in the collection, including its description, poster image, and user ratings.
- Ability to mark a movie in the collection as "watched" or "unwatched" to track viewing status.
- ﻿﻿Ability to rate a movie in the collection and update personal notes.
- ﻿﻿Ability to remove unwanted movies from the collection.

## Components
1. Movie List component:
   - ﻿﻿﻿Displays a list of all movies in the collection, including their detailed information: title, director, genre, and watched status.
   - Provides the ability to view information about a specific movie or remove a movie from the collection.
2. Movie Details component:
   - ﻿﻿﻿Displays detailed information about a specific movie, including its description, poster image, genre, and user ratings.
   - Allows you to add, update, or delete personal notes about a movie, give a personalized rating, and mark it as watched or unwatched, or remove it from the collection.
3. Movie Filtering Component:
   - Allows you to filter movies by title, director, or watched status: 'all movies', 'unwatched only', 'watched only'.
4. Search component:
   - Form for entering keywords (title, director, release year) to search for specific movies.

## Technical requirements
- ﻿﻿Use an API (e.g., The Movie Database API) to retrieve movie data. Reference:
https://developer.themoviedb.org/reference/intro/getting-started
- ﻿﻿Use React Router to manage different routes/components.
- ﻿﻿Use Redux to manage the state of the application.
- Use Redux RTK Query for asynchronous operations such as API calls.
- Use Bootstrap for user interface design.
- Implement error handling for invalid search and API failures.
- Implement functionality to save and load a list of favorite movies using Local Storage.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
