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
  
const DownloadLink = document.querySelector('#DownloadLink');

// URL of the JSON file
const url = 'https://cryptkeep-web.web.app/Desktop/releases.json';
let lastReleaseUrl = 'https://github.com/moaz1126/CryptKeep_Desktop/releases/download/1.0.2/CryptKeep.Setup.1.0.2.exe';
fetch(url)
  .then(response => response.json())
  .then(jsonData => {
    // Access the releases array
    const releases = jsonData.releases;

    // Get the last release URL
    lastReleaseUrl = releases[releases.length - 1].url;
    UpdateAHref(lastReleaseUrl)
  })
  .catch(error => console.error('Error fetching the JSON file:', error));

function UpdateAHref(url) {
  console.log(url)
  DownloadLink.setAttribute('href', url);
}