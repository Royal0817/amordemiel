import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const STORAGE_KEY = 'adm_submissions';

const SubmissionsContext = createContext();

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

export const SubmissionsProvider = ({ children }) => {
  const [submissions, setSubmissions] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Unable to load submissions from storage', error);
      return [];
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch (error) {
      console.error('Unable to persist submissions', error);
    }
  }, [submissions]);

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
