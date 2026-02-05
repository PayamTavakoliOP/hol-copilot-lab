module.exports = [
  {
    name: "Main bundle",
    path: "dist/assets/*.js",
    limit: "150 KB",
    webpack: false,
    gzip: true
  },
  {
    name: "CSS bundle",
    path: "dist/assets/*.css",
    limit: "50 KB",
    webpack: false,
    gzip: true
  },
  {
    name: "Total bundle",
    path: "dist/**/*.{js,css}",
    limit: "200 KB",
    webpack: false,
    gzip: true
  }
]
