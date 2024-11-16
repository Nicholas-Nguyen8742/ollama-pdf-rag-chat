import { ChangeEvent, useState } from 'react';
import {
  Box, Button, CircularProgress, List, ListItem, ListItemText, Paper, TextField, Typography,
} from '@mui/material';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { api } from './utils';
import './styles/App.css';

function App() {
  const [fileUploaded, setFileUploaded] = useState(false);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {!fileUploaded ? (
        <UploadInterface onFileUpload={setFileUploaded} />
      ) : (
        <ChatInterface />
      )}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App;

function UploadInterface({ onFileUpload } : { onFileUpload: (f: boolean) => void; }) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (!e.target.files?.length) {
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      const response = await api.post('/documents', formData, { 'content-type': 'multipart/form-data' });
      console.log(response);
      onFileUpload(true);

    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="card">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <form>
          <input type="file" onChange={handleSubmit} />
          <button type="submit">Upload</button>
        </form>
      )}
    </div>
  );
}

function ChatInterface() {
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [chatLog, setChatLog] = useState<{ type: string; message: string }[]>([]);


  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setChatLog((prev) => [...prev, { type: 'user', message: question }]);
    setIsLoading(true);
    try {
      const response = await api.post('/documents/_search', { question }, { 'Content-Type': 'application/json' });
      const { answer } = response as { answer: string };
      console.log(response);
      setChatLog((prev) => [...prev, { type: 'bot', message: answer }]);
    } catch (error) {
      console.error(error);
      setChatLog((prev) => [...prev, { type: 'system', message: 'Error getting response' }]);
    } finally {
      setIsLoading(false);
    }

    setQuestion('');
  };
  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: '0 auto' }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Ask a question
        </Typography>
        <TextField
          fullWidth
          label="Your Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAskQuestion}>
          Ask
        </Button>
      </Box>
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Chat Log
        </Typography>
        <Paper elevation={1} sx={{ padding: 2, maxHeight: 300, overflowY: 'auto' }}>
          <List>
            {chatLog.map((entry, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemText
                  primary={entry.type === 'user' ? 'You' : entry.type === 'bot' ? 'Bot' : 'System'}
                  secondary={entry.message}
                />
              </ListItem>
            ))}
            {isLoading ? (
              <ListItem alignItems="flex-start">
                <CircularProgress />
              </ListItem>
            ) : (
              null
            )}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}
