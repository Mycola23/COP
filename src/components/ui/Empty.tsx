export const Empty = () => (
  <section className="state state--empty">
    <span className="state__icon" aria-hidden="true">
      ∅
    </span>
    <p className="state__title">No countries returned</p>
    <p className="state__hint">The API responded with an empty dataset, maybe you find luck in next tiiime</p>
  </section>
);
