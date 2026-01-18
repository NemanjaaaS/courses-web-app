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
} from '@mui/material';
import {
  Add as AddIcon,
  Assignment as TestIcon,
  AccessTime as ClockIcon,
  CheckCircle as CheckIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useGetTestsQuery, useGetCoursesQuery, useCreateTestMutation } from '../../api/api';
import { toast } from 'react-toastify';

const questionSchema = z.object({
  text: z.string().min(1, 'Unesite tekst pitanja'),
  options: z.array(z.string().min(1, 'Unesite odgovor')).length(4),
  correctAnswer: z.number().min(0).max(3),
});

const testSchema = z.object({
  title: z.string().min(1, 'Unesite naziv testa'),
  courseId: z.string().min(1, 'Izaberite kurs'),
  duration: z.number().min(5, 'Trajanje mora biti najmanje 5 minuta'),
  passingScore: z.number().min(1).max(100, 'Prolazni prag mora biti između 1 i 100'),
  questions: z.array(questionSchema).min(1, 'Dodajte bar jedno pitanje'),
});

type TestFormData = z.infer<typeof testSchema>;

export const AdminTestsPage = () => {
  const { data: tests = [], isLoading: testsLoading } = useGetTestsQuery();
  const { data: courses = [], isLoading: coursesLoading } = useGetCoursesQuery();
  const [createTest] = useCreateTestMutation();
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
      courseId: '',
      duration: 30,
      passingScore: 70,
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const addNewQuestion = () => {
    append({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    });
  };

  const onSubmit = async (data: TestFormData) => {
    try {
      await createTest({
        title: data.title,
        courseId: data.courseId,
        duration: data.duration,
        passingScore: data.passingScore,
        questions: data.questions.map((q, index) => ({
          id: `q${Date.now()}_${index}`,
          text: q.text,
          options: q.options,
          correctAnswer: q.correctAnswer,
        })),
      }).unwrap();
      toast.success('Test je uspešno kreiran');
      reset();
      setIsDialogOpen(false);
    } catch {
      toast.error('Greška prilikom kreiranja testa');
    }
  };

  const getCourseTitle = (courseId: string) => {
    return courses.find((c) => c.id === courseId)?.title || 'Nepoznat kurs';
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
              action={<Chip label={`${test.questions.length} pitanja`} size="small" />}
              title={test.title}
              subheader={getCourseTitle(test.courseId)}
              slotProps={{ title: { sx: { fontWeight: 600 } } }}
            />
            <CardContent>
              <Stack direction="row" spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ClockIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {test.duration} min
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CheckIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {test.passingScore}% za prolaz
                  </Typography>
                </Box>
              </Stack>
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
              Kreiraj novi test
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3}>
              {/* Test Info */}
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Naziv testa" fullWidth error={!!errors.title} helperText={errors.title?.message} />
                )}
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                <Controller
                  name="courseId"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.courseId}>
                      <InputLabel>Kurs</InputLabel>
                      <Select {...field} label="Kurs">
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
                  name="duration"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      label="Trajanje (min)"
                      type="number"
                      fullWidth
                      error={!!errors.duration}
                      helperText={errors.duration?.message}
                    />
                  )}
                />
              </Box>

              <Controller
                name="passingScore"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    label="Prolazni prag (%)"
                    type="number"
                    fullWidth
                    error={!!errors.passingScore}
                    helperText={errors.passingScore?.message}
                  />
                )}
              />

              <Divider />

              {/* Questions */}
              <Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Pitanja ({fields.length})
                </Typography>

                {fields.map((field, qIndex) => (
                  <Paper key={field.id} variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography fontWeight={500}>Pitanje {qIndex + 1}</Typography>
                      <IconButton size="small" onClick={() => remove(qIndex)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>

                    <Controller
                      name={`questions.${qIndex}.text`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Tekst pitanja"
                          fullWidth
                          multiline
                          rows={2}
                          sx={{ mb: 2 }}
                          error={!!errors.questions?.[qIndex]?.text}
                        />
                      )}
                    />

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Odgovori (izaberite tačan):
                    </Typography>

                    <Controller
                      name={`questions.${qIndex}.correctAnswer`}
                      control={control}
                      render={({ field: radioField }) => (
                        <RadioGroup value={radioField.value} onChange={(e) => radioField.onChange(Number(e.target.value))}>
                          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                            {[0, 1, 2, 3].map((optIndex) => (
                              <Box key={optIndex} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <FormControlLabel value={optIndex} control={<Radio size="small" />} label="" sx={{ m: 0 }} />
                                <Controller
                                  name={`questions.${qIndex}.options.${optIndex}`}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      {...field}
                                      size="small"
                                      placeholder={`Odgovor ${optIndex + 1}`}
                                      fullWidth
                                      error={!!errors.questions?.[qIndex]?.options?.[optIndex]}
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
                  Dodaj pitanje
                </Button>

                {errors.questions?.message && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {errors.questions.message}
                  </Typography>
                )}
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setIsDialogOpen(false)}>Otkaži</Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Kreiraj test
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
