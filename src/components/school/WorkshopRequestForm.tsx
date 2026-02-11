import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, Clock, Users, BookOpen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  topic: z.string().min(1, 'Please select a topic'),
  level: z.string().min(1, 'Please select a level'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time'),
  duration: z.string().min(1, 'Please select duration'),
  studentCount: z.string().min(1, 'Please specify number of students'),
  requirements: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface WorkshopRequestFormProps {
  open: boolean;
  onClose: () => void;
}

const WorkshopRequestForm: React.FC<WorkshopRequestFormProps> = ({ open, onClose }) => {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      level: '',
      preferredDate: '',
      preferredTime: '',
      duration: '',
      studentCount: '',
      requirements: '',
      additionalNotes: '',
    },
  });

  const topics = [
    'Basic Programming',
    'Web Development',
    'Mobile App Development',
    'Robotics',
    'Artificial Intelligence',
    'Cybersecurity',
    'Data Science',
    'Game Development',
    'Digital Design',
    '3D Printing',
  ];

  const levels = [
    'Beginner (Ages 8-10)',
    'Intermediate (Ages 11-13)',
    'Advanced (Ages 14-16)',
    'Mixed Age Group',
  ];

  const durations = [
    '1 hour',
    '2 hours',
    '3 hours',
    'Half day (4 hours)',
    'Full day (6 hours)',
    'Multi-day workshop',
  ];

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Workshop request:', data);

      toast({
        title: 'Workshop Request Submitted! 🎉',
        description:
          "We'll match you with a qualified volunteer and confirm details within 24 hours.",
      });

      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit workshop request. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-visible rounded-2xl p-6 bg-white/60 backdrop-blur-xl shadow-2xl border border-white/40">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 drop-shadow-sm">
            <BookOpen className="h-7 w-7 text-indigo-600 animate-bounce" />
            Request a Workshop
          </DialogTitle>
          <DialogDescription className="text-gray-700 font-medium">
            Fill out this form to request a technology workshop for your students. 
            We'll match you with qualified volunteers from our partner colleges.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-4"
          >
            {/* Topic + Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Workshop Topic */}
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="p-4 rounded-xl border bg-white/80 backdrop-blur-lg shadow-md hover:shadow-xl hover:scale-[1.01] transition-all">
                    <FormLabel className="font-semibold text-indigo-700">Workshop Topic</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-[9999] bg-white shadow-lg border rounded-md">
                        {topics.map((topic) => (
                          <SelectItem
                            key={topic}
                            value={topic}
                            className="hover:bg-indigo-50 cursor-pointer"
                          >
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Student Level */}
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem className="p-4 rounded-xl border bg-white/80 backdrop-blur-lg shadow-md hover:shadow-xl hover:scale-[1.01] transition-all">
                    <FormLabel className="font-semibold text-indigo-700">Student Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-[9999] bg-white shadow-lg border rounded-md">
                        {levels.map((level) => (
                          <SelectItem
                            key={level}
                            value={level}
                            className="hover:bg-indigo-50 cursor-pointer"
                          >
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Date + Time + Duration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem className="p-4 rounded-xl border bg-white/80 backdrop-blur-lg shadow-md hover:shadow-xl hover:scale-[1.01] transition-all">
                    <FormLabel className="flex items-center gap-2 font-semibold text-indigo-700">
                      <Calendar className="h-4 w-4" />
                      Preferred Date
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="focus:ring-2 focus:ring-indigo-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredTime"
                render={({ field }) => (
                  <FormItem className="p-4 rounded-xl border bg-white/80 backdrop-blur-lg shadow-md hover:shadow-xl hover:scale-[1.01] transition-all">
                    <FormLabel className="flex items-center gap-2 font-semibold text-indigo-700">
                      <Clock className="h-4 w-4" />
                      Preferred Time
                    </FormLabel>
                    <FormControl>
                      <Input type="time" {...field} className="focus:ring-2 focus:ring-indigo-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="p-4 rounded-xl border bg-white/80 backdrop-blur-lg shadow-md hover:shadow-xl hover:scale-[1.01] transition-all">
                    <FormLabel className="font-semibold text-indigo-700">Duration</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-[9999] bg-white shadow-lg border rounded-md">
                        {durations.map((duration) => (
                          <SelectItem
                            key={duration}
                            value={duration}
                            className="hover:bg-indigo-50 cursor-pointer"
                          >
                            {duration}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Student Count */}
            <FormField
              control={form.control}
              name="studentCount"
              render={({ field }) => (
                <FormItem className="p-4 rounded-xl border bg-white/80 backdrop-blur-lg shadow-md hover:shadow-xl hover:scale-[1.01] transition-all">
                  <FormLabel className="flex items-center gap-2 font-semibold text-indigo-700">
                    <Users className="h-4 w-4" />
                    Number of Students
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 25"
                      min="1"
                      max="50"
                      {...field}
                      className="focus:ring-2 focus:ring-indigo-400"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    Maximum 50 students per session for optimal learning experience
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Requirements */}
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem className="p-4 rounded-xl border bg-white/80 backdrop-blur-lg shadow-md hover:shadow-xl hover:scale-[1.01] transition-all">
                  <FormLabel className="font-semibold text-indigo-700">Technical Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Computers with internet, projector, tablets..."
                      className="min-h-[80px] focus:ring-2 focus:ring-indigo-400"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    List any specific equipment or setup requirements
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Notes */}
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem className="p-4 rounded-xl border bg-white/80 backdrop-blur-lg shadow-md hover:shadow-xl hover:scale-[1.01] transition-all">
                  <FormLabel className="font-semibold text-indigo-700">Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information, special considerations, or specific learning objectives..."
                      className="min-h-[80px] focus:ring-2 focus:ring-indigo-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-xl hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                className="rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Submit Request
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WorkshopRequestForm;
