/**
 * ==============================================================================
 * NOI EXPAT OPEN — SUPABASE CLIENT CONFIGURATION
 * Single Source of Truth for Live Tournament Scoring
 * ==============================================================================
 */

window.SUPABASE_CONFIG = {
  // Supabase Project URL provided by organizer
  url: "https://dzlogbirnflzygrsekfb.supabase.co",

  // Supabase Public Anon Key (Found in Supabase Dashboard: Project Settings -> API -> anon public)
  // Safe to be included in frontend code (read-only through Row Level Security)
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG9nYmlybmZsenlncnNla2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NjkyMDEsImV4cCI6MjEwNDQ0NTIwMX0.GIlaAhSI2kl3KA3xyULJV51HPT-2n2EzAPlbiElEQrs",

  // Target tournament identifier
  tournamentId: "picklehead-individual-doubles"
};
