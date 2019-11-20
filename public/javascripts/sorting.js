const myTable = document.querySelector('#myTable')
// select all trs below the header:
const trs = [...myTable.querySelectorAll('tr')].slice(1)
let status = false

myTable.addEventListener('click', ({ target }) => {
  if (!target.matches('th')) return;
  const thIndex = Array.prototype.indexOf.call(target.parentElement.children, target)
  const getText = tr => tr.children[thIndex].textContent

  if (status) {
    trs.sort((a, b) => getText(a).localeCompare(getText(b), undefined, { numeric: true }))
    status = false
  } else {
    trs.sort((a, b) => getText(b).localeCompare(getText(a), undefined, { numeric: true }))
    status = true
  };
  trs.forEach(tr => myTable.appendChild(tr))
});
