import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Box, Typography, Paper, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { format } from 'date-fns';
import { useAuth } from '../../../../services/Auth/AuthContext';

interface Comment {
    text: string;
    timestamp: Date;
    rating: number;
    author: string;
}

const labels: { [index: number]: string } = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
};

const CommentSection: React.FC = () => {
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState<number | null>(null);

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const handleRatingChange = (event: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
        setNewRating(newValue);
    };

    const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newComment.trim() && newRating !== null && user) {
            const userObject = JSON.parse(user);
            setComments([
                ...comments,
                { text: newComment.trim(), timestamp: new Date(), rating: newRating, author: userObject.name },
            ]);
            setNewComment('');
            setNewRating(null);
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
            <Typography variant="h6" fontFamily="Poppins" fontWeight={500} fontSize={30}>
                Bình luận
            </Typography>
            {user ? (
                <form onSubmit={handleCommentSubmit}>
                    <Box display="flex" flexDirection="column" mt={2}>
                        <TextField
                            label="Add a comment"
                            variant="outlined"
                            value={newComment}
                            onChange={handleCommentChange}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <Box display="flex" alignItems="center" mb={2}>
                            <Typography variant="body1" sx={{ marginRight: 2 }}>
                                Rating:
                            </Typography>
                            <Rating
                                value={newRating}
                                onChange={handleRatingChange}
                                precision={0.5}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                        </Box>
                        <Button type="submit" variant="contained" color="info">
                            Submit
                        </Button>
                    </Box>
                </form>
            ) : (
                <Typography variant="body1" color="textSecondary" sx={{ marginTop: 4 }}>
                    Vui lòng đăng nhập để bình luận
                </Typography>
            )}
            <List sx={{ marginTop: 3 }}>
                {comments.map((comment, index) => (
                    <ListItem key={index}>
                        <ListItemText sx={{ pt: 2 }}
                            primary={
                                <>
                                    <Typography variant="body1" sx={{ fontSize: 40 }}>
                                        {comment.author} :
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: 20 }}>
                                        {comment.text}
                                    </Typography>
                                </>
                            }
                            secondary={
                                <>
                                    <Typography sx={{ mt: 2, fontSize: 20 }}>
                                        {format(comment.timestamp, 'dd/MM/yyyy HH:mm')}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                        <Rating
                                            value={comment.rating}
                                            readOnly
                                            precision={0.5}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
                                            {labels[comment.rating]}
                                        </Typography>
                                    </Box>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default CommentSection;
