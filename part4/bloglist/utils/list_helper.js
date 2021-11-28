// eslint-disable-next-line no-unused-vars
const dummy = (_blogs) => {
  return 1;
};
const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);
const favoriteBlog = (blogs) =>
  blogs.reduce(
    (prev, current) => (prev.likes > current.likes ? prev : current),
    {}
  );
const mostBlogs = (blogs) => {
  const hashMap = blogs.reduce(
    (obj, blog) => {
      if (obj[blog.author] === undefined) {
        obj[blog.author] = 1;
      } else {
        obj[blog.author]++;
      }
      if (obj[blog.author] > obj.max) {
        obj.max = obj[blog.author];
        obj.mostAuthor = blog.author;
      }
      return obj;
    },
    { max: 0, mostAuthor: null }
  );
  return { author: hashMap.mostAuthor, blogs: hashMap.max };
};
const mostLikes = (blogs) => {
  const hashMap = blogs.reduce(
    (obj, blog) => {
      if (obj[blog.author] === undefined) {
        obj[blog.author] = blog.likes;
      } else {
        obj[blog.author] += blog.likes;
      }
      if (obj[blog.author] > obj.max) {
        obj.max = obj[blog.author];
        obj.mostAuthor = blog.author;
      }
      return obj;
    },
    { max: 0, mostAuthor: null }
  );
  return { author: hashMap.mostAuthor, likes: hashMap.max };
};
module.exports = {
  dummy,
  mostBlogs,
  mostLikes,
  favoriteBlog,
  totalLikes,
};
