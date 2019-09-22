// copy in devtools > Sources > Snippets > New snippet
// Run snippet
setInterval(() => {
  document
    .querySelectorAll(
      '.detailViewWithActivityFeedBase .detailViewWithActivityFeedBaseLeft'
    )
    .forEach(item => (item.style.width = '100%'));
  document
    .querySelectorAll('.detailViewWithActivityFeedBase .dialog')
    .forEach(item => (item.style.width = '90%'));
}, 1000);
