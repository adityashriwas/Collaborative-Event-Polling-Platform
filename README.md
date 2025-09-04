# 🎉 Collaborative Event & Polling Platform

This is a full-stack project where users can **create events, suggest locations, vote for them, invite users**, and receive **notifications** when invited.  
I built it to make group event planning simpler and interactive.

---

## ✨ Features

- 🔐 **User Authentication**
  - Sign up, login, logout, profile  
- 📅 **Event Management**
  - Create, edit, delete events  
  - Add multiple location options  
- ✅ **Polling System**
  - Vote on event locations  
  - See vote counts update quickly  
- 🤝 **Invitations**
  - Event creators can invite users  
  - Invited users get notifications  
- 🔔 **Notifications**
  - Stored in MongoDB  
  - Displayed in frontend, mark as read  

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TailwindCSS, shadcn/ui  
- **Backend**: Node.js, Express, MongoDB (Mongoose)  
- **Authentication**: JWT with cookies  
- **Notifications**: Custom REST APIs with DB polling  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/collaborative-event-platform.git
cd collaborative-event-platform
```
## Install dependencies
```
cd Backend
npm install
cd ../frontend
npm install
```

## ▶️ Running Locally
```
cd Backend
npm run dev
cd frontend
npm run dev
```
## API Endpoints
# Auth
```
POST   /api/v1/user/register          → Register new user  
POST   /api/v1/user/login             → Login  
GET    /api/v1/user/profile           → Get current user  
GET    /api/v1/user/users             → Get all users  
GET    /api/v1/user/logout            → Logout  
```
# Events
```
POST   /api/v1/event                  → Create event  
GET    /api/v1/event                  → Get all events  
GET    /api/v1/event/my-events        → Get events created by logged-in user  
GET    /api/v1/event/:id              → Get single event  
PATCH  /api/v1/event/:id              → Edit event  
DELETE /api/v1/event/:id              → Delete event
POST   /api/v1/event/vote             → Vote for a location
POST   /api/v1/event/invite           → Invite user to an event  
POST   /api/v1/event/accept-invite    → Accept an invite  
```
# Notifications
```
GET    /api/v1/notifications          → Get notifications for current user  
PATCH  /api/v1/notifications/:id/read → Mark notification as read  
```
