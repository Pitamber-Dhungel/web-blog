

export const RouteBlogDetails = (category, blog) => {
  if (!category || !blog) {
    return '/blog/:category/:blog';
  } else {
    return `/blog/${category}/${blog}`;
  }
};

export const RouteBlogByCategory = (category) => {
  if (!category) {
    return '/blog/:category';
  } else {
    return `/blog/${category}`;
  }
};

export const RouteSeacrh = (q) => {
  if(q){
    return '/search?q=${q}'
  }else{
    return '/search'
  }
};

