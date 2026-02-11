import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, TextField, Button, Typography, InputAdornment, CircularProgress, Stack, IconButton } from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  School as SchoolIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useGetUserInfoMutation, useLoginMutation } from '../../api/api';
import { toast } from 'react-toastify';
import { setBearerToken } from '../../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { login } from './user/userSlice';
import { useState } from 'react';
import IconifyIcon from '../../../components/base/IconifyIcon';

const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(1, 'Please enter your password'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [userLogin] = useLoginMutation();
  const [getUserInfo] = useGetUserInfoMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const onSubmit = async (data: LoginFormData) => {
    try {
      const tokenResponse = await userLogin({ email: data.email, password: data.password }).unwrap();
      if (tokenResponse) {
        await setBearerToken(tokenResponse.authenticationToken);

        const userDetails = await getUserInfo().unwrap();
        if (userDetails) {
          dispatch(
            login({
              user: userDetails,
              token: tokenResponse.authenticationToken,
              isAuthenticated: true,
            })
          );

          const role = userDetails.role;
          navigate(role === 'ADMIN' ? '/app/admin/dashboard' : '/app/user/dashboard');
        }
      }
    } catch {
      toast.error('Faild to login');
    }
  };

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
              Welcome back
            </Typography>
            <Typography color="text.secondary">Sign in to your account</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            <Stack spacing={3}>
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

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isSubmitting}
                endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon />}
                sx={{ py: 1.5 }}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </Stack>
          </Box>

          <Typography color="text.secondary">
            Don’t have an account?{' '}
            <Typography
              component={Link}
              to="/auth/register"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Sign up
            </Typography>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
