# SCRAM! A social-media-app

### Using the MERNG stack, I coded up backend and frontend code to create a social-media-app  that registers users, provides user authentication, lists all posts in a global feed, ability to comment/like posts.
![Picture of WebApp](https://i.imgur.com/VPVbmO0.png)

# Key Takeaways:
* The ternary operator can be paired beautifuly with creating reusable code by checking for certain conditions and if met, what is being rendered changes
* Apollo Client rewards immutability by improving the performance of those that heed to its new gospel
* To update the cache to prevent having to refresh the page to show change in content I had to create a new data object that contains some memory of the original (to prevent rewriting the original object and thus obeying immutability)

# Tech Used:
#### Javascript, HTML, CSS, Semantic-UI, React.js, GraphQL, Apollo server & client

# Next steps:
### Strengthen my understanding of Apollo by creating a followup project

# Screenshots
### Picture of some of the verification checks when attempting to signup
![Picture of alert when signing up with credentials already seen by system](https://i.imgur.com/CAAejZU.png)
### When comment is clicked comments are visible
![Single page of post](https://i.imgur.com/bDCOcVc.png)
### Homepage when a user is logged in
![Homepage when a user is logged in](https://i.imgur.com/1GJCm53.png)