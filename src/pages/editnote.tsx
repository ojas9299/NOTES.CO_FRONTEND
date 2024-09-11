import React, { useEffect, useState } from "react";
import api from "../api/axiosinstance";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { InputAdornment, IconButton } from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { isLoggedAtom } from "../atoms/useratoms.tsx";
import { useSetRecoilState } from "recoil";

interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
}

const Editnote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editedNote, setEditedNote] = useState<Note | null>(null);
  const [tagInput, setTagInput] = useState<string>("");
  const setisLoggedIn = useSetRecoilState(isLoggedAtom);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) setisLoggedIn(true);
        const response = await api.get(`/api/${id}/edit`);
        setNote(response.data);
        setEditedNote(response.data);
      } catch (error) {
        setError("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedNote) {
      setEditedNote({
        ...editedNote,
        [name]: value,
      });
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const addTag = () => {
    if (editedNote && tagInput.trim() !== "") {
      setEditedNote({
        ...editedNote,
        tags: [...editedNote.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    if (editedNote) {
      setEditedNote({
        ...editedNote,
        tags: editedNote.tags.filter((t) => t !== tag),
      });
    }
  };

  const handleSubmit = async () => {
    if (editedNote) {
      try {
        await api.put(`/api/${id}/edit`, editedNote);
        navigate("/landingpage");
      } catch (error) {
        setError("Failed to update note");
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 600,
        mx: "auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      {editedNote && (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Note
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Title"
            name="title"
            value={editedNote.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            minRows={4}
            variant="outlined"
            label="Content"
            name="content"
            value={editedNote.content}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Tags
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {editedNote.tags.length > 0 ? (
                editedNote.tags.map((tag, index) => (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor: "#e6e7eb",
                      color: "#000",
                      paddingX: 1.5,
                      paddingY: 0.5,
                      borderRadius: "16px",
                      fontSize: "0.85rem",
                      display: "inline-block",
                      marginRight: 1,
                      marginBottom: 1,
                      position: "relative",
                    }}
                  >
                    {tag}
                    <IconButton
                      onClick={() => removeTag(tag)}
                      sx={{
                        fontSize: 16, // Font size of the icon
                        width: 32, // Custom width in pixels
                        height: 32, // Custom height in pixels
                        padding: 0, // Remove default padding if needed
                        minWidth: 0, // Remove default minimum width if needed
                      }}
                    >
                      <Close />
                    </IconButton>
                  </Box>
                ))
              ) : (
                <Typography variant="body2">No tags</Typography>
              )}
            </Box>
            <TextField
              variant="outlined"
              label="Add tag"
              value={tagInput}
              onChange={handleTagsChange}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={addTag}>
                      <Add />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </>
      )}
    </Box>
  );
};

export default Editnote;
