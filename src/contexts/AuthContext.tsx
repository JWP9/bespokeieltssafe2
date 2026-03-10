import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface UserProfile {
  id: string;
  role: 'user' | 'premium_trial' | 'premium' | 'admin';
  trial_end: string | null;
  trial_expired?: boolean;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isPremium: boolean;
  trialExpired: boolean;
  signUp: (email: string, password: string, username?: string) => Promise<{ error: AuthError | null; data: any }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null; data: any }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId: string | undefined) => {
    if (!userId || !isSupabaseConfigured) {
      setProfile(null);
      return;
    }
    try {
      const { data, error } = await supabase.rpc('get_my_profile');
      if (!error && data) {
        setProfile(data as UserProfile);
      }
    } catch {
      setProfile(null);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      loadProfile(session?.user?.id).finally(() => setLoading(false));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setSession(session);
        setUser(session?.user ?? null);
        await loadProfile(session?.user?.id);
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const refreshProfile = async () => {
    await loadProfile(user?.id);
  };

  const signUp = async (email: string, password: string, username?: string) => {
    const { error, data } = await supabase.auth.signUp({ email, password });

    if (error || !data?.user) {
      return { error, data };
    }

    if (username) {
      try {
        await supabase.from('user_profiles').insert({
          id: data.user.id,
          username: username.toLowerCase(),
        });
      } catch (profileError) {
        console.error('Error creating user profile:', profileError);
      }
    }

    return { error, data };
  };

  const signIn = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    return { error, data };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const isAdmin = profile?.role === 'admin';
  const isPremium = profile?.role === 'premium' || profile?.role === 'premium_trial' || profile?.role === 'admin';
  const trialExpired = profile?.trial_expired === true;

  return (
    <AuthContext.Provider value={{
      user, session, profile, loading, isAdmin, isPremium, trialExpired,
      signUp, signIn, signInWithGoogle, signOut, refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
