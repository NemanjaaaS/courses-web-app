import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Container,
  Avatar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CancelIcon from '@mui/icons-material/Cancel';
import { mockCourses, mockTests } from '../../../lib/mockData';
import { toast } from 'react-toastify';

export const TestTakingPage = () => {
  const { id: testId } = useParams();
  const navigate = useNavigate();
  console.log(testId);
  const test = mockTests.find((t) => t.id === testId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  if (!test) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">Test nije pronađen</Typography>
      </Box>
    );
  }

  const courseName = mockCourses.find((c) => c.id === test.courseId)?.title || 'Nepoznat kurs';
  const question = test.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / test.questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: parseInt(value) });
  };

  const nextQuestion = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishTest = () => {
    const correctAnswers = test.questions.filter((q) => answers[q.id] === q.correctAnswer).length;
    const calculatedScore = Math.round((correctAnswers / test.questions.length) * 100);
    setScore(calculatedScore);
    setIsFinished(true);

    if (calculatedScore >= test.passingScore) {
      toast.success('Čestitamo! Položili ste test!');
    } else {
      toast.error('Nažalost, niste položili test.');
    }
  };

  if (isFinished) {
    const passed = score >= test.passingScore;

    return (
      <Box sx={{ minHeight: 'calc(100vh - 190px)', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 500 }}>
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
            {passed ? 'Čestitamo!' : 'Pokušajte ponovo'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {passed ? 'Uspešno ste položili test i zaradili sertifikat!' : 'Nažalost, niste dostigli prolazni prag.'}
          </Typography>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h2" fontWeight="bold" color={passed ? 'success.main' : 'error.main'}>
                {score}%
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Vaš rezultat
              </Typography>
              <LinearProgress
                variant="determinate"
                value={score}
                color={passed ? 'success' : 'error'}
                sx={{ height: 12, borderRadius: 1, mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                Prolazni prag: {test.passingScore}%
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="outlined" onClick={() => navigate('/my-tests')}>
              Nazad na testove
            </Button>
            {passed && (
              <Button variant="contained" onClick={() => navigate('/certificates')}>
                Pogledaj sertifikate
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      {/* <AppBar position="sticky" color="default" elevation={1}> */}
      <Box sx={{ position: 'absolute', top: 0, zIndex: 99999, height: '100%', pt: 1.3, pl: 7 }}>
        <Box>
          <Typography variant="h6" fontWeight="medium">
            {test.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {courseName}
          </Typography>
        </Box>
      </Box>
      {/* </AppBar> */}
      <LinearProgress variant="determinate" value={progress} />
      {/* Question */}
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Card sx={{ mb: 2, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="medium" sx={{ mb: 4 }}>
              {question.text}
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup value={answers[question.id]?.toString() || ''} onChange={(e) => handleAnswer(e.target.value)}>
                {question.options.map((option, index) => (
                  <Card
                    key={index}
                    variant="outlined"
                    sx={{
                      mb: 1.5,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      borderColor: answers[question.id] === index ? 'primary.main' : 'divider',
                      bgcolor: answers[question.id] === index ? 'primary.light' : 'transparent',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'action.hover',
                      },
                    }}
                    onClick={() => handleAnswer(index.toString())}
                  >
                    <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <FormControlLabel
                        value={index.toString()}
                        control={<Radio />}
                        label={option}
                        sx={{ width: '100%', m: 0 }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevQuestion} disabled={currentQuestion === 0}>
            Prethodno
          </Button>

          {currentQuestion === test.questions.length - 1 ? (
            <Button variant="contained" endIcon={<CheckCircleIcon />} onClick={finishTest}>
              Završi test
            </Button>
          ) : (
            <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={nextQuestion}>
              Sledeće
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};
