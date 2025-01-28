const emojiInput = document.getElementById('emojiInput');
const emojiOutput = document.getElementById('emojiOutput');
const button = document.getElementById('clearButton');
const floatMessage = document.getElementById('floatMessage');

function decodeUnicodeEscapeSequence(str) {
  return str.replace(/%u([\dA-F]{4})/gi, function (match, grp) {
    return String.fromCharCode(parseInt(grp, 16));
  });
}

button.addEventListener('click', function () {
  emojiInput.value = '';
  emojiOutput.value = '';
});

emojiInput.addEventListener('input', function () {
  let text = emojiInput.value;
  const output = '"say ' + decodeUnicodeEscapeSequence('%ue' + text) + '"';

  emojiOutput.value = output;
  console.log(output);
});

emojiOutput.addEventListener('click', function () {
  // Select the text inside the input field
  emojiOutput.select();

  // Copy the selected text to clipboard using Clipboard API
  navigator.clipboard
    .writeText(emojiOutput.value)
    .then(function () {
      // Show the floating message
      floatMessage.style.display = 'block';

      // Hide the message after a few seconds
      setTimeout(function () {
        floatMessage.style.display = 'none';
      }, 2000); // 2000 milliseconds = 2 seconds
    })
    .catch(function (err) {
      console.error('Failed to copy: ', err);
    });
});
