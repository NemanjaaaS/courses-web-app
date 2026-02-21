import { useState } from 'react';
import { z } from 'zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Stack,
  Skeleton,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Fab,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Assignment as TestIcon,
  AccessTime as ClockIcon,
  CheckCircle as CheckIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useGetTestsQuery, useGetCoursesQuery, useCreateTestMutation, useDeleteTestMutation } from '../../api/api';
import { toast } from 'react-toastify';
import IconifyIcon from '../../../components/base/IconifyIcon';

const questionSchema = z.object({
  text: z.string().min(1, 'Enter question text'),
  options: z.array(z.string().min(1, 'Enter answer')).length(4),
  correctAnswer: z.number().min(0).max(3),
});

const testSchema = z.object({
  title: z.string().min(1, 'Enter test title'),
  courseId: z.number().min(1, 'Select course'),
  durationMinutes: z.number().min(5, 'Duration must be at least 5 minutes'),
  passingScorePercentage: z.number().min(1).max(100, 'Passing threshold must be between 1 and 100'),
  createQuestionDTOS: z.array(questionSchema).min(1, 'Add at least one question'),
});

export type TestFormData = z.infer<typeof testSchema>;

export const AdminTestsPage = () => {
  const { data: tests = [], isLoading: testsLoading } = useGetTestsQuery();
  const { data: courses = [], isLoading: coursesLoading } = useGetCoursesQuery();
  const [createTest] = useCreateTestMutation();
  const [deleteTest] = useDeleteTestMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      title: '',
      courseId: 0,
      durationMinutes: 30,
      passingScorePercentage: 70,
      createQuestionDTOS: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'createQuestionDTOS',
  });

  const addNewQuestion = () => {
    append({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    });
  };

  const handleDeleteTest = async (testId: number) => {
    try {
      await deleteTest(testId).unwrap();
      toast.success('Test deleted successfully!');
    } catch {
      toast.error('Failed to delete test!');
    }
  };

  const onSubmit = async (data: TestFormData) => {
    try {
      await createTest({
        title: data.title,
        courseId: data.courseId,
        durationMinutes: data.durationMinutes,
        passingScorePercentage: data.passingScorePercentage,
        createQuestionDTOS: data.createQuestionDTOS.map((q, index) => ({
          id: `q${Date.now()}_${index}`,
          text: q.text,
          options: q.options,
          correctAnswer: q.correctAnswer,
        })),
      }).unwrap();
      toast.success('Test created successfully!');
      reset();
      setIsDialogOpen(false);
    } catch {
      toast.error('Failed to create test!');
    }
  };

  const isLoading = testsLoading || coursesLoading;

  if (isLoading) {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, p: 2 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} variant="rounded" animation={'wave'} height={180} />
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2 }}>
      {/* Header */}
      <Fab
        variant="extended"
        color="primary"
        onClick={() => setIsDialogOpen(true)}
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>

      {/* Tests Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 2 }}>
        {tests.map((test) => (
          <Card key={test.id} sx={{ borderRadius: 3 }}>
            <CardHeader
              avatar={
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: '#4338ca15' }}>
                  <TestIcon sx={{ color: '#4338ca' }} />
                </Box>
              }
              action={<Chip label={`${test.numberOfQuestions} questions`} size="small" />}
              title={test.title}
              subheader={test.course.title}
              slotProps={{ title: { sx: { fontWeight: 600 } } }}
            />
            <CardContent>
              <Grid container direction="row" spacing={3} justifyContent={'space-between'}>
                <Grid container>
                  <Grid sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <ClockIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {test.durationMinutes} min
                    </Typography>
                  </Grid>
                  <Grid sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CheckIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {test.passingScorePercentage}% to pass
                    </Typography>
                  </Grid>
                </Grid>
                <Grid justifyContent={'end'} display={'flex'}>
                  <IconButton onClick={() => handleDeleteTest(Number(test.id))}>
                    <IconifyIcon icon={'mdi:bin-outline'} color="red" />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Create Test Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="md"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 2, maxHeight: '90vh' } } }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <Typography variant="h5" fontWeight={600}>
              Create new test
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3}>
              {/* Test Info */}
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Title" fullWidth error={!!errors.title} helperText={errors.title?.message} />
                )}
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                <Controller
                  name="courseId"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.courseId}>
                      <InputLabel>Course</InputLabel>
                      <Select {...field} label="Course">
                        {courses.map((course) => (
                          <MenuItem key={course.id} value={course.id}>
                            {course.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  name="durationMinutes"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      label="Duration (min)"
                      type="number"
                      fullWidth
                      error={!!errors.durationMinutes}
                      helperText={errors.durationMinutes?.message}
                    />
                  )}
                />
              </Box>

              <Controller
                name="passingScorePercentage"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    label="Passing threshold (%)"
                    type="number"
                    fullWidth
                    error={!!errors.passingScorePercentage}
                    helperText={errors.passingScorePercentage?.message}
                  />
                )}
              />

              <Divider />

              {/* Questions */}
              <Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Questions ({fields.length})
                </Typography>

                {fields.map((field, qIndex) => (
                  <Paper key={field.id} variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography fontWeight={500}>Question {qIndex + 1}</Typography>
                      <IconButton size="small" onClick={() => remove(qIndex)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>

                    <Controller
                      name={`createQuestionDTOS.${qIndex}.text`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Question text"
                          fullWidth
                          multiline
                          rows={2}
                          sx={{ mb: 2 }}
                          error={!!errors.createQuestionDTOS?.[qIndex]?.text}
                        />
                      )}
                    />

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Answers (select correct):
                    </Typography>

                    <Controller
                      name={`createQuestionDTOS.${qIndex}.correctAnswer`}
                      control={control}
                      render={({ field: radioField }) => (
                        <RadioGroup value={radioField.value} onChange={(e) => radioField.onChange(Number(e.target.value))}>
                          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                            {[0, 1, 2, 3].map((optIndex) => (
                              <Box key={optIndex} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <FormControlLabel value={optIndex} control={<Radio size="small" />} label="" sx={{ m: 0 }} />
                                <Controller
                                  name={`createQuestionDTOS.${qIndex}.options.${optIndex}`}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      {...field}
                                      size="small"
                                      placeholder={`Answer ${optIndex + 1}`}
                                      fullWidth
                                      error={!!errors.createQuestionDTOS?.[qIndex]?.options?.[optIndex]}
                                    />
                                  )}
                                />
                              </Box>
                            ))}
                          </Box>
                        </RadioGroup>
                      )}
                    />
                  </Paper>
                ))}

                <Button variant="outlined" startIcon={<AddIcon />} onClick={addNewQuestion}>
                  Add question
                </Button>

                {errors.createQuestionDTOS?.message && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {errors.createQuestionDTOS.message}
                  </Typography>
                )}
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Create test
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
