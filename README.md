# Beatles Quiz

A lightweight quiz app built with **Next.js (App Router)** and **React**.  
The user is shown Beatles album covers and must guess the correct album name from multiple choices. Trivia is revealed for correct answers, and stats are tracked across rounds in `sessionStorage`.


## Features
- **Quiz**: 5 random questions per round (unique album covers).  
- **Feedback**: Some cool animations, where wrong answers shake and flash red and correct answers flip to show trivia.  
- **Trivia**: Each album has short, real snippets of Beatles history. (addmittedly chatGPT generated so don't hold these trivia pieces as truths please haha)
- **Session stats**: Tracks total guesses, correct guesses, and rounds played across the whole session.  
- **Persistence**: Data lives in `sessionStorage`, survives refresh, but resets on full exit.  
- **Simple navigation**: Welcome -> Quiz -> Results, with options to play again or exit.


Start screen with name/email input
![welcome page gif](https://github.com/user-attachments/assets/d0e6f52e-4428-4f4c-8c05-eabb61c6e728)
Quiz screen with album covers and options  
![quiz questions gif](https://github.com/user-attachments/assets/2c175eb5-fc05-4d4b-b56a-bf27045e6a83)
Results screen with overall session stats  
![results screen gif](https://github.com/user-attachments/assets/474e0ccb-9bcf-429b-b22e-4f304b56384e)


## Considerations
### Features
- Kept quiz length fixed at 5 to keep rounds snappy.  
- Trivia shown on other side of a card flip for a small “delight” factor without heavy UI libraries.
- Error & loading states are present but minimal since the upstream API is stable and simple.  

### Code Quality & Maintainability
- Navigation and routing is kept very barebones, using only nextjs built-in App Router functionality
- Followed Git branching strategies, separating additions of different features using Pull Requests in feature branches, merging into main. Be sure to go to the Pull Request tab, remove 'is:unread' from the searchbar, and check out my nicely chunked PRs!
- Used **plain helper utilities** (`storage.ts`) to abstract session storage, keeping state tracking easy to follow.  
- **`useMemo`** ensures question sets don’t regenerate on every re-render.  
- Components are self-contained pages under `app/`, aligned with Next.js conventions.  
- Explicitly separated **album metadata**, **trivia**, and **storageHelpers** into `lib/` folder for reusability.  
- Code comments document tradeoffs (e.g. while loops for distractors vs. more efficient shuffling).  


## Future Improvements
- **Round summaries**: show per-round accuracy alongside overall totals.  
- **Client vs server**: improve use of client side vs server side files, can definitely inmprove efficiency here.
- **Accessibility**: improve focus states & aria-live feedback for screen readers.  
- **Styling**: replace Tailwind utility classes with a design system or component library for scalability.  
- **Data fetching**: fetch and save album images with SWR or another similar functionality instead of proxying every time.  
- **Unit tests**: although simple, this app could be improved with test functions, just like any repo



## Learnings & Tradeoffs
This isn’t meant to be a production app, but a demonstration of:  
- Ability to quickly scaffold in **React & Next.js**.  
- Awareness of state persistence and UX feedback loops.
- Handling of Next.js data fetch proxying.
- Conscious tradeoffs (simple `while` loops instead of trying to figure out hectic algorithms, sessionStorage VS a full reducer store, etc).  
- Balancing **polish** (animations, trivia) with **time constraints**.



## Running Locally
Clone this repo locally via the green button on top right of this page.
When about to run the app, make sure you are on the MAIN branch! This is the latest.
Also, of course, ensure Node v16 or later is installed on your machine.
```bash
npm install
npm run dev
# visit http://localhost:3000
