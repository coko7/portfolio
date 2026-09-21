fetch('/data/hobbies.json')
  .then((res) => res.json())
  .then((hobbies) => {
    const largeData = hobbies.map(({ emoji, name, frequency }) => ({
      name: `${emoji} ${name}`,
      frequency,
    }));

    const smallData = hobbies.map(({ name, frequency }) => ({ [name]: frequency }));

    const largeEl = document.getElementById('hobbies-large');
    const smallEl = document.getElementById('hobbies-small');

    largeEl.textContent = formatCompactArray(largeData);
    smallEl.textContent = formatCompactArray(smallData);

    Prism.highlightElement(largeEl);
    Prism.highlightElement(smallEl);
  })
  .catch((err) => console.error('Failed to load hobbies.json:', err));

function formatCompactArray(arr) {
  const lines = arr.map((obj) => {
    const compact = JSON.stringify(obj)
      .replace(/,/g, ', ')
      .replace(/:/g, ': ')
      .replace(/^\{/, '{ ')
      .replace(/\}$/, ' }');
    return '    ' + compact;
  });
  return '[\n' + lines.join(',\n') + '\n]';
}
