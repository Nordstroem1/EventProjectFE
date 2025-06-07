# Google Places API Setup Guide

This application now uses Google Places API for comprehensive worldwide city autocomplete with proper validation. Follow these steps to set up the API:

## 1. Get Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Places API" for your project:
   - Go to "APIs & Services" > "Library"
   - Search for "Places API"
   - Click "Enable"
4. Create an API key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key

## 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace the placeholder with your actual API key:
   ```
   VITE_GOOGLE_PLACES_API_KEY=your_actual_api_key_here
   ```

3. **Important**: Add `.env` to your `.gitignore` to keep your API key private

## 3. API Key Security (Recommended)

For production, restrict your API key:

1. Go to Google Cloud Console > "APIs & Services" > "Credentials"
2. Click on your API key
3. Under "API restrictions", select "Restrict key"
4. Choose "Places API" from the list
5. Under "Application restrictions", you can:
   - Add HTTP referrers for web apps
   - Add IP addresses for server apps

## 4. Features Included

✅ **Worldwide Coverage**: Access to millions of places globally
✅ **Real-time Validation**: Instant feedback on location validity
✅ **Visual Indicators**: Color-coded borders (green=valid, red=invalid, yellow=pending)
✅ **Geocoding**: Automatic latitude/longitude coordinates
✅ **Debounced Search**: Optimized API calls with 300ms delay
✅ **Error Handling**: Graceful fallbacks and user-friendly messages
✅ **Accessibility**: Keyboard navigation and screen reader support

## 5. Usage

The `GooglePlacesAutocomplete` component is now used in:
- Registration form (`RegisterForm.jsx`) for user city selection
- Event creation form (`EventForm.jsx`) for event location selection

## 6. API Costs

Google Places API pricing (as of 2024):
- Autocomplete: $2.83 per 1,000 requests
- Place Details: $17.00 per 1,000 requests
- First $200/month is free (Google Cloud credit)

## 7. Fallback Behavior

If the API key is not configured:
- Component shows a disabled input with error message
- Form validation prevents submission
- Clear instructions guide user to set up API key

## 8. Testing

1. Start your development server: `npm run dev`
2. Navigate to registration or event creation form
3. Start typing a city name
4. Verify autocomplete suggestions appear
5. Select a suggestion and verify validation feedback
