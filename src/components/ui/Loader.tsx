export const Loader = () => (
  <section className="state state--loading" aria-busy="true" aria-live="polite">
    <div className="spinner" aria-hidden="true" />
    <p className="state__title">All that we do load load load data</p>
    <p className="state__hint">Fetching.. .... .. . data from restcountries.com</p>
  </section>
);
