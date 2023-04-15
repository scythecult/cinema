const getCurrentFilmComments = (filmCommentIds = [], comments = []) => {
  const result = [];
  const commentIdStore = {};

  for (const commentId of filmCommentIds) {
    if (commentIdStore[commentId]) {
      commentIdStore[commentId]++;
    } else {
      commentIdStore[commentId] = 1;
    }
  }

  for (const comment of comments) {
    if (commentIdStore[comment.id]) {
      result.push(comment);
    }
  }

  return result;
};

export { getCurrentFilmComments };
