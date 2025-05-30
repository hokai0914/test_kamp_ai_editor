import React, { useMemo, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import ReactPlayer from 'react-player';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Snackbar from '@mui/material/Snackbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const mockSentences = [
  '이것은 첫 번째 임의의 문장입니다.',
  '두 번째 문장이 여기에 있습니다.',
  '세 번째 문장도 확인해보세요.',
  '네 번째 문장입니다.',
  '다섯 번째 문장도 있습니다.',
  '여섯 번째 문장입니다.',
  '마지막, 일곱 번째 문장입니다.',
];

const mockTimeline = [
  {
    image: 'https://placehold.co/120x80/00C9FF/92FE9D?text=1',
    text: '타임라인 문장 1',
  },
  {
    image: 'https://placehold.co/120x80/FFB347/FFCC33?text=2',
    text: '타임라인 문장 2',
  },
  {
    image: 'https://placehold.co/120x80/43E97B/38F9D7?text=3',
    text: '타임라인 문장 3',
  },
  {
    image: 'https://placehold.co/120x80/FA709A/FEE140?text=4',
    text: '타임라인 문장 4',
  },
  {
    image: 'https://placehold.co/120x80/30Cfd0/330867?text=5',
    text: '타임라인 문장 5',
  },
];

const darkBg = '#111';
const neonBlue = '#00eaff';
const neonPink = '#ff4ecd';
const darkPaper = 'linear-gradient(135deg, #232526 0%, #414345 100%)';
const darkAccent = neonBlue;
const darkButton = `linear-gradient(90deg, ${neonPink} 0%, ${neonBlue} 100%)`;
const darkText = '#fff';
const darkSubText = '#b0b0b0';

const GeneratePage: React.FC = () => {
  const location = useLocation();
  const prompt = location.state?.prompt || '';
  const [checked, setChecked] = useState<boolean[]>([true, true, true, true, true, false, false]);
  const [timeline, setTimeline] = useState(mockTimeline);
  const [loadingIdx, setLoadingIdx] = useState<number | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoMessage, setVideoMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuIdx, setMenuIdx] = useState<number | null>(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioMsg, setAudioMsg] = useState('');

  const handleCheck = (idx: number) => {
    setChecked(prev => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const handleTextChange = (idx: number, value: string) => {
    setTimeline(prev => prev.map((item, i) => i === idx ? { ...item, text: value } : item));
  };

  const handleUpdate = (idx: number) => {
    setLoadingIdx(idx);
    setTimeout(() => {
      setLoadingIdx(null);
    }, 3000);
  };

  const handleVideoGenerate = () => {
    setVideoLoading(true);
    setVideoMessage('영상을 생성 중입니다...');
    setTimeout(() => {
      setVideoLoading(false);
      setVideoMessage('');
    }, 3000);
  };

  const handleAudioGenerate = () => {
    setAudioMsg('오디오를 생성 중입니다...');
    setAudioLoading(true);
    setTimeout(() => {
      setAudioLoading(false);
      setAudioMsg('');
    }, 3000);
  };

  const handleAddItem = () => {
    setTimeline(prev => ([
      ...prev,
      {
        image: `https://placehold.co/120x80/00C9FF/92FE9D?text=${prev.length + 1}`,
        text: `타임라인 문장 ${prev.length + 1}`,
      },
    ]));
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>, idx: number) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuIdx(idx);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuIdx(null);
  };

  const handleDeleteItem = () => {
    if (menuIdx !== null) {
      setTimeline(prev => prev.filter((_, i) => i !== menuIdx));
      handleMenuClose();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box minHeight="100vh" width="100vw" display="flex" flexDirection="row" sx={{ background: darkBg }}>
      {/* 좌측 문장 선택 그리드 */}
      <Box
        sx={{
          width: { xs: '38vw', sm: 280, md: 320 },
          minWidth: 200,
          maxWidth: 340,
          height: '100vh',
          bgcolor: 'rgba(30,30,30,0.98)',
          boxShadow: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          zIndex: 2,
        }}
      >
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'transparent', boxShadow: 'none', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}>
          <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: neonBlue }}>
            문장 선택
          </Typography>
          <Box display="flex" flexDirection="column" gap={1} alignItems="stretch">
            {mockSentences.map((sentence, idx) => (
              <FormControlLabel
                key={idx}
                control={<Checkbox checked={checked[idx]} onChange={() => handleCheck(idx)} sx={{ color: neonBlue }} />}
                label={<Typography sx={{ color: darkText }}>{sentence}</Typography>}
                sx={{ alignItems: 'flex-start', m: 0, pl: 1 }}
              />
            ))}
          </Box>
        </Paper>
      </Box>
      {/* 우측 비디오 생성 그리드 */}
      <Box flex={1} height="100vh" position="relative" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="stretch">
        {/* 입력페이지로 돌아가기 버튼 우상단 */}
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          startIcon={<HomeIcon />}
          sx={{
            position: 'absolute',
            top: 24,
            right: 32,
            zIndex: 10,
            fontWeight: 700,
            background: darkButton,
            color: darkText,
            boxShadow: 2,
            '&:hover': { background: neonBlue, color: '#111' },
          }}
        >
          입력페이지로 돌아가기
        </Button>
        <Paper elevation={3} sx={{ m: 0, mt: 6, mx: 4, p: 4, bgcolor: '#232526', borderRadius: 4, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', boxShadow: '0 4px 32px 0 rgba(0,201,255,0.10)' }}>
          {/* 비디오 플레이어 */}
          <Box mb={2} position="relative" minHeight={720} display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#232526" borderRadius={2}>
            {videoLoading ? (
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" height={720} bgcolor="#232526" borderRadius={2}>
                <CircularProgress sx={{ mb: 2, color: neonBlue }} />
                <Typography sx={{ color: neonBlue }} fontWeight={700}>{videoMessage}</Typography>
              </Box>
            ) : (
              <>
                <ReactPlayer url="https://www.w3schools.com/html/mov_bbb.mp4" width="100%" height={720} controls style={{ background: '#000', borderRadius: 8 }} />
                <Button variant="contained" sx={{ mt: 2, background: darkButton, color: darkText, fontWeight: 700, '&:hover': { background: neonBlue, color: '#111' } }} onClick={handleVideoGenerate} fullWidth startIcon={<VideoLibraryIcon />}>
                  영상 생성하기
                </Button>
              </>
            )}
          </Box>
          {/* 타임라인 */}
          <Box mt={4} display="flex" flexDirection="row" justifyContent="flex-start" alignItems="flex-end" gap={2} bgcolor="#232526" borderRadius={2} p={2}>
            {timeline.map((item, idx) => (
              <React.Fragment key={idx}>
                <Paper elevation={2} sx={{ p: 2, bgcolor: '#2d2f31', width: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(0,201,255,0.10)' }}>
                  <Box position="relative" width={120} height={80} mb={1}>
                    <img src={item.image} alt={`timeline-${idx}`} style={{ width: 120, height: 80, borderRadius: 8, objectFit: 'cover', background: neonBlue }} />
                    <Button
                      size="small"
                      sx={{ position: 'absolute', top: 4, right: 4, minWidth: 0, p: 0, bgcolor: 'rgba(30,30,30,0.7)' }}
                      onClick={e => handleMoreClick(e, idx)}
                    >
                      <MoreVertIcon fontSize="small" sx={{ color: neonBlue }} />
                    </Button>
                  </Box>
                  <TextField
                    value={item.text}
                    onChange={e => handleTextChange(idx, e.target.value)}
                    variant="standard"
                    multiline
                    InputProps={{ disableUnderline: true, style: { textAlign: 'center', color: neonBlue, fontWeight: 600 } }}
                    sx={{ mb: 1, textAlign: 'center', bgcolor: 'transparent', borderRadius: 1, fontWeight: 600, color: neonBlue }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 1, fontWeight: 700, background: darkButton, color: darkText, '&:hover': { background: neonBlue, color: '#111' } }}
                    onClick={() => handleUpdate(idx)}
                    disabled={loadingIdx === idx}
                  >
                    {loadingIdx === idx ? (
                      <Box display="flex" alignItems="center" gap={1}>
                        <CircularProgress size={16} sx={{ color: neonBlue }} />
                        <span>이미지/영상을 생성 중입니다</span>
                      </Box>
                    ) : '업데이트'}
                  </Button>
                  {/* 오디오 생성 버튼 */}
                  <IconButton onClick={handleAudioGenerate} sx={{ mt: 1, color: neonBlue }}>
                    <AudiotrackIcon />
                  </IconButton>
                </Paper>
                {/* 아이템 사이에 전환(arrow) 버튼 */}
                {idx < timeline.length - 1 && (
                  <Button size="small" sx={{ minWidth: 0, p: 0, alignSelf: 'center', bgcolor: neonBlue, borderRadius: '50%' }}>
                    <ArrowForwardIosIcon fontSize="small" sx={{ color: '#111' }} />
                  </Button>
                )}
              </React.Fragment>
            ))}
            {/* 마지막에 아이템 추가 버튼 */}
            <Button onClick={handleAddItem} sx={{ minWidth: 0, p: 0, alignSelf: 'center', bgcolor: neonBlue, borderRadius: '50%', ml: 1 }}>
              <AddCircleOutlineIcon fontSize="large" sx={{ color: '#111' }} />
            </Button>
          </Box>
          {/* 타임라인 아이템 메뉴 */}
          <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <MenuItem disabled>다양한 편집 기능을 활용할 수 있어요</MenuItem>
            <MenuItem onClick={handleDeleteItem} sx={{ color: '#ff4e4e', fontWeight: 700 }}>삭제</MenuItem>
          </Menu>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2500}
            onClose={handleSnackbarClose}
            message={snackbarMsg}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            ContentProps={{ sx: { bgcolor: '#232526', color: neonBlue, fontWeight: 700 } }}
          />
          {/* 오디오 생성중 메시지 */}
          <Snackbar
            open={audioLoading}
            message={audioMsg}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            ContentProps={{ sx: { bgcolor: '#232526', color: neonBlue, fontWeight: 700 } }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default GeneratePage; 