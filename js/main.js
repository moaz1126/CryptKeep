analytics.logEvent('page_view', {
    page_location: window.location.href,
    page_title: document.title,
});
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(event) {
      analytics.logEvent('link_click', {
        link_url: event.target.href,
        link_text: event.target.innerText,
      });
    });
});
  