import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, TextField, Button, Typography, InputAdornment, CircularProgress, Stack, IconButton } from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useRegisterMutation } from '../../api/api';
import { toast } from 'react-toastify';
import { useState } from 'react';
import IconifyIcon from '../../../components/base/IconifyIcon';

const registerSchema = z
  .object({
    firstName: z.string().min(2, 'Firstname must have at least 2 characters'),
    lastName: z.string().min(2, 'Lastname must have at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must have at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data).unwrap();
      toast.success('You register succesfully!');
      navigate('/auth/login');
    } catch {
      toast.error('Error while register');
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConf, setShowPasswordConf] = useState<boolean>(false);

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 440 }}>
        <Stack spacing={4} alignItems="center">
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(67, 56, 202, 0.15)',
            }}
          >
            <SchoolIcon sx={{ fontSize: 32, color: 'white' }} />
          </Box>

          <Box textAlign="center">
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Create an account
            </Typography>
            <Typography color="text.secondary">Join our learning platform</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            <Stack spacing={2.5}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First name"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="action" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last name"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="action" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email address"
                    type="email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="action" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {!showPassword ? <IconifyIcon icon={'mdi:eye'} /> : <IconifyIcon icon={'mdi:eye-off'} />}
                          </IconButton>
                        ),
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirm password"
                    type={showPasswordConf ? 'text' : 'password'}
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <IconButton onClick={() => setShowPasswordConf(!showPasswordConf)}>
                            {!showPasswordConf ? <IconifyIcon icon={'mdi:eye'} /> : <IconifyIcon icon={'mdi:eye-off'} />}
                          </IconButton>
                        ),
                      },
                    }}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isSubmitting}
                endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon />}
                sx={{ py: 1.5, mt: 1 }}
              >
                {isSubmitting ? 'Registering...' : 'Sign up'}
              </Button>
            </Stack>
          </Box>

          <Typography color="text.secondary">
            Already have an account?{' '}
            <Typography
              component={Link}
              to="/auth/login"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Sign in
            </Typography>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
