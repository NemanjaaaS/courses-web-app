import { Box, Typography, Card, CardContent, Button, Chip, Grid, Avatar } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DownloadIcon from '@mui/icons-material/Download';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import { mockCertificates } from '../../../lib/mockData';
import { toast } from 'react-toastify';

export const UserCertificatesPage = () => {
  // Mock: show user's certificates
  const userCertificates = mockCertificates.filter((c) => c.status === 'approved');

  const downloadCertificate = (courseName: string) => {
    toast.success(`Sertifikat za "${courseName}" je preuzet`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2 }}>
      {/* Certificates Grid */}
      {userCertificates.length > 0 ? (
        <Grid container spacing={3}>
          {userCertificates.map((cert) => (
            <Grid size={{ xs: 12, sm: 6 }} key={cert.id} sx={{ borderRadius: 3 }}>
              <Card sx={{ borderRadius: 3 }}>
                {/* Certificate Preview */}
                <Box
                  sx={{
                    position: 'relative',
                    p: 4,
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(20, 184, 166, 0.05) 100%)',
                    borderBottom: 1,
                    borderColor: 'divider',
                    textAlign: 'center',
                  }}
                >
                  <Chip label="Verifikovan" color="success" size="small" sx={{ position: 'absolute', top: 16, right: 16 }} />

                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      mx: 'auto',
                      mb: 2,
                      background: 'linear-gradient(135deg, #3b82f6 0%, #14b8a6 100%)',
                      boxShadow: 3,
                    }}
                  >
                    <EmojiEventsIcon sx={{ fontSize: 32 }} />
                  </Avatar>

                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                    Sertifikat o završetku
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ mt: 0.5 }}>
                    {cert.courseName}
                  </Typography>

                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px dashed', borderColor: 'divider' }}>
                    <Typography variant="body2" color="text.secondary">
                      Dodeljeno
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {cert.userName}
                    </Typography>
                  </Box>
                </Box>

                {/* Certificate Info */}
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Izdato:{' '}
                      {new Date(cert.issuedAt).toLocaleDateString('sr-RS', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Typography>
                  </Box>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={() => downloadCertificate(cert.courseName)}
                  >
                    Preuzmi sertifikat
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              mx: 'auto',
              mb: 2,
              bgcolor: 'grey.200',
            }}
          >
            <SchoolIcon sx={{ fontSize: 32, color: 'text.secondary' }} />
          </Avatar>
          <Typography variant="h6" gutterBottom>
            Nemate sertifikate
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto', mb: 3 }}>
            Položite testove da biste zaradili sertifikate koji potvrđuju vaše znanje.
          </Typography>
          <Button variant="contained" href="/my-tests">
            Pogledaj testove
          </Button>
        </Box>
      )}
    </Box>
  );
};
