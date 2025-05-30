import React, { useState, useRef } from 'react';
import { Box, Button, Paper, Typography, InputBase, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  '텍스트',
  '비디오',
  '오디오',
  'URL',
  '톡 클라우드',
];

const darkBg = '#111';
const neonBlue = '#00eaff';
const neonPink = '#ff4ecd';
const darkPaper = 'linear-gradient(135deg, #232526 0%, #414345 100%)';
const darkButton = `linear-gradient(90deg, ${neonPink} 0%, ${neonBlue} 100%)`;
const darkText = '#fff';
const darkSubText = '#b0b0b0';

const InputPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(e.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handlePromptAction = () => {
    if (prompt.trim()) {
      setDialogOpen(true);
    }
  };

  const handleDialogClose = (skip = false) => {
    setDialogOpen(false);
    setSnackbarMsg('요청 사항을 분석 중입니다...');
    setSnackbarOpen(true);
    timerRef.current = setTimeout(() => {
      setSnackbarOpen(false);
      navigate('/generate', { state: { prompt } });
    }, 3000);
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Box width="100vw" minHeight="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bgcolor={darkBg}>
      <Typography variant="h5" fontWeight={600} mb={4} sx={{ color: neonBlue, letterSpacing: 1 }}>
        What can I help with?
      </Typography>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 480,
          borderRadius: 6,
          p: 1.5,
          bgcolor: '#232526',
          boxShadow: '0 1px 16px 0 rgba(0,234,255,.12)',
        }}
      >
        <IconButton sx={{ color: neonBlue, mr: 1 }} onClick={handleMenuOpen}>
          <AddIcon />
        </IconButton>
        <IconButton sx={{ color: neonPink, mr: 1 }}>
          <TuneIcon />
        </IconButton>
        <InputBase
          placeholder="Input anything"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handlePromptAction(); }}
          sx={{ flex: 1, fontSize: 18, px: 1, color: darkText, background: 'transparent', border: 'none', '::placeholder': { color: darkSubText, opacity: 1 } }}
          inputProps={{ 'aria-label': 'Input anything' }}
        />
        <IconButton
          sx={{ color: neonBlue, ml: 1, bgcolor: 'rgba(0,234,255,0.08)', '&:hover': { bgcolor: 'rgba(0,234,255,0.18)' } }}
          onClick={handlePromptAction}
          disabled={!prompt.trim()}
        >
          <KeyboardVoiceIcon />
        </IconButton>
      </Paper>
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={{ sx: { bgcolor: '#232526', color: darkText } }}>
        {menuItems.map(item => (
          <MenuItem key={item} onClick={handleMenuClose} sx={{ color: neonBlue, fontWeight: 600 }}>{item}</MenuItem>
        ))}
      </Menu>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} PaperProps={{ sx: { bgcolor: '#232526', color: darkText } }}>
        <DialogTitle sx={{ color: neonBlue }}>사용자 설정을 선택하세요</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: darkSubText }}>원하는 설정을 선택하거나 건너뛸 수 있습니다.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} sx={{ background: darkButton, color: darkText, fontWeight: 700, '&:hover': { background: neonBlue, color: '#111' } }}>OK</Button>
          <Button onClick={() => handleDialogClose(true)} sx={{ color: neonPink, fontWeight: 700 }}>SKIP</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMsg}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{ sx: { bgcolor: '#232526', color: neonBlue, fontWeight: 700 } }}
      />
    </Box>
  );
};

export default InputPage; 