const toggleReveal = () => {
  for (let target of document.querySelectorAll(
    "[data-target='revealer.reveal']"
  )) {
    target.classList.toggle('is-hidden')
  }
}

export { toggleReveal }
