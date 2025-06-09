$(document).ready(function() {
  $('body').on('contextmenu', '#lightbox', function(e) {
    e.preventDefault();
  });

  lightbox.option({
    'albumLabel': 'Image %1 of %2',
    'fadeDuration': 300,
    'resizeDuration': 300,
    'fitImageInViewPort': true,
    'wrapAround': true,
    'alwaysShowNavBtns': true,
    'disableScrolling': true,
  });

  // Function to add download button
  function addDownloadButton() {
    const $image = $('.lb-image');
    const imageUrl = $image.attr('src');
    const fileName = imageUrl.split('/').pop(); // Get filename from URL

    // Check if the download button already exists to prevent duplicates
    if ($('.lb-dataContainer .download-button').length === 0) {
      const $downloadButton = $('<a/>', {
        'href': imageUrl,
        'download': fileName,
        'class': 'download-button',
        'text': 'Stáhnout',
        'target': '_blank' // Open in new tab/window
      });

      // Append the button to the caption area
      $('.lb-dataContainer').append($downloadButton);
    }
  }

  // Listen for Lightbox events to add the button when an image is displayed
  $(document).on('lightbox.opened', function() {
    addDownloadButton();
  });

  $(document).on('lightbox.next lightbox.prev', function() {
    // A small delay might be needed here to ensure the new image is fully loaded
    setTimeout(addDownloadButton, 50);
  });
}); 