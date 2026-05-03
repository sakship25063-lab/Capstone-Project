Lost & Found Portal
The Lost & Found Portal is a simple web application that allows users to:

Add lost or found items
View all items
Search items
Delete items

The goal is to build a full-stack application using:


HTML, CSS, JavaScript (Frontend)
Flask (Backend)
In-memory list as database


<!-- Home Page -->
Navbar
Search Bar
Items Card
Delete Button


<!-- Add Item Page -->
Title
Category
Location
Contact
Type (Lost / Found)



Frontend Repository

lost-found-frontend/
│
├── homePage.html
├── itemPage.html
├── style.css
├── script.js
└── README.md



Backend Repository
lost-found-backend/
│
├── app.py
└── requirements.txt



Application Flowchart
START
  ↓
User Opens Home Page
  ↓
Frontend sends GET /items
  ↓
Backend returns JSON list
  ↓
Items Displayed as Cards
  ↓
-----------------------------------
User Clicks "Add Item"
  ↓
User Fills Form
  ↓
Click Submit
  ↓
Frontend sends POST /items
  ↓
Backend Validates Data
  ↓
If Valid → Store in List
If Invalid → Return Error
  ↓
Success Message
  ↓
Redirect to Home Page
  ↓
Updated Items Displayed
END