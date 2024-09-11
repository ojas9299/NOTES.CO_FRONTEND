import { useRecoilValue } from "recoil";
import { selectedNoteState } from "../atoms/notesatom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notesAtom } from "../atoms/notesatom";
import { useRecoilState } from "recoil";

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ open, onClose }) => {
  const selectedNote = useRecoilValue(selectedNoteState);
  const [notes, setNotes] = useRecoilState(notesAtom);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (selectedNote && selectedNote._id) {
      try {
        const response = await axios.delete(`/api/${selectedNote._id}`);
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== selectedNote._id)
        );
        if (response.status === 200) {
          console.log("Note deleted successfully");
          onClose();
        } else {
          console.error("Failed to delete the note");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  if (!selectedNote) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height: "auto",
          maxWidth: 600,
          maxHeight: "80vh",
          borderRadius: "16px",
          overflow: "hidden",
          wordWrap: "break-word",
          textOverflow: "ellipsis",
          p: 4,
          outline: "none",
          background: "rgba(255, 251, 251, 0.46)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: "scroll",
            pr: 2,
            "&.scrollable": {
              overflowY: "scroll",
            },
          }}
          className="scrollbar-hide"
        >
          <Typography
            id="modal-title"
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: "black", fontWeight: "bold" }}
          >
            {selectedNote.title}
          </Typography>
          <Typography
            id="modal-description"
            variant="body1"
            paragraph
            sx={{
              lineHeight: 1.5,
              mb: 2,
              fontSize: "1.4rem",
              paddingY: 4,
            }}
          >
            <pre className="whitespace-pre-wrap"> {selectedNote.content}</pre>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mb: 4,
            }}
          >
            {selectedNote.tags &&
              selectedNote.tags.map((tag, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    backgroundColor: "#e6e7eb",
                    color: "black",
                    paddingX: 2,
                    paddingY: 1,
                    borderRadius: "16px",
                    fontSize: "0.85rem",
                    display: "inline-block",
                    marginRight: 1,
                    marginBottom: 1,
                  }}
                >
                  {tag}
                </Typography>
              ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button
            onClick={onClose}
            variant="contained"
            color="secondary"
            sx={{
              bgcolor: "#4f46e5",
              "&:hover": { bgcolor: "#4338ca" },
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => navigate(`/${selectedNote._id}/edit`)}
            variant="contained"
            color="secondary"
            sx={{
              bgcolor: "#4f46e5",
              "&:hover": { bgcolor: "#4338ca" },
            }}
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="secondary"
            sx={{
              bgcolor: "#4f46e5",
              "&:hover": { bgcolor: "#4338ca" },
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
