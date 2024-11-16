const {
  VITE_API_URL
} = import.meta.env;

const config = {
  API_URL: (VITE_API_URL || window.location.origin)
};

export {
  config,
}
