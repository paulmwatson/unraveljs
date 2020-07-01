import Head from 'next/head'
import absoluteUrl from 'next-absolute-url'
import { highlight } from '../src/highlight'
import { toggleReveal } from '../src/reveal'

export async function getServerSideProps(context) {
  const url = context.query.url || null
  let hops = []
  if (url) {
    const { protocol, host } = absoluteUrl(context.req, 'localhost:3000')
    const apiURL = `${protocol}//${host}/api/unravel`
    hops = await fetch(`${apiURL}?url=${encodeURIComponent(url)}`).then((res) =>
      res.json()
    )
  }
  return { props: { url: url, hops: hops } }
}

const Home = (props) => {
  const url = props.url
  const hops = props.hops.slice(1, -1)
  const finalUrl = props.hops[props.hops.length - 1]?.['url']
  const firstHeader = props.hops[0]?.['headers']
  const cookies = props.hops.slice(0, -1).filter((hop) => {
    return typeof hop['headers']['set-cookie'] != 'undefined'
  })

  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Unravel</title>
        <meta name="description" content="Unravel links." />
      </Head>
      <section className="section">
        <div className="container animate__animated animate__fadeInUp">
          <form method="get">
            <h1 className="title has-text-white">
              <a href="/" className="has-text-white">
                Unravel
              </a>
            </h1>
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
                    defaultValue={url}
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
              {typeof firstHeader !== 'undefined' ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: highlight(JSON.stringify(firstHeader)),
                  }}
                  className="is-font-monospace is-size-7 has-background-dark has-text-success"
                ></div>
              ) : null}
            </div>
          </form>
          {props.hops.length > 0 ? (
            <div className="has-text-centered has-text-white is-margin-bottom-1rem is-margin-top-1rem">
              <button
                className="button is-outlined is-dark has-icon"
                onClick={toggleReveal}
              >
                <span className="icon">
                  <i className="fas fa-angle-double-down"></i>
                </span>
                <span>
                  Skipping {props.hops.length - 1}{' '}
                  {props.hops.length - 1 == 1 ? 'hop' : 'hops'}
                  &nbsp;and {cookies.length}
                  &nbsp;{cookies.length == 1 ? 'cookie' : 'cookies'}
                </span>
              </button>
            </div>
          ) : null}
          {hops.map((item, index) => {
            return (
              <div
                className="is-hidden"
                data-target="revealer.reveal"
                key={index}
              >
                <div className="box has-background-dark">
                  <h1 className="title is-margin-bottom-0 is-size-6 has-text-weight-bold has-text-success is-font-monospace">
                    {item['url']}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: highlight(JSON.stringify(item['headers'])),
                    }}
                    className="is-font-monospace is-size-7 has-background-dark has-text-success is-overflow-x-hidden"
                  ></div>
                </div>
                <div className="has-text-centered is-margin-bottom-1rem">
                  <i className="has-text-dark fas fa-angle-down fa-2x"></i>
                </div>
              </div>
            )
          })}
          {typeof finalUrl == 'undefined' ? null : (
            <div className="box has-background-white has-text-centered">
              <a
                href={finalUrl}
                rel="noreferrer noopener"
                className="title has-text-link is-text-underline"
              >
                {finalUrl}
              </a>
            </div>
          )}
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
}

export default Home
