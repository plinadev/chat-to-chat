# Chat to Chat 

A real-time messaging web application built with Next.js and Firebase. Users can register, start new chats, and enjoy live messaging with emoji support and chat previews.

## Tech Stack

- **Next.js 15**
- **React 19**
- **Firebase 12** – Authentication, Firestore (realtime database)
- **Tailwind CSS v4**
- **DaisyUI** – Component library
- **Emoji Picker React** – Emoji selector
- **React Icons** – Icon library
- **Moment.js** – Timestamp formatting
- **Random Avatar Generator** – Auto-generated avatars
- **React Hot Toast** – Notifications
- **TypeScript**

## Functionality

- User authentication (login/register)
- Start new chat conversations with other users
- Message previews in chat list
- Emoji picker in chat input
- Real-time messaging powered by Firebase

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- Firebase project with Authentication and Firestore enabled

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/plinadev/chat-to-chat.git
   cd chat-to-chat
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add your Firebase credentials in a `.env.local` file.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to use the app.

## Firebase Configuration

Make sure to configure Firebase in your project (usually in `firebase.ts`) and provide environment variables like:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Project Structure

```
/chat-to-chat
├── components/        # UI components like ChatItem, MessageBubble, etc.
├── pages/             # App pages (Next.js routing)
├── styles/            # Tailwind and custom CSS
├── utils/             # Firebase setup, helpers
├── public/            # Static assets
├── .env.local         # Firebase config
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Deployment
Check out deployed version❤️
[chat2chat application](https://chat-to-chat.vercel.app/login)
