import Head from 'next/head'

const Home = () => (
  <div>
    <section className="section">
      <div className="container animate__animated animate__fadeInUp">
        <form method="get">
          <input type="hidden" name="auto_follow" value="false" />
          <input type="hidden" name="strip_utm" value="false" />
          <div className="columns is-gapless is-mobile">
            <div className="column">
              <h1 className="title has-text-white">
                <a href="/" className="has-text-white">
                  Unravel
                </a>
              </h1>
            </div>
            <div className="column has-text-white">
              <div className="field is-pulled-right is-margin-left-1rem is-margin-bottom-0">
                <label className="checkbox is-size-7">
                  <input
                    type="checkbox"
                    name="strip_utm"
                    value="true"
                    defaultChecked={true}
                  />
                  Remove UTM
                </label>
              </div>
              <div className="field is-pulled-right is-margin-left-1rem is-margin-bottom-0">
                <label className="checkbox is-size-7">
                  <input
                    type="checkbox"
                    name="auto_follow"
                    value="true"
                    defaultChecked={true}
                  />
                  Auto-follow
                </label>
              </div>
            </div>
          </div>
          <div className="box is-margin-bottom-0 has-background-dark">
            <div className="field has-addons">
              <div className="control is-expanded">
                <label className="label is-sr-only" htmlFor="url">
                  URL
                </label>
                <input
                  className="input is-rounded-left has-background-black-ter has-text-success is-font-monospace has-text-weight-bold is-border-dark"
                  type="url"
                  placeholder="Enter a URL"
                  name="url"
                  id="url"
                  required
                  autoFocus={true}
                />
              </div>
              <div className="control">
                <button
                  type="submit"
                  className="button is-success has-icon"
                  aria-label="GO"
                >
                  <span className="icon is-small">
                    <i className="fas fa-user-secret"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
    <footer className="footer has-background-link has-text-grey-light has-text-centered">
      <a
        className="has-text-white-ter"
        ref={(node) =>
          node &&
          node.setAttribute(
            'href',
            "javascript: window.location = 'https://unravel.paulmwatson.com?url=' + encodeURIComponent(window.location.toString());"
          )
        }
      >
        Unravel
      </a>
      &nbsp;
      <small className="has-text-white-ter">
        (Bookmarklet, drag to your toolbar)
      </small>
      <br />
      <small className="has-text-grey-lighter">
        Built by&nbsp;
        <a
          href="https://paulmwatson.com"
          className="has-text-grey-lighter"
          rel="noopener"
        >
          Paul Watson
        </a>
      </small>
    </footer>
  </div>
)

export default Home
