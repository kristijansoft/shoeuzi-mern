export const config = {
  STRIPE_PUBLIC_KEY:
    'pk_test_51I9YwvJEPUx70qNnehCrNwBG9dl8T3Px7YF2G4fCEPVECuinXPBC0PhWs1tHeV1L6MErCvM13atEUs5XYaDqzyH300DLaq3No0',
  API_BASE_URL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api'
      : 'https://seekare-new-backend.herokuapp.com/api',
};
