import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Question } from '../types/models';

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('questions')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        const questions = (data || []).map((q) => ({
          id: q.id,
          created_by: q.created_by,
          title: q.title,
          content: q.content,
          status: q.status as 'pending' | 'completed' | 'closed',
          created_at: new Date(q.created_at),
          updated_at: new Date(q.updated_at),
        }));

        setQuestions(questions);
        setError(null);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { questions, loading, error };
};
