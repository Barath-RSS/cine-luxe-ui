import { useState, useEffect } from "react";
import { X, Star, Heart, ThumbsUp, ThumbsDown, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  description?: string;
}

interface Comment {
  id: number;
  movieId: number;
  author: string;
  content: string;
  timestamp: string;
}

interface MovieDetailsModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onLike?: (id: number) => void;
  onDislike?: (id: number) => void;
  onAddToWatchLater?: (id: number) => void;
  isLiked?: boolean;
  isDisliked?: boolean;
  isInWatchLater?: boolean;
}

export function MovieDetailsModal({
  movie,
  isOpen,
  onClose,
  onLike,
  onDislike,
  onAddToWatchLater,
  isLiked = false,
  isDisliked = false,
  isInWatchLater = false,
}: MovieDetailsModalProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (movie && isOpen) {
      // Load comments for this movie
      const savedComments = localStorage.getItem(`movie-comments-${movie.id}`);
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      } else {
        setComments([]);
      }
    }
  }, [movie, isOpen]);

  const handleAddComment = () => {
    if (!movie || !newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      movieId: movie.id,
      author: "Movie Fan", // Could be dynamic user name
      content: newComment.trim(),
      timestamp: new Date().toLocaleDateString(),
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`movie-comments-${movie.id}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  const handleBookTickets = () => {
    if (movie) {
      window.open(`https://fandango.com/search?q=${encodeURIComponent(movie.title)}`, '_blank');
    }
  };

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface border border-border/50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h2 className="font-display font-bold text-2xl text-foreground">Movie Details</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-surface-elevated"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <ScrollArea className="max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Movie Poster */}
              <div className="md:col-span-1">
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-surface-elevated">
                  <img
                    src={movie.poster}
                    alt={`${movie.title} poster`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Movie Info */}
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-3">
                  <h1 className="font-display font-bold text-3xl text-foreground">
                    {movie.title}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-medium text-foreground">{movie.rating.toFixed(1)}</span>
                    </div>
                    <Badge variant="secondary">{movie.genre}</Badge>
                    <span className="text-muted-foreground">{movie.year}</span>
                  </div>
                </div>

                {/* Description */}
                {movie.description && (
                  <div className="space-y-2">
                    <h3 className="font-display font-semibold text-lg text-foreground">Synopsis</h3>
                    <p className="text-muted-foreground leading-relaxed">{movie.description}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleBookTickets}
                    className="bg-gradient-accent hover:opacity-90 text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Book Tickets
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onLike?.(movie.id)}
                    className={`${isLiked ? 'bg-green-500/10 border-green-500/20 text-green-500' : ''}`}
                  >
                    <ThumbsUp className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                    Like
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onDislike?.(movie.id)}
                    className={`${isDisliked ? 'bg-red-500/10 border-red-500/20 text-red-500' : ''}`}
                  >
                    <ThumbsDown className={`w-4 h-4 mr-2 ${isDisliked ? 'fill-current' : ''}`} />
                    Dislike
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onAddToWatchLater?.(movie.id)}
                    className={`${isInWatchLater ? 'bg-accent-from/10 border-accent-from/20 text-accent-from' : ''}`}
                  >
                    <Clock className={`w-4 h-4 mr-2 ${isInWatchLater ? 'fill-current' : ''}`} />
                    {isInWatchLater ? 'In Watch Later' : 'Watch Later'}
                  </Button>
                </div>

                {/* Comments Section */}
                <div className="space-y-4 border-t border-border/50 pt-6">
                  <h3 className="font-display font-semibold text-lg text-foreground">Comments</h3>
                  
                  {/* Add Comment */}
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Share your thoughts about this movie..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="bg-surface-elevated border-border/50 resize-none"
                      rows={3}
                    />
                    <Button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="bg-gradient-accent hover:opacity-90 text-white"
                    >
                      Post Comment
                    </Button>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-surface-elevated rounded-lg p-4 border border-border/30"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-foreground">{comment.author}</span>
                            <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-muted-foreground">{comment.content}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        No comments yet. Be the first to share your thoughts!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}