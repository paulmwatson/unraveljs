const highlight = (text) => {
  return text
    .replace(
      /("location":".*?")/,
      '<mark className="has-background-success">$&</mark>'
    )
    .replace(
      /("set-cookie":".*?")/,
      '<mark className="has-background-warning">$&</mark>'
    )
}

export { highlight }
