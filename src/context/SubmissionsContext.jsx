import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const STORAGE_KEY = 'adm_submissions';

const resolveStorage = () => {
  if (typeof window === 'undefined') return null;
  try {
    const testKey = '__adm_storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return window.localStorage;
  } catch (error) {
    try {
      const testKey = '__adm_storage_test__';
      window.sessionStorage.setItem(testKey, '1');
      window.sessionStorage.removeItem(testKey);
      return window.sessionStorage;
    } catch (innerError) {
      return null;
    }
  }
};

const SubmissionsContext = createContext();

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

export const SubmissionsProvider = ({ children }) => {
  const storage = useMemo(() => resolveStorage(), []);
  const [submissions, setSubmissions] = useState(() => {
    if (!storage) return [];
    try {
      const stored = storage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Unable to load submissions from storage', error);
      return [];
    }
  });

  useEffect(() => {
    if (!storage) return;
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch (error) {
      console.error('Unable to persist submissions', error);
    }
  }, [submissions, storage]);

  useEffect(() => {
    if (!storage || storage !== window.localStorage) return;
    const handleStorage = (event) => {
      if (event.key !== STORAGE_KEY) return;
      if (!event.newValue) {
        setSubmissions([]);
        return;
      }
      try {
        setSubmissions(JSON.parse(event.newValue));
      } catch (error) {
        console.error('Unable to sync submissions from storage', error);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [storage]);

  const addSubmission = useCallback((data) => {
    setSubmissions((prev) => [
      ...prev,
      {
        id: createId(),
        createdAt: new Date().toISOString(),
        ...data,
      },
    ]);
  }, []);

  const removeSubmission = useCallback((id) => {
    setSubmissions((prev) => prev.filter((submission) => submission.id !== id));
  }, []);

  const value = useMemo(() => ({ submissions, addSubmission, removeSubmission }), [submissions, addSubmission, removeSubmission]);

  return <SubmissionsContext.Provider value={value}>{children}</SubmissionsContext.Provider>;
};

export const useSubmissions = () => {
  const context = useContext(SubmissionsContext);
  if (!context) {
    throw new Error('useSubmissions must be used within a SubmissionsProvider');
  }
  return context;
};
