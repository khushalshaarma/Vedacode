import React, { useState } from 'react';
import { Star, MessageSquare, Send, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface FeedbackModalProps {
  open: boolean;
  sessionId: string;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ open, sessionId, onClose }) => {
  const { toast } = useToast();
  const [overallRating, setOverallRating] = useState(0);
  const [mentorRating, setMentorRating] = useState(0);
  const [contentRating, setContentRating] = useState(0);
  const [engagementRating, setEngagementRating] = useState(0);
  const [comments, setComments] = useState('');
  const [highlights, setHighlights] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);

  // Mock session data - in real app, this would come from Supabase
  const sessionData = {
    title: 'Introduction to Web Development',
    mentor: 'Sarah Chen',
    date: '2024-01-25',
    students: 24,
  };

  const emojiOptions = [
    { emoji: '😊', label: 'Enjoyed' },
    { emoji: '🎯', label: 'On Target' },
    { emoji: '💡', label: 'Insightful' },
    { emoji: '🚀', label: 'Engaging' },
    { emoji: '🔥', label: 'Exciting' },
    { emoji: '🤔', label: 'Thought-provoking' },
    { emoji: '👏', label: 'Well Done' },
    { emoji: '⭐', label: 'Excellent' },
  ];

  const StarRating = ({ rating, onRatingChange, label }: { 
    rating: number; 
    onRatingChange: (rating: number) => void;
    label: string;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
         <button
  key={star}
  type="button"
  onClick={() => onRatingChange(star)}
  className="transition-colors hover:scale-110"
  aria-label={`Rate ${star} out of 5`}
>
  <Star
    className={`h-6 w-6 ${
      star <= rating
        ? "fill-primary-glow text-primary-glow"
        : "text-muted-foreground hover:text-primary-glow"
    }`}
  />
</button>

        ))}
      </div>
    </div>
  );

  const toggleEmoji = (emoji: string) => {
    setSelectedEmojis(prev =>
      prev.includes(emoji)
        ? prev.filter(e => e !== emoji)
        : [...prev, emoji]
    );
  };

  const handleSubmit = async () => {
    if (overallRating === 0) {
      toast({
        title: 'Rating Required',
        description: 'Please provide at least an overall rating.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Here you would submit to Supabase
      const feedbackData = {
        sessionId,
        overallRating,
        mentorRating,
        contentRating,
        engagementRating,
        comments,
        highlights,
        suggestions,
        emojis: selectedEmojis,
        timestamp: new Date().toISOString(),
      };

      console.log('Feedback submitted:', feedbackData);

      toast({
        title: 'Feedback Submitted!',
        description: 'Thank you for your valuable feedback. It will help us improve future sessions.',
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl vedic-text-gradient">
            <MessageSquare className="h-6 w-6" />
            Session Feedback
          </DialogTitle>
          <DialogDescription>
            Help us improve by sharing your thoughts about this workshop session.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Session Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold text-lg">{sessionData.title}</h3>
            <p className="text-sm text-muted-foreground">
              Mentor: {sessionData.mentor} • Date: {sessionData.date} • Students: {sessionData.students}
            </p>
          </div>

          {/* Emoji Quick Feedback */}
          <div className="space-y-3">
            <h4 className="font-medium">Quick Feedback (Select all that apply)</h4>
            <div className="flex flex-wrap gap-2">
              {emojiOptions.map((option) => (
                <button
                  key={option.emoji}
                  type="button"
                  onClick={() => toggleEmoji(option.emoji)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                    selectedEmojis.includes(option.emoji)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-muted border-border'
                  }`}
                >
                  <span className="text-lg">{option.emoji}</span>
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Rating Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StarRating
              rating={overallRating}
              onRatingChange={setOverallRating}
              label="Overall Session Rating *"
            />
            <StarRating
              rating={mentorRating}
              onRatingChange={setMentorRating}
              label="Mentor Performance"
            />
            <StarRating
              rating={contentRating}
              onRatingChange={setContentRating}
              label="Content Quality"
            />
            <StarRating
              rating={engagementRating}
              onRatingChange={setEngagementRating}
              label="Student Engagement"
            />
          </div>

          {/* Text Feedback */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Session Highlights</label>
              <Textarea
                placeholder="What were the best parts of this session? What did students enjoy most?"
                value={highlights}
                onChange={(e) => setHighlights(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Additional Comments</label>
              <Textarea
                placeholder="Any other thoughts about the session, mentor interaction, or learning outcomes?"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Suggestions for Improvement</label>
              <Textarea
                placeholder="How could we make future sessions even better? Any specific requests or ideas?"
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="hero" className="gap-2">
              <Send className="h-4 w-4" />
              Submit Feedback
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;