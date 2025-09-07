# DataViz - React Firebase Dashboard

A production-ready, scalable React web application with Firebase authentication, data visualization, and modern UI components.

## Features

- 🔐 **Google Authentication** - Secure login with Firebase OAuth
- 📊 **Data Visualization** - Interactive charts and graphs with Recharts
- 📁 **File Upload** - Drag-and-drop CSV/Excel file processing
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🎨 **Modern UI** - Smooth animations with Framer Motion
- 🔄 **State Management** - Context API for global state
- 🛡️ **Type Safety** - Full TypeScript support
- ♿ **Accessibility** - WCAG compliant components

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Authentication**: Firebase Auth
- **File Processing**: XLSX, React Dropzone
- **Routing**: React Router DOM

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google Authentication
3. Create a `.env` file in the root directory:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 3. Start Development Server

```bash
npm start
```

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   └── Login.tsx
│   ├── Dashboard/
│   │   └── DataTable.tsx
│   ├── FileUpload/
│   │   └── FileUpload.tsx
│   ├── Layout/
│   │   └── Sidebar.tsx
│   ├── ProductDetails/
│   │   └── ProductDetails.tsx
│   └── Tabs/
│       ├── AmazonTab.tsx
│       ├── ChatbotTab.tsx
│       ├── ProfitTab.tsx
│       └── ShopifyTab.tsx
├── context/
│   └── AppContext.tsx
├── firebase/
│   └── config.ts
├── types/
│   └── index.ts
├── App.tsx
├── index.tsx
└── index.css
```

## Features Overview

### Authentication
- Google OAuth integration
- Secure session management
- Automatic redirects

### File Upload
- Drag-and-drop interface
- CSV and Excel support
- Client-side validation
- Required columns: Product Name, Sales, Profit, TE, Credit, Amazon Fee, Profit Percentage

### Dashboard
- Responsive data table
- Clickable rows for product details
- Real-time data updates

### Product Details
- Individual product analysis
- Interactive pie charts
- Financial breakdown
- Profit metrics

### Sidebar Navigation
- Collapsible design
- Tab-based navigation
- User profile display

### Integration Tabs
- **Chatbot**: AI assistant interface
- **Profit Analysis**: Advanced charts and metrics
- **Amazon Integration**: Seller account connection
- **Shopify Integration**: Store connection

## Environment Variables

All Firebase configuration is handled through environment variables for security:

- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_FIREBASE_STORAGE_BUCKET`
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
- `REACT_APP_FIREBASE_APP_ID`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details