# RentHubTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

# Deployment details

this project is deployed on Netlify
    url:"https://sumanthnagireddi-renthub.netlify.app/"
    userName:"test",
    password:1234

GITHUB details:
    repo:https://github.com/sumanthnagireddi/RentHub/

# Techstack details
    Angular,
    Tailwind CSS,
    Angular Material,
    Local storage for storing the information given by user

### BONUS Question ATTEMPTED

    Preview and submit screen added where user can see all the details entered by him and user can see the card also how it looks like once it is published.


# Overview

Renthub is the application , where users can see the properties which are available to rent and they can post their property aswell.

   1.Used  tailwind css for  styling , where more modern websites following this framework for ease of use and responsive design
   2.Used angular material for components which is very feasible for angular and developed by angular team only.

### Navbar

Navbar consits of a logo and menu which includes Rent a home, my listings, my favorites, My ratings and login and logout and register and welcome message to the user who logs in


#### Rent a home :
     
     User can share the details of the property which he/she is posting about , it is having required fields and formvalidations also there for those.
     
     Form is in 4 stages 
        1.Basic Information: title,description,unitname,address,images etc..
        2.Rent Information: Expected Rent, Late charges,minimum down payment
        3.facilities:this includes Amenities
        4.Preview and submit:it will show the preview and submit option with an preview card also.
    
    Validations are there at each and every stage.

#### My Listings
    
    User can see all the postings done by him at this place


#### My Favorites

    User can add the interested items to their favorites list by clicking on favorite icon and user can see all the favorite items at this place

#### My reviews

    User can submit their reviews/comments on any of the property and they can see all the comments posted by them at this place

### Home screen
    
    A carousel banner which shows the top listed items

    All listings which shows total listings at one place,

    multiple filters added for this home screen where user can filter those items with name,pricerange and amenities.
### Route Guards

Route guards are added at each and every route except home screen , it will check whether user exists or not , if user there it will allow them to that page else it won't

Can deactivate guard added in Create-post route for denying the user to not go back without filling the form 

### TESTING

Testcases added for home component and user service using jasmine framework.