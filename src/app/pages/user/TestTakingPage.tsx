import {
  Box,
  CircularProgress,
  Typography,
  Avatar,
  Card,
  CardContent,
  LinearProgress,
  Button,
  Container,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLazyGetTestQuestionsQuery, useSubmitTestMutation } from '../../api/api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CancelIcon from '@mui/icons-material/Cancel';
type QuestionAnswerDTO = {
  questionId: number;
  answer: string;
};

export const TestTakingPage = () => {
  const { id: testId } = useParams();
  const navigate = useNavigate();

  const [fetchQuestions, { data: questions = [], isError, isFetching }] = useLazyGetTestQuestionsQuery();
  const [submitTest, { isLoading: isSubmitting }] = useSubmitTestMutation();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuestionAnswerDTO[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<{ percentage: number; passed: boolean } | null>(null);

  useEffect(() => {
    if (testId) {
      fetchQuestions(Number(testId));
    }
  }, [testId]);

  if (isFetching) {
    return (
      <Box height="100%" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !questions.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color="text.secondary">Test not found</Typography>
      </Box>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const getSelectedAnswer = (questionId: number) => {
    return answers.find((a) => a.questionId === questionId)?.answer || '';
  };

  const handleAnswer = (value: string) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === question.id);

      if (existing) {
        return prev.map((a) => (a.questionId === question.id ? { ...a, answer: value } : a));
      }

      return [...prev, { questionId: question.id, answer: value }];
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const finishTest = async () => {
    try {
      const response = await submitTest({
        testId: Number(testId),
        answers,
      }).unwrap();

      setResult(response);
      setIsFinished(true);

      if (response.passed) {
        toast.success('Congratulations! You passed the test!');
      } else {
        toast.error('You did not pass. Try again.');
      }
    } catch {
      toast.error('Something went wrong.');
    }
  };

  // RESULT SCREEN (ostaje isto)
  if (isFinished && result) {
    const passed = result.passed;

    return (
      <Box minHeight="calc(100vh - 190px)" display="flex" alignItems="center" justifyContent="center" p={3}>
        <Box textAlign="center" maxWidth={500}>
          <Avatar
            sx={{
              width: 96,
              height: 96,
              mx: 'auto',
              mb: 3,
              bgcolor: passed ? 'success.light' : 'error.light',
              color: passed ? 'success.main' : 'error.main',
            }}
          >
            {passed ? <EmojiEventsIcon sx={{ fontSize: 48 }} /> : <CancelIcon sx={{ fontSize: 48 }} />}
          </Avatar>

          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {passed ? 'Congratulations!' : 'Try Again'}
          </Typography>

          <Typography color="text.secondary" mb={4}>
            {passed ? 'You successfully passed the test!' : 'You did not reach the passing score.'}
          </Typography>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h2" fontWeight="bold" color={passed ? 'success.main' : 'error.main'}>
                {result.percentage}%
              </Typography>

              <Typography color="text.secondary" mb={2}>
                Your Score
              </Typography>

              <LinearProgress
                variant="determinate"
                value={result.percentage}
                color={passed ? 'success' : 'error'}
                sx={{ height: 12, borderRadius: 1 }}
              />
            </CardContent>
          </Card>

          <Button variant="outlined" onClick={() => navigate('/app/user/my-tests')}>
            Back to Tests
          </Button>
        </Box>
      </Box>
    );
  }

  // TEST SCREEN
  return (
    <Box>
      <LinearProgress variant="determinate" value={progress} />

      <Container maxWidth="md" sx={{ py: 3 }}>
        <Card sx={{ mb: 2, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" mb={4}>
              {question.text}
            </Typography>

            <FormControl fullWidth>
              <RadioGroup value={getSelectedAnswer(question.id)} onChange={(e) => handleAnswer(e.target.value)}>
                {question.options.map((option: string, index: number) => (
                  <Card
                    key={index}
                    variant="outlined"
                    sx={{
                      mb: 1.5,
                      cursor: 'pointer',
                      borderColor: getSelectedAnswer(question.id) === option ? 'primary.main' : 'divider',
                    }}
                    onClick={() => handleAnswer(option)}
                  >
                    <CardContent>
                      <FormControlLabel value={option} control={<Radio />} label={option} />
                    </CardContent>
                  </Card>
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevQuestion} disabled={currentQuestion === 0}>
            Previous
          </Button>

          {currentQuestion === questions.length - 1 ? (
            <Button variant="contained" endIcon={<CheckCircleIcon />} onClick={finishTest} disabled={isSubmitting}>
              Submit Test
            </Button>
          ) : (
            <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={nextQuestion}>
              Next
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};
