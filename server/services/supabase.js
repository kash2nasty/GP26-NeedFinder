import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn('Supabase credentials not configured. Share links will use in-memory fallback.');
}

const memoryStore = new Map();

export async function saveSession(sessionData) {
  const payload = {
    intake_data: sessionData.intake,
    results: sessionData.results,
    language: sessionData.language || 'en',
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    const { data, error } = await supabase
      .from('sessions')
      .insert(payload)
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  }

  const id = crypto.randomUUID();
  memoryStore.set(id, payload);
  return id;
}

export async function getSession(id) {
  if (supabase) {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  return memoryStore.get(id) || null;
}

export async function saveProfile(profileData) {
  const payload = {
    saved_programs: profileData.savedPrograms,
    session_id: profileData.sessionId || null,
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    const { data, error } = await supabase
      .from('profiles')
      .insert(payload)
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  }

  const id = crypto.randomUUID();
  memoryStore.set(`profile_${id}`, payload);
  return id;
}

export { supabase };
